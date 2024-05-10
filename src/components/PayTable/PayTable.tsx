import { css } from "@emotion/css"
import TopGridTable from "./TopGridTable"
import NumGridTable from "./NumGridTable"
import GreenButtonTable from "./GreenButtonTable"
import DozenGridTable from "./DozenGridTable"
import BottomGridTable from "./BottomGridTable"
import { useContext } from "react"
import { MainContext } from "../../App"

// The component shows the blue PayTable modal page shown on top of the PlayArea component
export default function PayTable() {
    const { mainData, setDisplay } = useContext(MainContext);

    const PayTableStyle = css`
        display: ${mainData.displayValue};
        position: absolute;
        z-index: 6;
        width: 960px;
        height: 84.5vh;
        background-color: rgba(0,24,100,.9);
        color: white;

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
        }
    `

    return (
        <div className={PayTableStyle}>
            <p className={PayTableHeadingStyle}>Paytable</p>
            <i className="fa-solid fa-xmark"
            onClick={() => setDisplay("none")}></i>
            <TopGridTable />
            <NumGridTable />
            <GreenButtonTable />
            <DozenGridTable />
            <BottomGridTable />
        </div>
    )
}


const PayTableHeadingStyle = css`
    font-size: 1.5em;
    text-transform: uppercase;
    margin-left: 2.5em;
    margin-top: 1.2em;
`