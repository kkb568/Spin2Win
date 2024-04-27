import { firstRowNumbers, secondRowNumbers, thirdRowNumbers } from "../../../../data/data"
import { Button } from "../../../../styles/styledComponents";
import { ButtonFontStyle, MiddleGridDozenStyle, MiddleGridNumStyle } from "../../../../styles/styles"
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