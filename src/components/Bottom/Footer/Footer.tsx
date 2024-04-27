import { css } from "@emotion/css";
import { FooterStyle } from "../../../styles/styles";

export default function Footer() {
    return (
        <div className={FooterStyle}>
            <span className={css`
                margin-left: 5em;
            `}>Bet limits: Ksh10.00 - Ksh1000.00</span>
            <span>Max Payout: Ksh.50,000.00</span>
        </div>
    )
}