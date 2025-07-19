import { useRef } from "react";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {

    const shadows = useRef();

    return (
        <AccumulativeShadows
            ref={shadows}
            temporal
            frames={80}
            alphaTest={0.7}
            position={[0, 0, -0.15]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={4}
            color="#fff"
        >
            <RandomizedLight
                amount={4}
                radius={9}
                ambient={0.25}
                intensity={0.6}
                position={[5, 5, -10]}
            />

            <RandomizedLight
                amount={4}
                radius={5}
                ambient={0.55}
                intensity={0.65}
                position={[-5, 5, -9]}
            />

            <RandomizedLight
                amount={4}
                radius={7}
                ambient={0.35}
                intensity={0.25}
                position={[0, 15, -5]}
            />
        </AccumulativeShadows>
    );
};

export default Backdrop;