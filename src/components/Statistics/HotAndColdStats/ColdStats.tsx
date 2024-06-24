import { css } from "@emotion/css"
import { HotColdStatsDiv } from "../../../styles/styles"
import snow from "../../../assets/snowStats.svg"
import { useContext } from "react"
import { MainContext } from "../../../App"
import { rowNumFreqDataType } from "../../../data/dataTypes"
import { getPrevNumFrequency } from "../../../utils/prevNumUtils"
import HotColdItem from "./HotColdItem"

export default function ColdStats() {
    const { mainData } = useContext(MainContext);
    const { previousChosenNums } = mainData;

    // Get the frequencies for each number (0 to 36).
    const numFreqArr: rowNumFreqDataType[] = getPrevNumFrequency(previousChosenNums);
    // Get the bottom five elements from the array.
    const bottomFiveNumFreqArr = numFreqArr.slice(-5);
    const coldStatsList = bottomFiveNumFreqArr.map((numFreq) => {
        
        const background: string = numFreq.number === 0 ?
        "linear-gradient(180deg,#7ec000 0,#5eb300 100%)" :
        "linear-gradient(180deg,#7eccff 0,#d3fffc 100%)"

        return (
            <HotColdItem key = {numFreq.number} 
            background = {background}
            num = {numFreq.number}
            frequency = {numFreq.frequency}
            textColor = "#005383" />
        )
    })

    return (
        <HotColdStatsDiv className={coldStatsStyle}>
            <p>Cold</p>
            <img src={snow} alt="Snowflake icon"/>
            <span>
                {coldStatsList}
            </span>
        </HotColdStatsDiv>
    )
}


const coldStatsStyle = css`
    float: right;
    background: linear-gradient(90deg,rgba(30,111,255,0) 0,#31d1ff 84.22%,#46f4fd 100%);;
    border-radius: 0 0 1em 0;

    img {
        float: right;
        margin-right: 1em;
    }

    > span {
        float: right;
        margin-right: 1.5em;
    }

    @media (max-width: 900px) {
        margin-top: 1em;

        > span {
            margin-right: -4em;
            margin-top: 3em;
        }
    }
`