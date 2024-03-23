import React from "react";

const SkillList = [
  "next.js",
  "tailwind css",
  "figma",
  "javaScript",
  "web design",
  "Gatsby.js",
  "strapi",
  "firebase",
  "generative AI",
  "wireframing",
  "SEO",
  "framer motion",
  "sanity",
  "GraphQL",
  "react",
  "node.js",
  "express",
  "MongoDB",
  "PHP",
  "JS",
  "Dart",
  "Kotlin",
  "Java",
  "C",
  "HTML",
  "C++",
  "VueJS",
  "Ionic",
  "C#",
  "CSS",
  "Angular",
  "Flask",
  "Python",
  "Flutter",
  "Ansible",
  "MariaDB",
  "Postgresql",
  "Apache",
  "Git",
  "SSH",
  "OpenVPN",
  "Bash",
];

const Skills = () => {
  return (
    <section className="md:ml-20 flex flex-col items-center w-full p-8 bg-gradient-to-r from-dynamic-muted-light to-dynamic-muted overflow-hidden">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-4">
        Skills & Technologies
      </h2>
      <ul className="flex flex-wrap justify-center gap-4 mb-8 p-8">
        {SkillList.map((skill, index) => (
          <li
            key={index}
            className="text-sm md:text-base lg:text-lg font-semibold text-dynamic-muted-dark bg-white px-4 py-2 rounded-full shadow hover:bg-purple-100 transition duration-200 ease-in-out"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
