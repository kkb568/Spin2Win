import { css } from "@emotion/css";
import { Button } from "../../../../styles/styles";
import { ButtonFontStyle } from "../../../../styles/styles";

export default function TopGrid() {
    return (
        <div className={TopGridStyle}>
            <Button style={ButtonFontStyle}>Low</Button>
            <Button style={ButtonFontStyle}>High</Button>
            <Button style={ButtonFontStyle}>Low</Button>
            <Button style={ButtonFontStyle}>High</Button>
        </div>
    )
}


const TopGridStyle = css`
    float: right;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-right: -.5em;
`