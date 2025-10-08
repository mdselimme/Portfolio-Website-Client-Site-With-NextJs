"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
const TypeAnimationSkill = () => {
  return (
    <TypeAnimation
      sequence={[
        "FullStack Developer",
        1000, // Waits 1s
        "Mern Stack Developer",
        2000, // Waits 2s
        "Pern Stack Developer",
        3000, // Waits 2s
        "React & Next Js Developer",
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      className="text-2xl font-bold inline-block mb-5 text-[#9634E8]"
    />
  );
};

export default TypeAnimationSkill;
