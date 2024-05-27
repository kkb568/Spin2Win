import { css } from "@emotion/css";
import { PayTableGridSection } from "../../styles/styles";

export default function GreenButtonTable() {
    return (
        <PayTableGridSection className={GreenButtonTableStyle}>
            <p>Green <b>x36</b></p>
        </PayTableGridSection>
    )
}

const GreenButtonTableStyle = css`
    width: 8.5em;
    height: 2.4em;
    margin-top: -5.62em;
    margin-left: 2em;
    background-color: rgba(25,103,255,.7);
    border: 3px solid white;
    border-bottom: 0;
    border-radius: 3px 3px 0 0;
    transform: rotate(-90deg);

    @media (max-width: 900px) {
        margin-top: -14.12em;
    }

    @media (max-width: 600px) {
        margin-top: -31.52em;
        margin-left: -1.02em;
    }
`