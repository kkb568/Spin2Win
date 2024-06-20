import { css } from "@emotion/css"
import fire from "../../../../../../assets/fire.svg"
import EmptyValueList from "../EmptyValues/EmptyValueList"
import { prevNumDataType, rowNumFreqDataType } from "../../../../../../data/dataTypes";
import { getPrevNumFrequency } from "../../../../../../utils/prevNumUtils";
import HotValueNum from "./HotValueNum";
import ZeroNum from "../ZeroNum";
import { useContext } from "react";
import { MainContext } from "../../../../../../App";

export default function HotValues() {
    const { mainData } = useContext(MainContext);
    const prevNumsArr: prevNumDataType[] = mainData.previousChosenNums;
    
    // Get the frequencies for each number (0 to 36).
    const numFreqArr: rowNumFreqDataType[] = getPrevNumFrequency(prevNumsArr);
    // Get the top five elements from the array.
    const topFiveNumFreqArr = numFreqArr.slice(0, 5);
    // Render the hot values from the topFiveNumFreqArr elements.
    const hotValuesList =  topFiveNumFreqArr.map((numFreq) => {
        return (
            numFreq.number === 0 ?
            <ZeroNum key={numFreq.number} /> :
            <HotValueNum key={numFreq.number} num={numFreq.number} />
        )
    })

    return (
        <div className={hotValuesStyle}>
            <img src={fire} alt="fire image" />
            {
                prevNumsArr.length === 0 ? 
                <EmptyValueList /> : 
                <div className={hotValuesListStyle}>
                    {hotValuesList}
                </div>
            }
        </div>
    )
}

const hotValuesStyle = css`
    display: flex;
    align-items: center;
    gap: .5em;
    width: 10.5em;
    height: 2em;
    background: linear-gradient(180deg, rgba(0,24,59,0) 0,#ff3131 55.08%,#ff7e31 100%);
    border-radius: 0 0 3px 3px;

    img {
        margin-left: .3em;
    }
`

const hotValuesListStyle = css`
    display: flex;
    gap: .3em;
`