import { css, cx } from "@emotion/css"
import { prevNumDataType } from "../../data/dataTypes";
import LastResults from "./LastResults/LastResults";
import MainStatistics from "./MainStats.tsx/MainStats";
import { useContext } from "react";
import { MainContext } from "../../App";

export default function Statistics() {
    const { mainData, setDisplay } = useContext(MainContext);

    const prevChosenNums: prevNumDataType[] | any[] = JSON.parse(sessionStorage.getItem("previousChosenNums"));

    // Make the heightValue match up to the height of the PlayArea component.
    const heightValue: number = prevChosenNums.length === 0 ? 84.5 : 85.1;
    const tabletHeightValue: number = prevChosenNums.length === 0 ? 141.5 : 142.1;
    const phoneHeightValue: number = prevChosenNums.length === 0 ? 260.8 : 261.5;

    const StatisticsDisplayStyle = css`
        display: ${mainData.displayStatistics};
        height: ${`${heightValue}vh`};

        @media (max-width: 900px) {
            height: ${`${tabletHeightValue}vh`};
        }

        @media (max-width: 600px) {
            height: ${`${phoneHeightValue}vh`};
        }
    `

    return (
        <div className={cx(statistics_style, StatisticsDisplayStyle)}>
            <div className={statisticsHeadingStyle}>
                <p>Statistics</p>
                <p>Based on the last 
                    {prevChosenNums.length === 1 ? " draw" : ` ${prevChosenNums.length} draws`}
                </p>
            </div>
            <i className="fa-solid fa-xmark"
            onClick={() => setDisplay("displayStatistics", "none")}></i>
            <MainStatistics />
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

    i {
        float: right;
        cursor: pointer;
        margin-right: 2.5em;
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
    }

    @media (max-width: 600px) {
        width: 350px;
    }
`

const statisticsHeadingStyle = css`
    display: flex;
    align-items: baseline;
    gap: 1em;
    margin-left: 2.5em;
    margin-top: 1.2em;

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