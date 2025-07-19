import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import CameraRig from "./CameraRig";
import Backdrop from "./Backdrop";
import Shirt from "./Shirt";

const CanvasModel = () => {
    return (
        <Canvas 
            style={{ height: "100vh", width: "100vw", maxWidth: "100%" }}
            shadows
            camera={{
                position: [0, 0, 0],
                fov: 25,
            }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <ambientLight intensity={1.2} /> 
            <Environment preset="city" intensity={1.5} />

            <CameraRig>
                <Backdrop />

                <Center>
                    <Shirt />
                </Center>
            </CameraRig>
        </Canvas>
    );
};

export default CanvasModel;