import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { fadeAnimation, slideAnimation } from "../config/motion";

import { state } from "../store";
import { useSnapshot } from "valtio";

import { 
    CustomizeBtn,
    Tab,
    ColorPicker,
    FilePicker,
} from "../components";
import { 
    EditorTabs, 
    FilterTabs, 
    DecalTypes
} from "../config/constants";
import {
    reader as fileReader,
    downloadCanvasToImage
} from "../config/helpers";

import { download } from "../assets";

const Customizer = () => {

    const snap = useSnapshot(state);

    // Set main States
    const [file, setFile] = useState('');

    // ! Stoped
    // const [prompt, setPrompt] = useState('');
    // const [generatingImg, setGeneratingImg] = useState(false);

    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: snap.isLogoTexture,
        stylishShirt: snap.isFullTexture,
    });

    // Generate Tab Content Depends On Active Editor Tab
    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />

            case "filepicker":
                return <FilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />

            // ! Stoped 
            // case "aipicker":
            //     return <AIPicker
            //         prompt={prompt}
            //         setPrompt={setPrompt}
            //         generatingImg={generatingImg}
            //         handleSubmit={handleSubmit}
            //     />

            default:
                return null; 
        }
    };

    // Handle Submit For AI Image Generation
    // ! Stoped
    // const handleSubmit = async (type) => {
    //     console.log(prompt);

    //     if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    //         return alert("Please enter a prompt!");
    //     }

    //     try {
            
    //         setGeneratingImg(true);

    //         // Request To OpenAI API
    //         const request = await fetch("http://localhost:8080/api/v1/dalle", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ prompt }),
    //         });

    //         // Response From OpenAI API
    //         const response = await request.json();

    //         if (!request.ok) {
    //             alert(response.message || "Failed to generate image.");
    //             return;
    //         }

    //         // console.log(request);
    //         // console.log(type);
    //         // console.log(response);

    //         // ! Stoped Here The Request Fail Over Time  

    //     } catch (error) {
    //         alert(error);
    //     } finally {
    //         setGeneratingImg(false);
    //         setActiveEditorTab("");
    //     }

    // };

    // Handle Decal Type
    const handleDecalType = (type, result) => {

        const decalType = DecalTypes[type];

        state[decalType.stateProperty] = result;

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab);
        };

    };

    const handleActiveFilterTab = (tabName) => {
        
        // Toggle The Filter Tab's Active State In Global State
        switch (tabName) {
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
        
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabName];
                break;

            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
                break;
        };

        // Toggle The Filter Tab's Active State In Local State
        setActiveFilterTab((prev) => (
            {
                ...prev,
                [tabName]: !prev[tabName]
            }
        ));

    };

    // Read The File
    const readFile = (type) => {
        if (file) {
            fileReader(file).then((fileResult) => {
                handleDecalType(type, fileResult);
                setActiveEditorTab("");
            });
        };
    };

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div
                        {...slideAnimation("left")}
                        className="absolute top-0 left-0 z-10"
                    >
                        <div className="flex items-center min-h-screen">
                            <div className="editor-tabs">
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => setActiveEditorTab(activeEditorTab === tab.name ? "" : tab.name)}
                                    />
                                ))}
                            </div>

                            {generateTabContent()}
                        </div>
                    </motion.div>

                    <motion.div
                        {...slideAnimation("up")}
                        className="filter-tabs"
                    >
                        {FilterTabs.map((tab) => (
                            <Tab 
                                key={tab.name}
                                tab={tab}
                                isFilterTab
                                isActiveTab={activeFilterTab[tab.name]}
                                handleClick={() => handleActiveFilterTab(tab.name)}
                            />
                        ))}
                        <Tab
                            tab={{
                                name: "download",
                                icon: download
                            }}
                            isFilterTab
                            handleClick={() => downloadCanvasToImage()}
                        />
                    </motion.div>

                    <motion.div
                        {...fadeAnimation}
                        className="absolute top-5 right-5 z-10"
                    >
                        <CustomizeBtn
                            text="Go Back"
                            type="filled"
                            handleClick={() => state.intro = true}
                            customStyles={"text-base font-medium"}
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Customizer;