import { css, cx } from "@emotion/css";
import { prevNumDataType } from "../../../../data/dataTypes";
import PreviousNum from "./PreviousNum";
import { assignBackgroundColor } from "../../../../utils/chipUtils";
import HotAndCold from "./HotAndCold/HotAndCold";
import { useContext } from "react";
import { MainContext } from "../../../../App";

// This is the dark red heading that would contain game's statistics.
export default function TopHeader() {
    const { mainData } = useContext(MainContext);
    const prevChosenNums: prevNumDataType[] = mainData.previousChosenNums;

    const TopHeaderGap = css`
        gap: ${`${prevChosenNums.length === 0 ? 25.5 : 16.5}em`};
    `

    let prevNumsList: JSX.Element[];
    if (prevChosenNums.length > 0) {
        const prevNumsArr: prevNumDataType[] = prevChosenNums;
        // Get the most recent previous number's key.
        const recentPrevNumKey: number = prevNumsArr[0].key;
        
        /* Show only the last 10 previous chosen numbers 
        (to prevent the numbers overlapping over other elements). */
        prevNumsList = prevNumsArr.map((prev) => {
            if (prev.key > (prevChosenNums.length - 10)) {
                const color: string = prev.value !== 0 && 
                assignBackgroundColor(prev.value);

                return (
                    <PreviousNum key={prev.key}
                        keyValue={prev.key} 
                        value={prev.value}
                        color={color}
                        recentKeyValue={recentPrevNumKey} />
                )
            }
        })
    }

    /* If there isn't any previous chosen nums (from previous spin wheel rotation), display the text below,
    otherwise, display the prevNumsList. */
    const prevNumsData: JSX.Element | JSX.Element[] = prevChosenNums.length === 0 ? 
        <p>Statistics are not available yet.</p> : 
        prevNumsList

    return (
        <div className={cx(TopHeaderStyle, TopHeaderGap)}>
            <div className={prevNumListStyle}>
                {prevNumsData}
            </div>
            <HotAndCold />
        </div>
    )
}


const TopHeaderStyle = css`
    background-color: rgba(0, 0, 0, .3);
    box-shadow:  0 1px 0 0 rgba(0,0,0,.5);
    padding: .1em;
    display: flex;
    align-items: center;

    @media (max-width: 900px) {
        display: block;
    }

    p {
        margin-left: 1.5em;
        font-size: 13px;
    }
`

const prevNumListStyle = css`
    display: flex;
    align-items: center;
    width: 21.5em;
`