import { css } from "@emotion/css";
import { PayTableGridSection } from "../../styles/styles";

export default function BottomGridTable() {
    return (
        <PayTableGridSection className={BottomGridTableStyle}>
            <p>Low/High / Even/Odd / Red/Black <b>x2</b></p>
        </PayTableGridSection>
    )
}

const BottomGridTableStyle = css`
    border: 3px solid white;
    border-radius: 3px;
    width: 30.5em;
    height: 2em;
    margin-left: 7.6em;
    margin-top: 1em;
    background-color: rgba(25,103,255,.35);
`