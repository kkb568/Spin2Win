import { css } from "@emotion/css";
import { dozenGridButtons, firstRowNumbers, secondRowNumbers, thirdRowNumbers } from "../../../../../../data/data"
import NumButton from "./NumButton";
import DozenButton from "./DozenButton";
import GreenButton from "./GreenButton";
import { arrayNum } from "../../../../../../data/dataTypes";
import { useContext } from "react";
import { GridContext } from "../../TopBody";

// The component renders the number buttons and the buttons showing a group of dozen.
export default function MiddleGrid() {
    const { value, dozenRange } = useContext(GridContext)
    
    function renderNumButtons(numArr: arrayNum) {
        const rowNum = numArr.map((num) => {
            return (
                <NumButton key={num} num={num} chosenNum={value}/>
            )
        })
        return rowNum;
    }
    
    const dozenButtonList = dozenGridButtons.map((button) => {
        return (
            <DozenButton key={button.key} 
                name={button.name}
                chosenDozenRange={dozenRange}/>
        )
    })

    return (
        <>
            <div className={MiddleGridNumStyle}>
                {renderNumButtons(firstRowNumbers)}
                {renderNumButtons(secondRowNumbers)}
                {renderNumButtons(thirdRowNumbers)}
            </div>
            <div className={MiddleGridDozenStyle}>
                {dozenButtonList}
            </div>
            <GreenButton chosenNum={value}/>
        </>
    )
}


const MiddleGridNumStyle = css`
    display: grid;
    grid-template-columns: repeat(12, 54px);

    @media (max-width: 900px) {
        grid-template-columns: repeat(6, 54px);
    }

    @media (max-width: 600px) {
        margin-left: -4em;
        grid-template-columns: repeat(3, 54px);
    }
`

const MiddleGridDozenStyle = css`
    display: grid;
    grid-template-columns: repeat(3, 216px);

    @media (max-width: 900px) {
        display: block;
    }

    @media (max-width: 600px) {
        margin-left: -4em;
    }
`