import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Logo } from "./Navbar/logo";
import Link from "next/link";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Profile Management",
      url: "#",
      items: [
        {
          title: "Dashboard Home",
          url: "/dashboard",
        },
        {
          title: "Manage Blog",
          url: "/dashboard/manage-blog",
        },
        {
          title: "Manage Project",
          url: "/dashboard/manage-project",
        },
        {
          title: "Add Blog",
          url: "/dashboard/add-blog",
        },
        {
          title: "Add Project",
          url: "/dashboard/add-project",
        },
      ],
    },
  ],
};

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
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-lg font-semibold">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="mt-3">
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
