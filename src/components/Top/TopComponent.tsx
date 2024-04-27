import { TopComponentStyle } from "../../styles/styles";
import TopBody from "./TopBody/TopBody";
import TopHeader from "./TopHeader";

// This is the top part of the PlayArea (the whole red area).
export default function TopComponent() {
    return (
        <div className={TopComponentStyle}>
            <TopHeader />
            <TopBody />
        </div>
    )
}