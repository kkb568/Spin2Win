import { css } from "@emotion/css";
import { prevNumDataType } from "../../../../data/dataTypes";
import PreviousNum from "./PreviousNum";
import { assignBackgroundColor } from "../../../../utils/chipUtils";

// This is the dark red heading that would contain game's statistics.
export default function TopHeader() {
    const prevChosenNums: prevNumDataType[] | any[] = JSON.parse(sessionStorage.getItem("previousChosenNums"));

    let prevNumsList: JSX.Element[];
    if (prevChosenNums.length > 0) {
        const prevNumsArr: prevNumDataType[] = prevChosenNums;
        // Get the most recent previous number's key.
        const recentPrevNumKey: number = prevNumsArr[0].key;
         
        prevNumsList = prevNumsArr.map((prev) => {
            const color: string = prev.value !== 0 && 
            assignBackgroundColor(prev.value);

            return (
                <PreviousNum key={prev.key}
                    keyValue={prev.key} 
                    value={prev.value}
                    color={color}
                    recentKeyValue={recentPrevNumKey} />
            )
        })
    }

    /* If there isn't any previous chosen nums (from previous spin wheel rotation), display the text below,
    otherwise, display the prevNumsList. */
    const prevNumsData: JSX.Element | JSX.Element[] = prevChosenNums.length === 0 ? 
        <p>Statistics are not available yet.</p> : 
        prevNumsList

    return (
        <div className={TopHeaderStyle}>
            <div className={prevNumListStyle}>
                {prevNumsData}
            </div>
        </div>
    )
}


const TopHeaderStyle = css`
    background-color: rgba(0, 0, 0, .3);
    box-shadow:  0 1px 0 0 rgba(0,0,0,.5);
    padding: .1em;
    display: flex;

    p {
        margin-left: 1.5em;
        font-size: 13px;
    }
`

const prevNumListStyle = css`
    display: flex;
    align-items: center;
`