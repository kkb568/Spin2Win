import { css } from "@emotion/css";
import BetBalance from "./BetBalance";
import Chips from "./Chips/Chips";
import GamePlayButton from "./GamePlayButton";

export default function ActionBar() {
    return (
        <div className={ActionBarStyle}>
            <BetBalance />
            <Chips />
            <GamePlayButton />
        </div>
    )
}


const ActionBarStyle = css`
    display: flex;
    width: 100%;
    background-color: #192348;
    padding: 1em 0;
    
    @media (max-width: 900px) {
        align-items: center;
    }

    @media (max-width: 600px) {
        display: block;
    }
`