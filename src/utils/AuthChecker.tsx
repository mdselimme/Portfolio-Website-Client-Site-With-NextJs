"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { checkAuth } from "@/utils/checkAuth";
import Loader from "@/components/modules/Loader";

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const ok = await checkAuth();
      if (!ok) {
        router.push(`/login?redirect=${pathname}`);
      }
      setLoading(false);
    })();
  }, [pathname, router]);

  if (loading) {
    return <Loader />;
  }

  return <>{children} </>;
};

export default AuthChecker;
