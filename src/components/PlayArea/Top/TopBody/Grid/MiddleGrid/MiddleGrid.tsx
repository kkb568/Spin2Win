import { css } from "@emotion/css";
import { dozenGridButtons, firstRowNumbers, secondRowNumbers, thirdRowNumbers } from "../../../../../../data/data"
import NumButton from "./NumButton";
import DozenButton from "./DozenButton";
import GreenButton from "./GreenButton";
import { arrayNum } from "../../../../../../data/dataTypes";
import { useContext } from "react";
import { MainContext } from "../../../../../../App";

// The component renders the number buttons, the green button and the buttons showing a group of dozen.
export default function MiddleGrid() {
    const { mainData } = useContext(MainContext);
    const { correctValueData, previousChosenNums } = mainData;
    // Get the last chosen number from the last wheel spin implementation.
    const chosenNum: number = previousChosenNums.length > 0 && previousChosenNums[0].value;
    
    function renderNumButtons(numArr: arrayNum) {
        const rowNum = numArr.map((num) => {
            return (
                <NumButton key={num} num={num} chosenNum={chosenNum}/>
            )
        })
        return rowNum;
    }
    
    const dozenButtonList = dozenGridButtons.map((button) => {
        return (
            <DozenButton key={button.key} 
                name={button.name}
                chosenDozenRange={correctValueData.dozenRange}/>
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
            <GreenButton chosenNum={chosenNum}/>
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