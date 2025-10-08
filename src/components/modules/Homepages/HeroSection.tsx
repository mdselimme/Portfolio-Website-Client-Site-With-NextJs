import { Button } from "@/components/ui/button";
import {
  ArrowUpRightFromSquare,
  Download,
  Facebook,
  Github,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import TypeAnimationSkill from "./TypeAnimation";

const HeroSection = () => {
  return (
    <div className="container mx-auto">
      <div className="px-5 py-8 mt-20 mb-5">
        <div className="flex flex-col justify-center items-center">
          <h1 className="my-6 text-pretty text-3xl font-bold lg:text-4xl xl:text-7xl">
            Hi, I am Md. Selim
          </h1>
          {/* type animation  */}
          <TypeAnimationSkill />
          <p className="w-full md:max-w-2xl mx-auto md:leading-10 px-5 font-medium text-center">
            Based in Dhaka, Bangladesh. I build exceptional and accessible
            digital experiences for the web. Focused on creating intuitive and
            high-performance applications with modern technologies.
          </p>

          <div className="mt-5 text-center">
            <Button variant="outline" className="md:mr-5">
              <Link className="flex items-center" href={"/about"}>
                Go to About Page
                <ArrowUpRightFromSquare className="ml-4" />
              </Link>
            </Button>

            <Button className="mt-5">
              <Link
                href="https://docs.google.com/document/d/1YII7Ueigq-AvQzl6zpH3C1CXdyVzACxniUIr6OdZIyE/edit?tab=t.0"
                target="_blank"
                className="flex items-center"
              >
                Download Resume
                <Download className="ml-4" />
              </Link>
            </Button>
          </div>
          {/* Social Link  */}
          <div className="flex items-center gap-8 mt-10">
            <Link href={"https://github.com/mdselimme"} target="_blank">
              <Github />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/mdselimme"}
              target="_blank"
            >
              <Linkedin />
            </Link>
            <Link href={"https://www.facebook.com/mdselimme"} target="_blank">
              <Facebook />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
