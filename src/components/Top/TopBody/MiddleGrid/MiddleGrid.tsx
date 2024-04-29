import { css } from "@emotion/css";
import { firstRowNumbers, secondRowNumbers, thirdRowNumbers } from "../../../../data/data"
import { Button } from "../../../../styles/styles";
import { ButtonFontStyle } from "../../../../styles/styles"
import { NumButton } from "./NumButton";

export default function MiddleGrid() {
    return (
        <>
            <div className={MiddleGridNumStyle}>
                <NumButton numArr={firstRowNumbers}/>
                <NumButton numArr={secondRowNumbers}/>
                <NumButton numArr={thirdRowNumbers}/>
            </div>
            <div className={MiddleGridDozenStyle}>
                <Button style={ButtonFontStyle}>1~12</Button>
                <Button style={ButtonFontStyle}>13~24</Button>
                <Button style={ButtonFontStyle}>25~36</Button>
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