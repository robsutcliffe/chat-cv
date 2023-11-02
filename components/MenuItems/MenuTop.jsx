import Gradient from "@components/Gradient";
import MenuIcon from "@components/MenuIcon";
import { motion } from "framer-motion";

export default function MenuTop({ hover, open, setHover, setOpen }) {
  return (
    <motion.div
      className="group pointer-events-auto relative cursor-pointer flex justify-end"
      animate={
        open ? (hover ? "openHover" : "open") : hover ? "closedHover" : "closed"
      }
      onMouseOut={() => setHover(false)}
      onMouseOver={() => setHover(true)}
      onClick={() => setOpen((prev) => !prev)}
    >
      <Gradient
        theme="primary"
        className="absolute w-full h-full opacity-0 group-hover:opacity-100 transition ease-in-out duration-500"
      />
      <MenuIcon className="h-12 w-12 m-3 relative z-10" stroke="#ffffff" />
    </motion.div>
  );
}
