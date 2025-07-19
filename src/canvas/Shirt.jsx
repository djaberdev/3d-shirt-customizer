import { useTexture, Decal, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { state } from "../store";
import { useSnapshot } from "valtio";
import { easing } from "maath";

// ! Implement Shirt Loader For Better Experience

const Shirt = () => {

    const snap = useSnapshot(state);

    const { nodes, materials } = useGLTF("/public/shirt_baked.glb");

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    // Set Shirt Color Smoothly
    useFrame((_, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

    return (
        <group>
            <mesh
                castShadow
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
            >
                {snap.isFullTexture && (
                    <Decal 
                        position={[0, -0.05, 0]}
                        rotation={[0, 0, 0]}
                        scale={0.8}
                        map={fullTexture}
                        depthTest={true}
                        depthWrite={true}
                    />
                )}
                {snap.isLogoTexture && (
                    <Decal 
                        position={[0, 0.04, 0.15]}
                        rotation={[0, 0, 0]}
                        scale={0.18}
                        map={logoTexture}
                        depthTest={false}
                        depthWrite={true}
                    />
                )}
            </mesh>
        </group>
    );
};

export default Shirt;