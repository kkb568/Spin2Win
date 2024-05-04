import { css } from "@emotion/css";
import BottomGrid from "./BottomGrid/BottomGrid";
import LionIcons from "./LionIcons";
import MiddleGrid from "./MiddleGrid/MiddleGrid";
import TopGrid from "./TopGrid/TopGrid";
import ActionSection from "./ActionSection";

// This is the main playing area.
export default function TopBody() {
    return (
        <div className={TopBodyStyle}>
            <TopGrid />
            <br/><br/><br/>
            <MiddleGrid />
            <br/>
            <BottomGrid />
            <LionIcons />
            <ActionSection />
        </div>
    )
}


const TopBodyStyle = css`
    margin: 0 10em;
    padding: 2em 0;
`