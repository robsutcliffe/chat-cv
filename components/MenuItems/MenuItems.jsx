import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

function Section({ borderControls, textControl, delay, items, open, text }) {
  return (
    <>
      <motion.div animate={{ opacity: items.length ? 1 : 0.5 }}>
        <Heading
          text={text}
          extraDelay={delay}
          open={open}
          borderControls={borderControls}
          textControl={textControl}
        />
      </motion.div>
      {items.map((course, idx) => (
        <motion.div
          animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
          transition={{
            delay: open ? delay + idx * 0.1 : 0,
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
    </>
  );
}

export default function MenuItems({ borderControls, textControl, open }) {
  const { results } = useContext(SearchContext);

  const {
    tags,
    experiences,
    certifications,
    blogs,
    projects,
    videos,
    courses,
    links,
    about,
  } = results;

  const experienceDelay = 1;
  const certDelay = experienceDelay + experiences.length * 0.1;
  const blogDelay = certDelay + certifications.length * 0.1;
  const projectsDelay = blogDelay + blogs.length * 0.1;
  const demoDelay = projectsDelay + projects.length * 0.1;
  const teachingDelay = demoDelay + videos.length * 0.1;

  return (
    <div className="flex-grow px-12 overflow-y-auto min-h-0 pb-6 pt-48">
      <Heading
        text="About Me"
        extraDelay={0.6}
        open={open}
        borderControls={borderControls}
        textControl={textControl}
      />
      {about.map((a, idx) => (
        <motion.div
          key={idx}
          animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
          transition={{
            delay: open ? 0.7 : 0,
            ease: "easeOut",
          }}
        >
          <p className="my-3 max-w-3xl text-white font-ibm">{a.description}</p>
        </motion.div>
      ))}

      <motion.div
        animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
        className="max-w-3xl mt-4"
        transition={{
          delay: open ? 0.8 : 0,
          ease: "easeOut",
        }}
      >
        {tags.map((tag) => (
          <span
            key={tag.title}
            className="inline-flex items-center rounded-md bg-gray-400/10 px-2 mr-1 mb-1 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20"
          >
            {tag.title}
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
        {links.map((link) => (
          <motion.a
            key={link.title}
            animate={borderControls}
            transition={{ duration: 10 }}
            href={link.url}
            target="_blank"
            className="text-white border border-gray-600 mr-4 mb-4 font-bold rounded-lg px-4 py-2 font-ibmCondensed cursor-pointer"
          >
            {link.title}
          </motion.a>
        ))}
      </motion.div>
      <motion.div animate={{ opacity: experiences.length ? 1 : 0.5 }}>
        <Heading
          text="Work Experience"
          extraDelay={experienceDelay}
          open={open}
          borderControls={borderControls}
          textControl={textControl}
        />
      </motion.div>
      {experiences.map((experience, idx) => (
        <motion.div
          key={experience.company}
          animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
          transition={{
            delay: open ? experienceDelay + idx * 0.1 : 0,
            ease: "easeOut",
          }}
        >
          <Expertise experience={experience} />
        </motion.div>
      ))}
      <motion.div animate={{ opacity: certifications.length ? 1 : 0.5 }}>
        <Heading
          text="Certifications"
          extraDelay={certDelay}
          open={open}
          borderControls={borderControls}
          textControl={textControl}
        />
      </motion.div>
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
          <b className="ml-0.5">{certification.title}</b>{" "}
          {certification.company}
        </motion.div>
      ))}
      <motion.div animate={{ opacity: blogs.length ? 1 : 0.5 }}>
        <Heading
          text="Popular Blog Posts"
          extraDelay={blogDelay}
          open={open}
          borderControls={borderControls}
          textControl={textControl}
        />
      </motion.div>
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
      <Section
        text="Favourite Personal Projects"
        open={open}
        items={projects}
        delay={projectsDelay}
        borderControls={borderControls}
        textControl={textControl}
      />
      <Section
        text="Video Demos"
        open={open}
        items={videos}
        delay={demoDelay}
        borderControls={borderControls}
        textControl={textControl}
      />
      <Section
        text="Popular Courses"
        open={open}
        items={courses}
        delay={teachingDelay}
        borderControls={borderControls}
        textControl={textControl}
      />
    </div>
  );
}
