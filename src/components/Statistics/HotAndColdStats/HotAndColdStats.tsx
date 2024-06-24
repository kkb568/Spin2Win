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
    margin-left: 2.5em;
    margin-top: 1em;
    text-transform: uppercase;
    width: 53em;
    height: 10em;

    @media (max-width: 900px) {
        width: 33em;
    }

    @media (max-width: 600px) {
        width: 18em;
    }
`