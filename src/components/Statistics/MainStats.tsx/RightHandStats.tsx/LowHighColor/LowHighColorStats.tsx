import { css } from "@emotion/css"
import LowHighColorItem from "./LowHighColorItem"
import { blackColors, redColors } from "../../../../../data/data"

export default function LowHighColorStats() {
    return (
        <div className={lowHighColorStyle}>
            <span>Low/high & colour</span>
            <div className={lowHighColorStatsStyle}>
                <LowHighColorItem desc="low" 
                    color={redColors.normalRed}
                    repColor={redColors.normalRed} />
                <LowHighColorItem desc="high" 
                    color={redColors.normalRed}
                    repColor={redColors.normalRed} />
                <LowHighColorItem desc="low" 
                    color={blackColors.pureBlack}
                    repColor={blackColors.normalBlack} />
                <LowHighColorItem desc="high" 
                    color={blackColors.pureBlack}
                    repColor={blackColors.normalBlack} />
            </div>
        </div>
    )
}

const lowHighColorStyle = css`
    text-transform: uppercase;

    span {
        font-weight: bold;
    }
`

const lowHighColorStatsStyle = css`
    display: flex;
    gap: .2em;
    margin-top: .5em;
`