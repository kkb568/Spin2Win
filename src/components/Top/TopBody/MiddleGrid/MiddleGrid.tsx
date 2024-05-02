import { css } from "@emotion/css";
import { dozenGridButtons, firstRowNumbers, secondRowNumbers, thirdRowNumbers } from "../../../../data/data"
import { NumButton } from "./NumButton";
import DozenButton from "./DozenButton";

// The component renders the number buttons and the buttons showing a group of dozen.
export default function MiddleGrid() {
    const dozenButtonList = dozenGridButtons.map((button) => {
        return (
            <DozenButton key={button.key} 
                name={button.name}/>
        )
    })

    return (
        <>
            <div className={MiddleGridNumStyle}>
                <NumButton numArr={firstRowNumbers}/>
                <NumButton numArr={secondRowNumbers}/>
                <NumButton numArr={thirdRowNumbers}/>
            </div>
            <div className={MiddleGridDozenStyle}>
                {dozenButtonList}
            </div>
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