import { TopBodyStyle } from "../../../styles/styles";
import BottomGrid from "./BottomGrid";
import MiddleGrid from "./MiddleGrid/MiddleGrid";
import TopGrid from "./TopGrid";

export default function TopBody() {
    return (
        <div className={TopBodyStyle}>
            <TopGrid />
            <br/><br/><br/>
            <MiddleGrid />
            <br/>
            <BottomGrid />
        </div>
    )
}