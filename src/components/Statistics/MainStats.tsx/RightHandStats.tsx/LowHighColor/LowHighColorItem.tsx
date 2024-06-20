import { css } from "@emotion/css"
import { countPrevNumsByType } from "../../../../../utils/statsUtils"
import { useContext } from "react";
import { MainContext } from "../../../../../App";

interface Props {
    desc: string,
    color: string,
    repColor: string
}

export default function LowHighColorItem({ desc, color, repColor }: Props) {
    const { mainData } = useContext(MainContext);
    const { previousChosenNums } = mainData;

    const statsType = desc.concat(` ${repColor}`);
    const countStats = countPrevNumsByType(statsType, previousChosenNums);

    const descStyle = css`
        padding: .5em;
        background-color: ${color};
        margin-bottom: .2em;
    `
    
    return (
        <div>
            <div className={descStyle}>
                {desc}
            </div>
            <div className={numStyle}>
                {countStats}
            </div>
        </div>
    )
}


const numStyle = css`
    padding: .5em;
    background-color: #480008;
    text-align: center;
    font-weight: bold;
`