"use client";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import usePathFind from "@/utils/pathFind";
import Link from "next/link";
import React from "react";

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
        {
          title: "Edit Profile",
          url: "/dashboard/edit-profile",
        },
      ],
    },
  ],
};

const SidebarContentSection = () => {
  const path = usePathFind();

  return (
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
                  <SidebarMenuButton asChild isActive={path === item.url}>
                    <Link href={item.url}>{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
};

export default SidebarContentSection;
