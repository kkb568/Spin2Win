import { css } from "@emotion/css";

export default function Footer() {
    return (
        <div className={FooterStyle}>
            <span>Bet limits: Ksh10.00 - Ksh1000.00</span>
            <span>Max Payout: Ksh.50,000.00</span>
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

    span:first-child {
        margin-left: 5em;
    }
`