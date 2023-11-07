import { motion, useAnimation } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { ColourContext } from "@context/colour.conetxt";
import MenuTop from "@components/MenuItems/MenuTop";
import SearchSection from "@components/MenuItems/SearchSection";
import MenuItems from "@components/MenuItems/MenuItems";

export default function Menu() {
  const [leftValue, setLeftValue] = useState("144px");
  const { secondaryColours, circleColours } = useContext(ColourContext);
  const textControl = useAnimation();
  const backgroundControls = useAnimation();
  const borderControls = useAnimation();
  useEffect(() => {
    const color = [
      ...secondaryColours,
      ...circleColours.map((c) => c.hex),
    ].find((color) => color !== "#061e2a");
    textControl.start({ color });
    backgroundControls.start({ backgroundColor: color });
    borderControls.start({ borderColor: color });
  }, [secondaryColours, textControl, backgroundControls]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setLeftValue("144px");
      } else if (window.innerWidth >= 768) {
        setLeftValue("112px");
      } else if (window.innerWidth < 768 && window.innerWidth >= 640) {
        setLeftValue("92px");
      } else {
        setLeftValue("0px");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      initial={{
        left: "auto",
        width: "74px",
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
      variants={{
        open: {
          left: leftValue,
          width: "auto",
          backgroundColor: "rgba(0, 0, 0, 1)",
        },
        closed: {
          left: "auto",
          width: "74px",
          backgroundColor: "rgba(0, 0, 0, 0)",
          transition: {
            delay: 0.1,
          },
        },
      }}
      className="m-2 md:m-4 lg:m-6 absolute top-0 right-0 z-30 bottom-0 left-36 overflow-hidden"
    >
      <div className="w-full h-full flex flex-col">
        <MenuTop
          open={open}
          hover={hover}
          setHover={setHover}
          setOpen={setOpen}
        />
        <div className="relative">
          <SearchSection
            open={open}
            borderControls={borderControls}
            textControl={textControl}
          />
        </div>
        <MenuItems
          borderControls={borderControls}
          textControl={textControl}
          open={open}
        />
      </div>
    </motion.div>
  );
}
