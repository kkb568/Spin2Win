import { css } from "@emotion/css";
import { PayTableGridSection } from "../../styles/styles";

export default function DozenGridTable() {
    return (
        <PayTableGridSection className={DozenGridTableStyle}>
            <p>Dozens <b>x3</b></p>
        </PayTableGridSection>
    )
}

const DozenGridTableStyle = css`
    border: 3px solid white;
    border-top: none;
    border-radius: 0 0 3px 3px;
    width: 31em;
    height: 2em;
    margin-left: 7.6em;
    margin-top: 3.1em;
    background-color: rgba(25,103,255,.5);
`