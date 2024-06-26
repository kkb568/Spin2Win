import { css, cx } from "@emotion/css"
import LastResults from "./LastResults/LastResults";
import MainStatistics from "./MainStats.tsx/MainStats";
import { useContext } from "react";
import { MainContext } from "../../App";
import HotAndColdStats from "./HotAndColdStats/HotAndColdStats";
import WheelStats from "./WheelStats/WheelStats";

// The component shows the statistics modal.
export default function Statistics() {
    const { mainData, setMainState } = useContext(MainContext);
    const { previousChosenNums, displayStatistics } = mainData;

    const StatisticsDisplayStyle = css`
        display: ${displayStatistics};
    `

    return (
        <div className={cx(statistics_style, StatisticsDisplayStyle)}>
            <div className={statisticsHeadingStyle}>
                <p>Statistics</p>
                <p>Based on the last 
                    {previousChosenNums.length === 1 ? " draw" : ` ${previousChosenNums.length} draws`}
                </p>
            </div>
            <i className="fa-solid fa-xmark"
            onClick={() => setMainState("displayStatistics", "none")}></i>
            <MainStatistics />
            <HotAndColdStats />
            <WheelStats />
            <LastResults />
        </div>
    )
}


const statistics_style = css`
    position: absolute;
    z-index: 10;
    width: 960px;
    color: white;
    background-color: rgba(45,0,4,.9);
    height: 598.5px;

    i {
        float: right;
        cursor: pointer;
        margin-right: 1.5em;
        margin-top: -1.8em;
        font-size: 2em;
        transition: .3s ease;

        :hover {
            transform: scale(1.1);
        }

        @media (max-width: 900px) {
            margin-right: 1em;
        }
    }

    @media (max-width: 900px) {
        width: 600px;
        height: 1035.5px;
    }

    @media (max-width: 600px) {
        width: 350px;
        height: 1875.8px;
    }
`

const statisticsHeadingStyle = css`
    display: flex;
    align-items: baseline;
    gap: 1em;
    margin-left: 2.5em;

    @media (max-width: 600px) {
        display: block;
    }

    p:first-child {
        font-size: 1.5em;
        text-transform: uppercase;
    }

    p:last-child {
        font-size: .8em;
        color: #f5a623;
    }
`