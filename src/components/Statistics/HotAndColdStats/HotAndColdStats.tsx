import { css } from "@emotion/css";
import ColdStats from "./ColdStats";
import HotStats from "./HotStats";

export default function HotAndColdStats() {
    return (
        <div className={HotAndColdStatsStyle}>
            <HotStats />
            <ColdStats />
        </div>
    )
}


const HotAndColdStatsStyle = css`
    display: flex;
    gap: 12em;
    margin-left: 1.5em;
    margin-top: 1em;
    text-transform: uppercase;

    @media (min-width: 900px) {
        position: absolute;
        z-index: -1;
    }

    @media (max-width: 900px) {
        gap: 0;
    }

    @media (max-width: 600px) {
        display: block;
    }
`