import { css } from "@emotion/css";
import ColdValues from "./ColdValues/ColdValues";
import HotValues from "./HotValues/HotValues";

export default function HotAndCold() {
    return (
        <div className={hotColdValueStyle}>
            <HotValues />
            <ColdValues />
        </div>
    )
}

const hotColdValueStyle = css`
    display: flex;
    gap: .5em;

    @media (max-width: 900px) {
        margin-bottom: .3em;
        margin-left: .3em;
    }
`