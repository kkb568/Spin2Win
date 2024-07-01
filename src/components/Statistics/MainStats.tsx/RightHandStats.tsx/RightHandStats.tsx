import { css } from "@emotion/css"
import LowHighColorStats from "./LowHighColor/LowHighColorStats"
import DozenStats from "./DozenStats/DozenStats"

export default function RightHandStats() {
    return (
        <div className={rightSideStatsStyle}>
            <DozenStats />
            <LowHighColorStats />
        </div>
    )
}

const rightSideStatsStyle = css`
    float: right;
    margin-right: 1em;
    margin-top: 1em;

    @media (max-width: 600px) {
        float: left;
        margin-left: 1.5em;
    }
`