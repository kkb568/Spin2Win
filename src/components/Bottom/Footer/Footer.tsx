import { css } from "@emotion/css";
import FooterButtons from "./FooterButtons";

export default function Footer() {
    return (
        <div className={FooterStyle}>
            <span>Bet limits: Ksh10.00 - Ksh1000.00</span>
            <span>Max Payout: Ksh.50,000.00</span>
            <FooterButtons />
        </div>
    )
}


const FooterStyle = css`
    width: 100%;
    background-color: #013b93;
    padding: .5em 0;
    display: flex;
    gap: 10em;
    font-size: 13px;

    > span {
        margin-top: .2em;

        :first-child {
            margin-left: 5em;
        }
    }
`