import { Button } from "../../../styles/styledComponents";
import { ButtonFontStyle, TopGridStyle } from "../../../styles/styles";

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