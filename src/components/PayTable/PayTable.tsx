import { css, cx } from "@emotion/css"
import TopGridTable from "./TopGridTable"
import NumGridTable from "./NumGridTable"
import GreenButtonTable from "./GreenButtonTable"
import DozenGridTable from "./DozenGridTable"
import BottomGridTable from "./BottomGridTable"
import { useContext } from "react"
import { MainContext } from "../../App"
import { prevNumDataType } from "../../data/dataTypes"

// The component shows the blue PayTable modal page shown on top of the PlayArea component
export default function PayTable() {
    const { mainData, setMainState } = useContext(MainContext);
    const prevChosenNums: prevNumDataType[] | any[] = JSON.parse(sessionStorage.getItem("previousChosenNums"));

    // Make the heightValue match up to the height of the PlayArea component.
    const heightValue: number = prevChosenNums.length === 0 ? 594.5 : 598.5;
    const tabletHeightValue: number = prevChosenNums.length === 0 ? 992.5 : 996.5;
    const phoneHeightValue: number = prevChosenNums.length === 0 ? 1830.8 : 1835.8;

    const PayTableDisplayStyle = css`
        display: ${mainData.displayPayTable};
        height: ${`${heightValue}px`};

        @media (max-width: 900px) {
            height: ${`${tabletHeightValue}px`};
        }

        @media (max-width: 600px) {
            height: ${`${phoneHeightValue}px`};
        }
    `

    return (
        <div className={cx(PayTableStyle, PayTableDisplayStyle)}>
            <p className={PayTableHeadingStyle}>Paytable</p>
            <i className="fa-solid fa-xmark"
            onClick={() => setMainState("displayPayTable", "none")}></i>
            <TopGridTable />
            <NumGridTable />
            <GreenButtonTable />
            <DozenGridTable />
            <BottomGridTable />
        </div>
    )
}

const PayTableStyle = css`
    position: absolute;
    z-index: 6;
    width: 960px;
    background-color: rgba(0,24,100,.9);
    color: white;
    
    @media (max-width: 900px) {
        width: 600px;
    }

    @media (max-width: 600px) {
        width: 350px;
        height: 85.8em;
    }

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
`

const PayTableHeadingStyle = css`
    font-size: 1.5em;
    text-transform: uppercase;
    margin-left: 2.5em;
    margin-top: 1.2em;
`