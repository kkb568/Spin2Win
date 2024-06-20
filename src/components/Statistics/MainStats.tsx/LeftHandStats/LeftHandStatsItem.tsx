import { css, cx } from "@emotion/css"
import { countInPercentage, countPrevNumsByType, countZeroNums } from "../../../../utils/statsUtils";
import { useContext } from "react";
import { MainContext } from "../../../../App";

interface Props {
    leftPieceDesc: string,
    rightPieceDesc: string,
    leftPieceColor: string,
    rightPieceColor: string
}

export default function LeftHandStatsItem({
    leftPieceDesc,
    rightPieceDesc,
    leftPieceColor,
    rightPieceColor
}: Props) {
    const { mainData } = useContext(MainContext);
    const { previousChosenNums } = mainData;

    // Get the number of prevNums's values (in percentage) that meet the desc value's attribute.
    const leftPieceCount = countPrevNumsByType(leftPieceDesc, previousChosenNums);
    const leftPieceCountPercent = countInPercentage(leftPieceCount, previousChosenNums);
    const rightPieceCount = countPrevNumsByType(rightPieceDesc, previousChosenNums);
    const rightPieceCountPercent = countInPercentage(rightPieceCount, previousChosenNums);
    
    // Get the number of previous nums whose value is equal to zero.
    const countZeros = countZeroNums(previousChosenNums);
    const countZerosPercent = countInPercentage(countZeros, previousChosenNums);

    const leftBarVarStyle = css`
        width: ${`${leftPieceCountPercent}%`};
        background-color: ${leftPieceColor};
    `

    const statsBarColor = css`
         background-color: ${rightPieceColor};
    `

    /* If the countZeroPercent is less than 10 
    (to prevent squeezing the value when shown to user on small percentage),
    set the width to 1.3em, otherwise, set to the countZeroPercent as percentage. 
    Also, if the leftPieceCountPercent is equal to zero 
    (so as to prevent going outside the statsBar),
    set the margin-left to 0, otherwise, set it to -1em. */
    const greenBarVarStyle = css`
        width: ${countZerosPercent < 10 ? 
        "1.3em" : `${countZerosPercent}%`};
        margin-left: ${leftPieceCountPercent === 0 ? "0em" : "-1em"};
    `

    return (
        <div className={leftHandStatsItemStyle}>
            <span>
                <p>{leftPieceDesc}</p>
                <p>{rightPieceDesc}</p>
            </span>
            <div className={cx(statsBarStyle, statsBarColor)}>
                <div className={cx(leftBarStyle, leftBarVarStyle)}>
                    <span>{leftPieceCountPercent}%</span>
                </div>
                <div className={cx(greenBarStyle, greenBarVarStyle)}>
                    <span>{countZerosPercent}%</span>
                </div>
                <span>{rightPieceCountPercent}%</span>
            </div>
        </div>
    )
}


const leftHandStatsItemStyle = css`
    margin-bottom: 1em;
    
    span {
        display: flex;
        gap: 7em;
        margin-bottom: -.5em;
    }
`

const statsBarStyle = css`
    width: 12.5em;
    height: 1.3em;
    border: 1px solid #1f1f1f;
    border-radius: 1em;
    display: flex;
    align-items: center;
    
    div ~ span {
        position: absolute;
        margin-left: 13em;
        margin-top: -.5em;
        font-size: .8em;
    }
`

const leftBarStyle = css`
    height: 1.2em;
    border-radius: 1em;

    span {
        font-size: .8em;
        margin-left: .5em;
        margin-top: .1em;
    }
`

const greenBarStyle = css`
    height: 1.2em;
    background-color: #5fb402;
    border-radius: 1em;
    display: flex;
    justify-content: center;

    span {
        font-size: .8em;
        margin-top: .2em;
    }
`