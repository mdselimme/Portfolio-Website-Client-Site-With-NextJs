import * as React from "react";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Logo } from "./Navbar/logo";
import Link from "next/link";

import SidebarContentSection from "./modules/Dashboard/SidebarContentSection";
import LogOutButton from "./modules/Auth/LogOutButton";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href={"/"}>
          <div className="text-center py-3">
            <Logo />
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContentSection />
      <SidebarFooter>
        {/* Log Out Button  */}
        <LogOutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
