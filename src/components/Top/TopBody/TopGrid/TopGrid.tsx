import { css } from "@emotion/css";
import { topGridButtons } from "../../../../data/data";
import TopGridButton from "./TopGridButton";

/* This component renders the buttons at the first grid */
export default function TopGrid() {
    const topGridButtonList = topGridButtons.map((button) => {
        return (
            <TopGridButton key={button.key}
                name={button.name}
                diamondColor={button.backgroundColor} />
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