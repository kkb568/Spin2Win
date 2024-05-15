import { css } from "@emotion/css"
import { green, wheelSequence } from "../../data/data"
import { assignBackgroundColor } from "../../utils/chipUtils";
import SequenceItem from "./SequenceItem";
import WheelHead from "./WheelHead";
import { useContext, useEffect, useRef } from "react";
import { MainContext } from "../../App";
import { setRotation } from "../../utils/wheelUtils";

export default function RouletteWheel() {
    const { mainData } = useContext(MainContext);
    const ref = useRef<HTMLUListElement>();

    // If the displayWheel value is equal to block, the setRotation is called after 2 seconds.
    useEffect(() => {
        if (mainData.displayWheel === "block") {
            setTimeout(() => {
                setRotation(ref);
            }, 2000);
        }
    }, [mainData.displayWheel])

    const sequenceList = wheelSequence.map((item) => {
        /* For the item that is equal to zero, show the green color, 
        otherwise, show its respective color.*/
        const backgroundColor: string = item === 0 ? green : assignBackgroundColor(item);
        /* The rotateAngle shows by which angle each item should rotate by.
        It's calculated by the formula: (360/array length) x item's index.
        For example, the fifth item's rotateAngle is: (360/37) x 4 = 31.9189 degrees */
        const rotateAngle: number = 360/(wheelSequence.length)*(wheelSequence.indexOf(item))
        
        return (
            <SequenceItem key={item}
                color={backgroundColor}
                num={item} 
                rotateAngle={rotateAngle}/>
        )
    })

    const rouletteWheelStyle = css`
        position: absolute;
        z-index: 8;
        display: ${mainData.displayWheel};
    `

    return (
        <div className={rouletteWheelStyle}>
            <div className={wheelContentStyle}>
                <div className={wheelStyle}>
                    <ul className={sequenceListStyle} ref={ref}>
                        {sequenceList}
                    </ul>
                    <WheelHead />
                </div>
            </div>
        </div>
    )
}

const wheelContentStyle = css`
    width: 960px;
    height: 84.5vh;
    background: radial-gradient(circle,rgba(0,0,0,0) 0,rgba(0,0,0,0) 52.6%,rgba(0,0,0,.8) 100%) rgba(0,0,0,.8);
    display: flex;
    align-items: center;
    justify-content: center;
`

const wheelStyle = css`
    width: 30em;
    height: 30em;
    background-color: gray;
    border-radius: 50%;
    color: white;
    font-family: 'Adamina';
    display: flex;
    align-items: center;
    justify-content: center;
`

const sequenceListStyle = css`
    list-style: none;
    display: block;
    height: 30em;
    width: 30em;
    position: relative;
`