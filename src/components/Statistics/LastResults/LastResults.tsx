import { css } from "@emotion/css"
import { prevNumDataType } from "../../../data/dataTypes";
import { assignBackgroundColor } from "../../../utils/chipUtils";
import PrevNumStats from "./PrevNumStats";
import { useContext } from "react";
import { MainContext } from "../../../App";

export default function LastResults() {
    const { mainData } = useContext(MainContext);
    const prevChosenNums = mainData.previousChosenNums;

    let prevNumsList: JSX.Element[];
    if (prevChosenNums.length > 0) {
        const prevNumsArr: prevNumDataType[] = prevChosenNums;

        // Get the most recent previous number's key.
        const recentPrevNumKey: number = prevNumsArr[0].key;

        /* Show only the last 14 previous chosen numbers 
        (to prevent the numbers overlapping over other elements). */
            prevNumsList = prevNumsArr.map((prev) => {
            if (prev.key > (prevChosenNums.length - 14)) {
                const color: string = prev.value !== 0 && 
                assignBackgroundColor(prev.value);

                return (
                    <PrevNumStats key={prev.key}
                        keyValue={prev.key} 
                        value={prev.value}
                        color={color}
                        recentKeyValue={recentPrevNumKey} />
                )
            }
        })
    }

    return (
        <div className={lastResultsStyle}>
            <span>Last results</span>
            <div className={prevNumsStats_Style}>
                {prevNumsList}
            </div>
        </div>
    )
}


const lastResultsStyle = css`
    position: absolute;
    top: 85%;
    width: 53em;
    height: 3em;
    background-color: #86000f;
    margin-left: 3em;
    border-radius: 50px;
    display: flex;
    gap: 1.5em;

    span {
        position: relative;
        top: .8em;
        margin-left: 1em;
        text-transform: uppercase;
        font-weight: bold;
    }

    @media (max-width: 900px) {
        display: block;
        width: 31em;
        height: 12em;
        margin-top: -15em;
        padding: 1em;
    }

    @media (max-width: 600px) {
        width: 18em;
        height: 18em;
        margin-top: -30em;
        margin-left: 1em;
    }
`

const prevNumsStats_Style = css`
    display: flex;
    align-items: center;

    @media (max-width: 900px) {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        margin-top: 1em;
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(4, 5em);
    }
`