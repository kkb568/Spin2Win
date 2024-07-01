import { css } from "@emotion/css"
import LeftHandStatsItem from "./LeftHandStatsItem"
import { blackColors, redColors } from "../../../../data/data"

export default function LeftHandStats() {
    return (
        <div className={leftSideStatsStyle}>
            <LeftHandStatsItem leftPieceDesc="red"
            rightPieceDesc="black"
            leftPieceColor={redColors.normalRed}
            rightPieceColor={blackColors.normalBlack}/>

            <LeftHandStatsItem leftPieceDesc="even"
            rightPieceDesc="odd"
            leftPieceColor="#f5a623"
            rightPieceColor="#7d4e25"/>

            <LeftHandStatsItem leftPieceDesc="low"
            rightPieceDesc="high"
            leftPieceColor="#f5a623"
            rightPieceColor="#7d4e25"/>
        </div>
    )
}


const leftSideStatsStyle = css`
    float: left;
    margin-left: 1em;
    margin-top: 1em;
    font-weight: bold;
    text-transform: uppercase;

    @media (max-width: 900px) {
        margin-left: 1.5em;
    }
`