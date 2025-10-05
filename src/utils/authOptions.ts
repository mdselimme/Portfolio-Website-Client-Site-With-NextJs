import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string | null
        }
    }
    interface User {
        id: string,
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string | null;
    }
}


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({ email: credentials?.email, password: credentials?.password })
                    });
                    if (!res?.ok) {
                        console.error("User Login failed.", await res.text());
                        return null;
                    }
                    const user = await res.json();
                    console.log(user)
                    if (user) {
                        // Any object returned will be saved in `user` property of the JWT
                        return {
                            id: user?.data?.user?._id,
                            email: user?.data?.user?.email,
                            name: user?.data?.user?.name,
                            image: user?.data?.user?.photo,
                            role: user?.data?.user?.role,
                        }
                    } else {
                        return null
                    }
                } catch (error) {
                    console.error(error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token?.id as string;
                session.user.role = token?.role as string;
            }
            return session;
        }
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}