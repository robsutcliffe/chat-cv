import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import { ColourContextProvider } from "@context/colour.conetxt";
import { SearchContextProvider } from "@context/search.context";
import Div100vh from "react-div-100vh";

const Layout = ({ children, home }) => (
  <ColourContextProvider>
    <SearchContextProvider>
      <Div100vh>
        <div className="relative p-2 md:p-4 lg:p-6 h-full">
          <Logo />
          <Menu />
          <motion.div
            className="h-full w-full"
            initial={{ x: home ? 0 : 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            {children}
          </motion.div>
        </div>
      </Div100vh>
    </SearchContextProvider>
  </ColourContextProvider>
);
export default Layout;
