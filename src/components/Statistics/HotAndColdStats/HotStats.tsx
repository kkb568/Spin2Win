import { css } from "@emotion/css"
import { HotColdStatsDiv } from "../../../styles/styles"
import fire from "../../../assets/fireStats.svg";
import { useContext } from "react";
import { MainContext } from "../../../App";
import { rowNumFreqDataType } from "../../../data/dataTypes";
import { getPrevNumFrequency } from "../../../utils/prevNumUtils";
import HotColdItem from "./HotColdItem";

export default function HotStats() {
    const { mainData } = useContext(MainContext);
    const { previousChosenNums } = mainData;

    // Get the frequencies for each number (0 to 36)
    const numFreqArr: rowNumFreqDataType[] = getPrevNumFrequency(previousChosenNums);
    // Get the top five elements from the array.
    const topFiveNumFreqArr = numFreqArr.slice(0, 5);
    const hotStatsList = topFiveNumFreqArr.map((numFreq) => {
        
        const background: string = numFreq.number === 0 ?
        "linear-gradient(180deg,#7ec000 0,#5eb300 100%)" :
        "linear-gradient(180deg,#ffa941 0,#fff400 100%)"

        return (
            <HotColdItem key = {numFreq.number}
            background = {background}
            num = {numFreq.number}
            frequency = {numFreq.frequency}
            textColor = "#730900" />
        )
    })

    return (
        <HotColdStatsDiv className={hotStatsStyle}>
            <p>Hot</p>
            <img src={fire} alt="Fire icon"/>
            <span>
                {hotStatsList}
            </span>
        </HotColdStatsDiv>
    )
}

const hotStatsStyle = css`
    float: left;
    background: linear-gradient(273.41deg, rgba(255,96,96,0) 0,#ff3131 55.08%,#ff7e31 100%);
    border-radius: 0 0 0 1em;

    img {
        margin-left: 1em;
    }

    > span {
        margin-left: 1em;
    }

    @media (max-width: 600px) {
        margin-bottom: 5em;
    }
`