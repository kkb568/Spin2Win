import { css, cx } from "@emotion/css";
import { useContext, useEffect, useRef } from "react"
import { MainContext } from "../../../App";
import { wheelStatsDraw } from "../../../utils/wheelCanvasUtils";
import WheelStatsHead from "./WheelStatsHead";

export default function WheelStats() {
    const wheelRef = useRef<HTMLCanvasElement>();

    const { mainData } = useContext(MainContext);
    const { displayStatistics, previousChosenNums, deg } = mainData;

    const wheelTransformStyle = css`
        transform: rotate(${deg}deg);
    `

    // The wheelStatsDraw function is called twice for proper rendering of the canvas element.
    useEffect(() => {
        const wheelContext = wheelRef.current.getContext('2d');
        for (let i = 1; i < 3; i++) {
            wheelStatsDraw(wheelContext, wheelRef, previousChosenNums);
        }
    }, [displayStatistics]);
    

    return (
        <>
            <canvas className={cx(wheelRefStyle, wheelTransformStyle)} ref={wheelRef} />
            <div className={outerCircleStyle} />
            <WheelStatsHead />
        </>
    )
}


const wheelRefStyle = css`
    position: absolute;
    margin-top: -19em;
    margin-left: 14.8em;
    width: 27em;
    height: 27em;

    /* @media (min-width: 900px) {
        filter: drop-shadow(1px 1px 3px #3e3e3e);
    } */

    @media (max-width: 900px) {
        width: 16.5em;
        height: 16.5em;
        margin-top: 1em;
        margin-left: 10em;
    }

    @media (max-width: 600px) {
        margin-top: 20em;
        margin-left: -16.5em;
    }
`

const outerCircleStyle = css`
    width: 28em;
    height: 28em;
    background-color: inherit;
    border-radius: 50%;
    margin-top: -19.5em;
    margin-left: 14.3em;

    @media (max-width: 900px) {
        display: none;
    }
`