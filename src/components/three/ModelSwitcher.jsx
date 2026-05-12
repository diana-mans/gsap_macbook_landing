// 14 and 16 => PresentationControls


import {useRef} from "react";
import {PresentationControls} from "@react-three/drei";
import gsap from "gsap";
import MacbookModel16 from "../models/Macbook-16.jsx";
import MacbookModel14 from "../models/Macbook-14.jsx";
import {MODEL_SWITCHER_ANIMATION_DURATION, MODEL_SWITCHER_OFFSET_DISTANCE} from "../../constants/index.js";
import {useGSAP} from "@gsap/react";

const fadeMeshes = (group, opacity) => {
    if (!group) return
    group.traverse((child) => {
        if (child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, {opacity, duration: MODEL_SWITCHER_ANIMATION_DURATION})
        }
    })
}

const moveGroup = (group, x) => {
    if (!group) return;
    gsap.to(group.position, {x, duration: MODEL_SWITCHER_ANIMATION_DURATION})
}

const ModelSwitcher = ({scale, isMobile}) => {
    const SCALE_LARGE_DESKTOP = 0.08
    const SCALE_LARGE_MOBILE = 0.05
    const smallMacbookRef = useRef(null)
    const largeMacbookRef = useRef(null)

    const showLargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE

    useGSAP(() => {
        if (showLargeMacbook) {
            moveGroup(smallMacbookRef.current, -MODEL_SWITCHER_OFFSET_DISTANCE)
            moveGroup(largeMacbookRef.current, 0)

            fadeMeshes(smallMacbookRef.current, 0)
            fadeMeshes(largeMacbookRef.current, 1)
        } else {
            moveGroup(largeMacbookRef.current, MODEL_SWITCHER_OFFSET_DISTANCE)
            moveGroup(smallMacbookRef.current, 0)

            fadeMeshes(largeMacbookRef.current, 0)
            fadeMeshes(smallMacbookRef.current, 1)
        }

    }, [scale])

    const controlsConfig = {
        snap: true, // возвращает в исходное положение после манипуляций
        speed: 1,
        zoom: 1,
        azimuth: [-Infinity, Infinity],
        config: {mass: 1, tension: 0, friction: 26}

    }
    return (
        <>
            <PresentationControls {...controlsConfig}>
                <group ref={largeMacbookRef}>
                    <MacbookModel16 scale={isMobile ? 0.05 : 0.08}/>
                </group>
            </PresentationControls>
            <PresentationControls {...controlsConfig}>
                <group ref={smallMacbookRef}>
                    <MacbookModel14 scale={isMobile ? 0.03 : 0.06}/>
                </group>
            </PresentationControls>
        </>
    )
}
export default ModelSwitcher
