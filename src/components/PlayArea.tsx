import { PlayAreaStyle } from "../styles/styles";
import BottomComponent from "./Bottom/BottomComponent";
import TopComponent from "./Top/TopComponent";

export default function PlayArea() {
    return (
        <div className={PlayAreaStyle}>
            <TopComponent />
            <BottomComponent />
        </div>
    )
}