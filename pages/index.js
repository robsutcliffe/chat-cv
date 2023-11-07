import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import Chat from "../components/Chat";
import { useRef, useState, useEffect } from "react";

const CircleBg = dynamic(() => import("../components/CircleBg"), {
  ssr: false,
});

const HomePage = () => {
  const wrapperRef = useRef(null);
  const [sizes, setSizes] = useState({ width: 0, height: 0 });

  const resize = () => {
    setSizes({ width: 0, height: 0 });
  };

  useEffect(() => {
    if (wrapperRef.current?.offsetHeight && !sizes.height) {
      setSizes({
        width: wrapperRef.current.offsetWidth,
        height: wrapperRef.current.offsetHeight,
      });
    }
  }, [sizes]);

  useEffect(() => {
    window.addEventListener("load", () => {
      setTimeout(() => {
        window.scrollTo(0, 1);
      }, 0);
    });
    addEventListener("resize", resize);
    return () => removeEventListener("resize", resize);
  }, []);
  useEffect(resize, [wrapperRef]);

  return (
    <Layout home="true">
      <div
        className="w-full min-h-full overflow-hidden relative bg-ff-navy"
        ref={wrapperRef}
      >
        {sizes.height && <CircleBg sizes={sizes} />}
        <Chat />
      </div>
    </Layout>
  );
};

export default HomePage;
