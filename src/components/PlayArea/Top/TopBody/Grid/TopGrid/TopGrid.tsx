import { css } from "@emotion/css";
import { topGridButtons } from "../../../../../../data/data";
import TopGridButton from "./TopGridButton";
import { useContext } from "react";
import { GridContext } from "../../TopBody";

/* This component renders the buttons at the first grid */
export default function TopGrid() {
    const { low_high, numColor } = useContext(GridContext);
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
`