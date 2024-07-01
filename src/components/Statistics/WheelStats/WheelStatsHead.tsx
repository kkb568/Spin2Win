import { css } from "@emotion/css"
import { WheelHeadBorder, WheelHeadContent } from "../../../styles/styles"
import { useContext } from "react"
import { MainContext } from "../../../App"

export default function WheelStatsHead() {
    const { mainData } = useContext(MainContext);
    const { previousChosenNums } = mainData;
    
    /* Get the chosen number from the last previous wheel spin implementation 
    if the previousChosenNums array is not empty. */
    const lastChosenNum: number = previousChosenNums.length > 0 && previousChosenNums[0].value;

    return (
        <div className={wheelStatsHeadStyle}>
            <WheelHeadBorder className={wheelHeadBorderStyle}>
                <div />
                <div />
            </WheelHeadBorder>
            <WheelHeadContent className={wheelHeadStyle}>
                <span>{lastChosenNum}</span>
            </WheelHeadContent>
        </div>
    )
}


const wheelStatsHeadStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -13em;
    margin-right: 18.5em;

    @media (max-width: 900px) {
        margin-top: 9em;
        margin-left: -1em;
        margin-right: 0;
    }

    @media (max-width: 600px) {
        margin-top: 29em;
        margin-left: .6em;
    }
`

const wheelHeadBorderStyle = css`
    div:first-child {
        width: 4em;
        height: 4em;
        
        @media (max-width: 900px) {
            width: 3.5em;
            height: 3.5em;
        }
    }

    div:last-child {
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-bottom: 25px solid #f2ecb6;
        margin-top: -4em;

        @media (max-width: 900px) {
            margin-top: -3em;
        }
    }
`

const wheelHeadStyle = css`
    width: 3em;
    height: 3em;

    @media (max-width: 900px) {
        width: 2.5em;
        height: 2.5em;
    }

    span {
        font-size: 2em;

        @media (max-width: 900px) {
            font-size: 1.5em;
        }
    }
`