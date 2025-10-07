import HomeBlog from "@/components/modules/Homepages/Blog";
import HomeProjects from "@/components/modules/Homepages/HomeProject";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Selim Portfolio Home - ${new Date().getFullYear()}`,
  description: "It's Selim Portfolio Home Page",
};

const HomePage = () => {
  return (
    <div>
      <h1>This is home page</h1>
      <HomeBlog />
      <HomeProjects />
    </div>
  );
};

export default HomePage;
