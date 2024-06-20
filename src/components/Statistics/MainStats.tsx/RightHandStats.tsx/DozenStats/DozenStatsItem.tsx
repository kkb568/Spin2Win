import { css } from "@emotion/css"
import { countInPercentage, countPrevNumsByType } from "../../../../../utils/statsUtils"
import { MainContext } from "../../../../../App";
import { useContext } from "react";

interface Props {
    desc: string
}

export default function DozenStatsItem({ desc }: Props) {
    const { mainData } = useContext(MainContext);
    const { previousChosenNums } = mainData;

    // Get the number of prevNums's values (in percentage) that meet the desc value's attribute.
    const dozenCount = countPrevNumsByType(desc, previousChosenNums);
    const dozenCountPercent = countInPercentage(dozenCount, previousChosenNums);

    const orangeBarStyle = css`
        width: ${`${dozenCountPercent}%`};
        height: 1.2em;
        background-color: #f5a623;
        border-radius: 1em;
    `

    return (
        <span className={dozenStatsStyle}>
            <div className={statsBarStyle}>
                <div className={orangeBarStyle} />
            </div>
            <p>{desc}</p>
        </span>
    )
}


const dozenStatsStyle = css`
    display: flex;
    align-items: center;
    gap: 1em;
    margin-bottom: -.7em;
`

const statsBarStyle = css`
    width: 10em;
    height: 1.3em;
    background-color: #273945;
    border: 1px solid #1f1f1f;
    border-radius: 1em;
    display: flex;
    align-items: center;
`