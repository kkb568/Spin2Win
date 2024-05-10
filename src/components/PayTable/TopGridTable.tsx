import { css } from "@emotion/css";
import { PayTableGridSection } from "../../styles/styles";

export default function TopGridTable() {
    return (
        <PayTableGridSection className={TopGridTableStyle}>
            <p>Low/High & Colour <b>x4</b></p>
        </PayTableGridSection>
    )
}


const TopGridTableStyle = css`
    float: right;
    margin-right: 7.2em;
    margin-top: -.2em;
    width: 13.9em;
    height: 2em;
    border: 3px solid white;
    border-radius: 3px;
    background-color: rgba(25,103,255,.5);
`