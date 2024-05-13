import { css } from "@emotion/css";
import BetBalance from "./BetBalance";
import Chips from "./Chips/Chips";
import PlayButton from "./PlayButton";

export default function ActionBar() {
    return (
        <div className={ActionBarStyle}>
            <BetBalance />
            <Chips />
            <PlayButton />
        </div>
    )
}


const ActionBarStyle = css`
    display: flex;
    width: 100%;
    background-color: #192348;
    padding: 1em 0;
`