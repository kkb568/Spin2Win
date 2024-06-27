import { css } from "@emotion/css";
import { useContext, useEffect, useRef } from "react"
import { MainContext } from "../../App";
import { wheelStatsDraw } from "../../utils/wheelCanvasUtils";

export default function WheelStats() {
    const wheelRef = useRef<HTMLCanvasElement>();

    const { mainData } = useContext(MainContext);
    const { displayStatistics, previousChosenNums } = mainData;

    useEffect(() => {
        const wheelContext = wheelRef.current.getContext('2d');
        for (let i = 1; i < 3; i++) {
            wheelStatsDraw(wheelContext, wheelRef, previousChosenNums);
        }
    }, [displayStatistics]);
    

    return (
        <>
            <canvas className={wheelRefStyle} ref={wheelRef} />
        </>
    )
}


const wheelRefStyle = css`
    position: absolute;
    margin-top: -29em;
    margin-left: 16em;
    width: 25em;
    height: 25em;
    filter: drop-shadow(1px 1px 3px #3e3e3e);

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