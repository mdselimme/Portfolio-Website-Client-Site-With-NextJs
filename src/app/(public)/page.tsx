import HomeBlog from "@/components/modules/Homepages/Blog";
import HomeProjects from "@/components/modules/Homepages/HomeProject";
import React from "react";

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
