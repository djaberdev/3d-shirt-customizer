import { motion, AnimatePresence } from "framer-motion";
import {
    slideAnimation,
    headerAnimation,
    headTextAnimation,
    headContentAnimation,
    headButtonAnimation,
} from "../config/motion";
import { state } from "../store";
import { useSnapshot } from "valtio";
import { CustomizeBtn } from "../components";

const Home = () => {

    const snap = useSnapshot(state);

    return (
        <AnimatePresence>
            {snap.intro && (
                <>
                    <motion.section
                        {...slideAnimation("left")}
                        className="home"
                    >
                        <motion.header
                            {...headerAnimation}
                            {...slideAnimation("down")}
                        >
                            <img 
                                src={state.logoDecal} 
                                alt="logo"
                                className="w-10 h-10"    
                            />
                        </motion.header>

                        <motion.div
                            className="home-content"
                        >
                            <motion.h1 
                                {...headTextAnimation}
                                className="font-extrabold text-7xl md:text-8xl lg:text-9xl uppercase"
                            >
                                Let's <br />
                                do it.
                            </motion.h1>

                            <motion.p
                                {...headContentAnimation} 
                                className="text-base text-gray-700 font-medium max-w-md mt-8 mb-6"
                            >
                                Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong className="text-gray-900">Unleash your imagination</strong>{" "} and define your own style
                            </motion.p>

                            <motion.div 
                                {...headButtonAnimation}
                            >
                                <CustomizeBtn 
                                    text="Customize and Download"
                                    type="filled"
                                    handleClick={() => state.intro = false}
                                    customStyles={"text-base font-medium"}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.section>

                    <motion.div
                        className="save-btn"
                        {...slideAnimation("right")}
                        style={{ borderColor: snap.color }}
                        onClick={() => state.enableSave = !state.enableSave}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span 
                                className="text-sm"
                                key={snap.enableSave ? "disable" : "enable"}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {snap.enableSave ? "Disable Save" : "Enable Save"}
                            </motion.span>
                        </AnimatePresence>

                        <div className={`icon ${snap.enableSave ? "disable" : "enable"}`}>
                            <span className="line"></span>
                            <span className="line"></span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Home;
