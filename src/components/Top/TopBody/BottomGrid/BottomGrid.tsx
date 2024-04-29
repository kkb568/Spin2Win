import { css } from "@emotion/css";
import { Button } from "../../../../styles/styles";
import { ButtonFontStyle } from "../../../../styles/styles";

export default function BottomGrid() {
    return (
        <div className={BottomGridStyle}>
            <Button style={ButtonFontStyle}>Low</Button>
            <Button style={ButtonFontStyle}>Even</Button>
            <Button style={ButtonFontStyle}>Odd</Button>
            <Button style={ButtonFontStyle}>High</Button>
        </div>
    )
}


const BottomGridStyle = css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);  
`