import { ActionBarStyle } from "../../../styles/styles";
import BetBalance from "./BetBalance";

export default function ActionBar() {
    return (
        <div className={ActionBarStyle}>
            <BetBalance />
        </div>
    )
}