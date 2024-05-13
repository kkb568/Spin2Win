import { css } from "@emotion/css";
import { dozenGridButtons, firstRowNumbers, secondRowNumbers, thirdRowNumbers } from "../../../../../../data/data"
import NumButton from "./NumButton";
import DozenButton from "./DozenButton";
import GreenButton from "./GreenButton";
import { arrayNum } from "../../../../../../data/dataTypes";

// The component renders the number buttons and the buttons showing a group of dozen.
export default function MiddleGrid() {
    
    function renderNumButtons(numArr: arrayNum) {
        const rowNum = numArr.map((num) => {
            return (
                <NumButton key={num} num={num}/>
            )
        })
        return rowNum;
    }
    
    const dozenButtonList = dozenGridButtons.map((button) => {
        return (
            <DozenButton key={button.key} 
                name={button.name}/>
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
            <GreenButton />
        </>
    )
}


const MiddleGridNumStyle = css`
    display: grid;
    grid-template-columns: repeat(12, 54px);
`

const MiddleGridDozenStyle = css`
    display: grid;
    grid-template-columns: repeat(3, 216px);
`