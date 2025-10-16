"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAuth } from "@/utils/checkAuth";
import Loader from "@/components/modules/Loader";
import { useUser } from "@/context/UserContext";
import { getUserData } from "./getUsersData";

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { setUser } = useUser();

  useEffect(() => {
    (async () => {
      const ok = await checkAuth();

      if (!ok) {
        setUser(undefined);
        router.push(`/login?redirect=${pathname}`);
      } else {
        const user = await getUserData();
        if (user) setUser(user);
      }
      setLoading(false);
    })();
  }, [pathname, router, setUser]);

  if (loading) return <Loader />;
  return <>{children}</>;
};

export default AuthChecker;
