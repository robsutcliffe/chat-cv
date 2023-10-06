import Layout from '../components/Layout'
import dynamic from 'next/dynamic'
import Chat from '../components/Chat'
import {useRef, useState, useEffect} from "react";

const CircleBg = dynamic(() => import('../components/CircleBg'), {
    ssr: false,
})

const HomePage = () => {
    const wrapperRef = useRef(null);
    const [sizes, setSizes] = useState({ width:0, height:0 })

    const resize = () => {
        if(wrapperRef.current?.offsetHeight) {
            setSizes({
                width: wrapperRef.current.offsetWidth,
                height: wrapperRef.current.offsetHeight
            })
        }
    }

    useEffect(() => {
        addEventListener("resize", resize);
        return () => removeEventListener("resize", resize);
    },[])
    useEffect(resize, [wrapperRef])

    return <Layout home="true">
        <div className="w-full min-h-full bg-white overflow-hidden relative" style={{ backgroundColor: "#061E2A" }} ref={wrapperRef}>
            {sizes.height && <CircleBg sizes={sizes} />}
            <Chat />
        </div>
    </Layout>;
};

export default HomePage;
