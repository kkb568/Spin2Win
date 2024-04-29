import { css } from "@emotion/css";
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


const PlayAreaStyle = css`
    width: 960px;
    height: 80vh;
    color: white;
`