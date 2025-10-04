import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { SidebarOptInForm } from "@/components/sidebar-opt-in-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Logo } from "./Navbar/logo";
import { Button } from "./ui/button";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Profile Management",

      items: [
        {
          title: "Add Blog",
          url: "#",
        },
        {
          title: "Add Project",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Button
          className="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
          size="sm"
        >
          Log Out
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
