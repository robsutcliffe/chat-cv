import { useContext } from "react";
import { motion } from "framer-motion";
import Expertise from "@components/MenuItems/Expertise";
import cv from "@data/cv.json";
import { SearchContext } from "@context/search.context";

function Heading({ extraDelay, open, text, borderControls, textControl }) {
  return (
    <motion.div
      animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
      transition={{ delay: open ? extraDelay : 0, ease: "easeOut" }}
    >
      <motion.div
        animate={borderControls}
        transition={{ duration: 10 }}
        className="border-b border-black transition ease-in-out duration-500 pt-3 mb-4"
      >
        <motion.p
          animate={textControl}
          transition={{ duration: 10 }}
          className="text-base font-light leading-7"
        >
          {text}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function MenuItems({ borderControls, textControl, open }) {
  const { results } = useContext(SearchContext);

  const summary = cv.About["personal summary"];
  const skills = Object.values(cv["Techinical Skills"]).flat();
  const experiences = results.experiences;
  const certifications = results.certifications;
  const blogs = results.blogs;
  const projects = results.projects;
  const demos = results.videos;
  const teachings = results.courses;

  const experienceDelay = 1;
  const certDelay = experienceDelay + experiences.length * 0.1;
  const blogDelay = certDelay + certifications.length * 0.1;
  const projectsDelay = blogDelay + blogs.length * 0.1;
  const demoDelay = projectsDelay + projects.length * 0.1;
  const teachingDelay = demoDelay + demos.length * 0.1;

  return (
    <div className="flex-grow px-12 overflow-y-auto min-h-0 pb-6 pt-48">
      <Heading
        text="About Me"
        extraDelay={0.6}
        open={open}
        borderControls={borderControls}
        textControl={textControl}
      />
      <motion.div
        animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
        transition={{
          delay: open ? 0.7 : 0,
          ease: "easeOut",
        }}
      >
        <p className="my-3 max-w-3xl text-white font-ibm">{summary}</p>
      </motion.div>
      <motion.div
        animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
        className="max-w-3xl mt-4"
        transition={{
          delay: open ? 0.8 : 0,
          ease: "easeOut",
        }}
      >
        {skills.map((skill) => (
          <span key={skill} className="inline-flex items-center rounded-md bg-gray-400/10 px-2 mr-1 mb-1 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
            {skill}
          </span>
        ))}
      </motion.div>
      <motion.div
        animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
        className="max-w-3xl my-8"
        transition={{
          delay: open ? 0.9 : 0,
          ease: "easeOut",
        }}
      >
        <motion.a
          animate={borderControls}
          transition={{ duration: 10 }}
          href="https://twitter.com/firefields"
          target="_blank"
          className="text-white border border-white mr-4 mb-4 font-bold rounded-lg px-4 py-2 font-ibmCondensed cursor-pointer"
        >
          Twitter
        </motion.a>
        <motion.a
          animate={borderControls}
          transition={{ duration: 10 }}
          href="https://observablehq.com/@robsutcliffe?tab=notebooks"
          target="_blank"
          className="text-white border border-white mr-4 mb-4 font-bold rounded-lg px-4 py-2 font-ibmCondensed cursor-pointer"
        >
          Observable
        </motion.a>
        <motion.a
          animate={borderControls}
          transition={{ duration: 10 }}
          href="https://github.com/robsutcliffe"
          target="_blank"
          className="text-white border border-white mr-4 mb-4 font-bold rounded-lg px-4 py-2 font-ibmCondensed cursor-pointer"
        >
          Github
        </motion.a>
        <motion.a
          animate={borderControls}
          transition={{ duration: 10 }}
          href="mailto:rob@firefields.com"
          target="_blank"
          className="text-white border border-white mr-4 mb-4 font-bold rounded-lg px-4 py-2 font-ibmCondensed cursor-pointer"
        >
          Email
        </motion.a>
      </motion.div>
      <Heading
        text="Work Experience"
        extraDelay={experienceDelay}
        open={open}
        borderControls={borderControls}
        textControl={textControl}
      />
      {experiences.map((experience, idx) => (
        <motion.div
          animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
          transition={{
            delay: open ? experienceDelay + idx * 0.1 : 0,
            ease: "easeOut",
          }}
          key={experience.company}
        >
          <Expertise experience={experience} />
        </motion.div>
      ))}
      <Heading
        text="Certifications"
        extraDelay={certDelay}
        open={open}
        borderControls={borderControls}
        textControl={textControl}
      />
      {certifications.map((certification, idx) => (
        <motion.div
          animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
          transition={{
            delay: open ? certDelay + idx * 0.1 : 0,
            ease: "easeOut",
          }}
          key={certification.title}
          className="my-3 max-w-3xl text-white font-ibm"
        >
          <b className="ml-0.5">{certification.title}</b> {certification.from}
        </motion.div>
      ))}
      <Heading
        text="Popular Blog Posts"
        extraDelay={blogDelay}
        open={open}
        borderControls={borderControls}
        textControl={textControl}
      />
      {blogs.map((blog, idx) => (
        <motion.div
          animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
          transition={{
            delay: open ? blogDelay + idx * 0.1 : 0,
            ease: "easeOut",
          }}
          key={blog.title}
          className="my-3 max-w-3xl text-white font-ibm"
        >
          <a href={blog.url} target="_blank">
            <b>{blog.title}</b>
            <p className="text-gray-400">{blog.description}</p>
          </a>
        </motion.div>
      ))}
      <Heading
        text="Favourite Personal Projects"
        extraDelay={projectsDelay}
        open={open}
        borderControls={borderControls}
        textControl={textControl}
      />
      {projects.map((blog, idx) => (
        <motion.div
          animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
          transition={{
            delay: open ? projectsDelay + idx * 0.1 : 0,
            ease: "easeOut",
          }}
          key={idx}
          className="my-3 max-w-3xl text-white font-ibm"
        >
          <a href={blog.url} target="_blank">
            <b>{blog.title}</b>
            <p className="text-gray-400">{blog.description}</p>
          </a>
        </motion.div>
      ))}
      <Heading
        text="Video Demos"
        extraDelay={demoDelay}
        open={open}
        borderControls={borderControls}
        textControl={textControl}
      />
      {demos.map((demo, idx) => (
        <motion.div
          animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
          transition={{
            delay: open ? demoDelay + idx * 0.1 : 0,
            ease: "easeOut",
          }}
          key={idx}
          className="my-3 max-w-3xl text-white font-ibm"
        >
          <a href={demo.url} target="_blank">
            <b>{demo.title}</b>
            <p className="text-gray-400">{demo.description}</p>
          </a>
        </motion.div>
      ))}
      <Heading
        text="Popular Courses"
        extraDelay={teachingDelay}
        open={open}
        borderControls={borderControls}
        textControl={textControl}
      />
      {teachings.map((course, idx) => (
        <motion.div
          animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
          transition={{
            delay: open ? teachingDelay + idx * 0.1 : 0,
            ease: "easeOut",
          }}
          key={idx}
          className="my-3 max-w-3xl text-white font-ibm"
        >
          <a href={course.url} target="_blank">
            <b>{course.title}</b>
            <p className="text-gray-400">{course.description}</p>
          </a>
        </motion.div>
      ))}
    </div>
  );
}
