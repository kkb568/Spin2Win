import { css } from "@emotion/css";
import { topGridButtons } from "../../../../../../data/data";
import TopGridButton from "./TopGridButton";
import { useContext } from "react";
import { MainContext } from "../../../../../../App";

/* This component renders the buttons at the first grid */
export default function TopGrid() {
    const { mainData } = useContext(MainContext);
    const { low_high, numColor } = mainData.correctValueData;
    
    const chosenNumDetails = low_high.concat(` ${numColor}`);

    const topGridButtonList = topGridButtons.map((button) => {
        return (
            <TopGridButton key={button.key}
                name={button.name}
                diamondColor={button.backgroundColor}
                chosenNumDetails={chosenNumDetails} />
        )
    })

    return (
        <div className={TopGridStyle}>
            {topGridButtonList}
        </div>
    )
}


const TopGridStyle = css`
    float: right;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-right: -.5em;

    @media (max-width: 900px) {
        float: left;
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
        margin-left: -4em;
        margin-bottom: 1em;
    }
`