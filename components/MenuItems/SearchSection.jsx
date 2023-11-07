import { motion } from "framer-motion";
import Gradient from "@components/Gradient";
import { useContext } from "react";
import { SearchContext } from "@context/search.context";

export default function SearchSection({ borderControls, textControl, open }) {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  return (
    <motion.div
      className="overflow-x-clip absolute bg-black w-full bg-opacity-90 z-40"
      initial={{ x: "100%", opacity: 0 }}
      variants={{
        closed: {
          x: "100%",
          opacity: 0,
          transition: { delay: 0.1, ease: "easeIn" },
        },
        open: {
          x: 0,
          opacity: 1,
          transition: { ease: "easeOut" },
        },
      }}
    >
      <motion.div
        animate={borderControls}
        transition={{ duration: 10 }}
        className="px-6 sm:px-12 pt-6 border-t border-black"
      >
        <motion.div
          animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
          transition={{ delay: open ? 0.3 : 0, ease: "easeOut" }}
          className="text-2xl font-bold tracking-tight text-gray-100 sm:text-3xl md:text-4xl mt-8 sm:mt-0"
        >
          OK, We can do it the old-fashioned way...
        </motion.div>
        <motion.div
          animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
          transition={{ delay: open ? 0.4 : 0, ease: "easeOut" }}
        >
          <motion.div
            animate={textControl}
            transition={{ duration: 10 }}
            className="text-base font-light leading-7"
          >
            But at least use the search box to filter everything
          </motion.div>
        </motion.div>
        <motion.div
          animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
          transition={{ delay: open ? 0.5 : 0, ease: "easeOut" }}
        >
          <Gradient
            theme="secondary"
            className="bg-white p-1 my-4 max-w-md rounded-lg"
          >
            <input
              type="search"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
              className="bg-black px-4 w-full rounded-md py-3 border-none text-base text-white outline-none shadow-sm placeholder:text-gray-500 sm:text-sm sm:leading-6"
              placeholder="Search Term"
            />
          </Gradient>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
