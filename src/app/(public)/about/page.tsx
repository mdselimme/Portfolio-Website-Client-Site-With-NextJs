import { Button } from "@/components/ui/button";
import { Download, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MyImage from "../../assets/md-selim-profile.png";
import Js from "../../assets/js.png";
import Ts from "../../assets/typescript.png";
import ReactIm from "../../assets/react.png";
import Node from "../../assets/nodejs.png";
import Sql from "../../assets/database.png";
import Postgres from "../../assets/postgre.png";
import Mongodb from "../../assets/mongo.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Selim Portfolio - About`,
  description: "Selim.Dev About Me",
};

const skills = [
  {
    level: "Javascript",
    image: Js,
  },
  {
    level: "Typescript",
    image: Ts,
  },
  {
    level: "React",
    image: ReactIm,
  },
  {
    level: "Node",
    image: Node,
  },
  {
    level: "SQL",
    image: Sql,
  },
  {
    level: "Postgres",
    image: Postgres,
  },
  {
    level: "Mongodb",
    image: Mongodb,
  },
];

export const dynamic = "force-static";

export const AboutPage = () => {
  return (
    <div className="container mx-auto py-28 pb-20 px-5">
      <h1 className="text-center text-3xl capitalize font-extrabold mt-10">
        About Me
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 pt-10 pb-20 items-center gap-10">
        <div className="p-10">
          <Image
            className="w-full rounded-4xl"
            src={MyImage}
            alt="my-image"
            quality={85}
          ></Image>
        </div>
        <div className="p-5 md:col-span-2">
          <p className="text-lg font-medium mb-5 text-justify">
            I am a passionate Full Stack Developer with expertise in building
            modern web applications. With a strong foundation in both frontend
            and backend technologies. I am experienced in React Js, Next Js,
            Javascript, TypeScript, Node, Express, Mongodb, Mongoose, Postgres,
            Prisma. I create seamless, user-friendly fullStack website with a
            better user experiences that solve real-world problems.
          </p>
          <p className="text-lg font-medium text-justify">
            Currently I have completed my Higher Secondary Examination. Now I am
            eagerly waiting for study at Computer Science and Engineering.
          </p>
          <p className="text-lg font-medium text-justify flex items-center mt-5 text-blue-950">
            <Phone size={16} className="mr-2" /> +8801737210235
          </p>
          <p className="text-lg font-medium text-justify flex items-center mt-5 text-blue-950">
            <Mail size={16} className="mr-2" /> mdselim.contact@gmail.com
          </p>
          <p className="text-lg font-medium text-justify flex items-center mt-5 text-blue-950">
            <MapPin size={16} className="mr-2" /> Dhaka, Bangladesh
          </p>

          <Button className="mt-5">
            <Link
              href="https://docs.google.com/document/d/1YII7Ueigq-AvQzl6zpH3C1CXdyVzACxniUIr6OdZIyE/edit?tab=t.0"
              target="_blank"
            >
              Download Resume
            </Link>
            <Download />
          </Button>
        </div>
      </div>
      {/* Skills Section  */}
      <h1 className="text-center text-3xl capitalize font-extrabold">
        My Skills & Expertise
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-6 pt-10 pb-20 items-center gap-10">
        {skills.map((skill) => (
          <div
            key={skill?.level}
            className="p-10 bg-sidebar-accent rounded-3xl"
          >
            <div>
              <Image
                className="w-full rounded-4xl"
                src={skill?.image}
                alt="my-image"
                quality={85}
              ></Image>
            </div>
            <h2 className="text-center font-bold mt-2">{skill?.level}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
