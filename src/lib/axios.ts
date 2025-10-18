/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "@/config/baseUrl";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const axiosBaseUrl = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true,
});

// --- REQUEST INTERCEPTOR ---
axiosBaseUrl.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken) {
            config.headers = config.headers || {};
            config.headers.Authorization = `${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let pendingQueue: {
    resolve: (value: unknown) => void;
    reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: any) => {
    pendingQueue.forEach((promise) => {
        if (error) promise.reject(error);
        else promise.resolve(null);
    });
    pendingQueue = [];
};

// --- RESPONSE INTERCEPTOR ---
axiosBaseUrl.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // If access token expired
        if (
            error.response?.status === 500 &&
            error.response?.data?.message === "jwt expired" &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            if (isRefreshing) {
                // wait for the refresh process to complete
                return new Promise((resolve, reject) => {
                    pendingQueue.push({ resolve, reject });
                })
                    .then(() => axiosBaseUrl(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;
            try {
                // call refresh token endpoint
                const { data } = await axios.post(
                    `${config.baseUrl}/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                // store new access token in cookies
                if (data?.accessToken) {
                    Cookies.set("accessToken", data.accessToken, {
                        secure: true,
                        sameSite: "none",
                        expires: 2
                    });
                }

                processQueue(null);
                return axiosBaseUrl(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
