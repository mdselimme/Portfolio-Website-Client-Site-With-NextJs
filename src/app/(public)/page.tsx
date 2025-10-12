import HomeBlog from "@/components/modules/Homepages/HomeBlog";
import HeroSection from "@/components/modules/Homepages/HeroSection";
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
      <HeroSection />
      <HomeBlog />
      <HomeProjects />
    </div>
  );
};

export default HomePage;
