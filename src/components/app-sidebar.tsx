import * as React from "react";
import { Sidebar, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { Logo } from "./Navbar/logo";
import Link from "next/link";

import SidebarContentSection from "./modules/Dashboard/SidebarContentSection";

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
      <SidebarRail />
    </Sidebar>
  );
}
