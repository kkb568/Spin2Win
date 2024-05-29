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
    margin-right: 2.5em;
    margin-top: 1em;
`