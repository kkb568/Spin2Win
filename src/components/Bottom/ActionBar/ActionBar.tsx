import { css } from "@emotion/css";
import BetBalance from "./BetBalance";
import Chips from "./Chips/Chips";

export default function ActionBar() {
    return (
        <div className={ActionBarStyle}>
            <BetBalance />
            <Chips />
        </div>
    )
}


const ActionBarStyle = css`
    display: flex;
    width: 100%;
    background-color: #192348;
    padding: 1em 0;
`