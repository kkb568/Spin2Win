import { Button } from "../../../styles/styledComponents";
import { BottomGridStyle, ButtonFontStyle } from "../../../styles/styles";

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