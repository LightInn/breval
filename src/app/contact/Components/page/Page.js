import React, {Suspense,useCallback} from 'react'
import './Page.module.scss';
// import Loader from "react-loader-spinner";

import css from "./Page.module.scss";
import {useSpring} from 'react-spring'


const Welcome = React.lazy(() => import("../welcome/Welcome"));
const Me = React.lazy(() => import("../me/Me"));
const Skills = React.lazy(() => import("../skills/Skills"));
const Contact = React.lazy(() => import("../contact/Contact"));


function Page() {
    const [{xy}, set] = useSpring(() => ({xy: [0, 0]}))


    const interBT = xy.interpolate((x, y) => `perspective(400px) rotateY(${x / 60}deg) rotateX(${y / 60}deg) scale(0.8)`);
    const onMove = useCallback(({
                                    clientX: x,
                                    clientY: y
                                }) => set({xy: [x - window.innerWidth / 2, y - window.innerHeight / 2]}), []);


    return (
        <div className={css.page} onMouseMove={onMove}>
            <Suspense fallback={

            //     <Loader
            //     className={css.loader}
            //     type="Puff"
            //     color="#00BFFF"
            //     height={100}
            //     width={100}
            //     timeout={3000} //3 secs
            // />

                "loading..."


            }>
                {/*<animated.div className={css.bitime} style={{backgroundImage: 'url(' + bt + ')', transform: interBT}}/>*/}
                <Welcome/>
                <Me/>
                <Skills/>
                {/*<Projects/>*/}
                <Contact/>

                {/*<Suspense fallback={}></Suspense>*/}
            </Suspense>

        </div>
    );
}

export default Page;
