import { css } from "@emotion/css";
import { useContext } from "react";
import { ChipContext } from "../../PlayArea";

export default function BetBalance() {
    const { playDataStore } = useContext(ChipContext)
    const totalBetValue: number = playDataStore.totalBet

    return (
        <div className={BetBalanceStyle}>
            <p>Total Bet</p>
            <p>KSh{totalBetValue}.00</p>
        </div>
    )
}


export const BetBalanceStyle = css`
    width: 8em;
    height: 4em;
    padding: 0 0 3px 5px;
    background-color: #efefef;
    border: 2px solid #d9d9d9;
    border-radius: 3px;
    margin-left: 2em;
    margin-right: 15em;

    @media (max-width: 900px) {
        margin-right: 7em;
    }

    @media (max-width: 600px) {
        margin-bottom: 1em;
    }

    p:first-child {
        color: #4a4a4a;
        font-size: 11px;
        text-transform: uppercase;
    }

    p:last-child {
        font-weight: 600;
        line-height: 10px;
        color: #2d2d2d;
        font-size: 18px;
    }
`