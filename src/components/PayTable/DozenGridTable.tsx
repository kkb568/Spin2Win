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

    @media (max-width: 900px) {
        width: 15.5em;
        height: 6.5em;
        margin-top: 11.6em;
    }

    @media (max-width: 600px) {
        width: 7.5em;
        margin-top: 29em;
        margin-left: 4.6em;
    }
`