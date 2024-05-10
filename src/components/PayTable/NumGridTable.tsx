import { css } from "@emotion/css";
import { PayTableGridSection } from "../../styles/styles";

export default function NumGridTable() {
    return (
        <PayTableGridSection className={NumGridTableStyle}>
            <p>Exact Number <b>x36</b></p>
        </PayTableGridSection>
    )
}

const NumGridTableStyle = css`
    margin-left: 7.6em;
    margin-top: 3.7em;
    width: 31em;
    height: 8.5em;
    background-color: rgba(25,103,255,.7);
    border: 3px solid white;
    border-radius: 0 3px 0 0;
`