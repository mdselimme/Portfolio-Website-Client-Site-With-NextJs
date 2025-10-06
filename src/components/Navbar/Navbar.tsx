import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Link from "next/link";
import { getUserData } from "@/utils/getUsersData";

const Navbar = async () => {
  const user = await getUserData();

  return (
    <div className="bg-muted">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 container mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-6 py-6">
          <Link href={"/"}>
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            {user?.email ? (
              <Link href={"/dashboard"}>
                {" "}
                <Button className="hidden sm:inline-flex rounded-full">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href={"/login"}>
                {" "}
                <Button className="hidden sm:inline-flex rounded-full">
                  Log In
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
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
