import { css } from "@emotion/css"
import DozenStatsItem from "./DozenStatsItem"

export default function DozenStats() {
    return (
        <div className={dozenStatsStyle}>
            <span>Dozens</span>
            <DozenStatsItem desc="1~12"/>
            <DozenStatsItem desc="13~24"/>
            <DozenStatsItem desc="25~36"/>
        </div>
    )
}


const dozenStatsStyle = css`
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 1em;
`