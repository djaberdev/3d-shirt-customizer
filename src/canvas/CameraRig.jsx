import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { state } from "../store";
import { useSnapshot } from "valtio";

const CameraRig = ({ children }) => {

    const groupRef = useRef();
    const snap = useSnapshot(state);

    useFrame((s, delta) => {

        // Set Breakpoints
        const isLarge = window.innerWidth <= 1024;
        const isMobile = window.innerWidth <= 768;
        
        // Set Model Position Based On Brakepoints
        let targetPosition = [-0.4, 0, 2];
        if (snap.intro) {
            if (isLarge) targetPosition = [0, 0, 2];
            if (isMobile) targetPosition = [0, 0.2, 2.5];
        } else {
            if (isLarge) targetPosition = [0, 0, 2]
            else targetPosition = [0, 0, 2.5];
        };

        // Set Camera Position Smoothly
        easing.damp3(
            s.camera.position,
            targetPosition,
            0.25,
            delta
        );

        // Set Model Rotation Smoothly
        easing.dampE(
            groupRef.current.rotation,
            [
                s.pointer.y / 10,
                -s.pointer.x / 5,
                0
            ],
            0.25,
            delta
        );

    });

    return <group ref={groupRef}>{children}</group>
};

export default CameraRig;