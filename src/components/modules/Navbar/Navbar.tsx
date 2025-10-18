"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { accessToken } = useAuth();

  return (
    <div className="bg-muted z-20">
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 h-16 container bg-background border rounded-full">
        <div className="h-full flex items-center justify-between px-6 py-6">
          <Link href={"/"}>
            <Logo />
          </Link>
          <NavMenu className="hidden md:block" />
          <div className="flex items-center gap-3">
            {accessToken ? (
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button>Log In</Button>
              </Link>
            )}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
