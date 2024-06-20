import { css } from "@emotion/css"
import snow from "../../../../../../assets/snow.svg"
import EmptyValueList from "../EmptyValues/EmptyValueList"
import { prevNumDataType, rowNumFreqDataType } from "../../../../../../data/dataTypes"
import { getPrevNumFrequency } from "../../../../../../utils/prevNumUtils";
import ColdValueNum from "./ColdValueNum";
import ZeroNum from "../ZeroNum";
import { useContext } from "react";
import { MainContext } from "../../../../../../App";

export default function ColdValues() {
    const { mainData } = useContext(MainContext);
    const prevNumsArr: prevNumDataType[] = mainData.previousChosenNums;

    // Get the frequencies for each number (0 to 36).
    const numFreqArr: rowNumFreqDataType[] = getPrevNumFrequency(prevNumsArr);
    // Get the bottom five elements from the array.
    const topFiveNumFreqArr = numFreqArr.slice(-5);
    // Render the hot values from the topFiveNumFreqArr elements.
    const coldValuesList =  topFiveNumFreqArr.map((numFreq) => {
        return (
            numFreq.number === 0 ?
            <ZeroNum key={numFreq.number}/>:
            <ColdValueNum key={numFreq.number} num={numFreq.number} />
        )
    })

    return (
        <div className={coldValuesStyle}>
            {
                prevNumsArr.length === 0 ? 
                <EmptyValueList /> :
                <div className={coldValuesListStyle}>
                    {coldValuesList}
                </div>
            }
            <img src={snow} alt="snowflake image" />
        </div>
    )
}

const coldValuesStyle = css`
    display: flex;
    align-items: center;
    gap: .4em;
    width: 10.5em;
    height: 2em;
    background: linear-gradient(180deg, rgba(30,111,255,0) 0, #31d1ff 84.22%, #46f4fd 100%);
    border-radius: 0 0 3px 3px;

    > div:first-child {
        margin-left: .2em;
    }
`

const coldValuesListStyle = css`
    display: flex;
    gap: .3em;
`