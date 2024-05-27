import { css } from "@emotion/css";
import DescButton from "./DescButton";
import DiamondButton from "./DiamondButton";
import { black, redColors } from "../../../../../../data/data";
import { useContext } from "react";
import { GridContext } from "../../TopBody";

export default function BottomGrid() {
    const { even_odd, low_high, numColor } = useContext(GridContext)

    return (
        <div className={BottomGridStyle}>
            <DescButton description="low" 
                correctValueDesc={low_high} />
            <DescButton description="even" 
                correctValueDesc={even_odd} />
            <DiamondButton diamondColor={redColors.diamondRed}
                representColor={redColors.normalRed}
                chosenColor={numColor}/>
            <DiamondButton diamondColor={black}
                representColor={black}
                chosenColor={numColor}/>
            <DescButton description="odd" 
                correctValueDesc={even_odd} />
            <DescButton description="high" 
                correctValueDesc={low_high} />
        </div>
    )
}


const BottomGridStyle = css`
    display: grid;
    grid-template-columns: repeat(6, 6.75em);

    @media (max-width: 900px) {
        grid-template-columns: repeat(3, 6.75em);
    }

    @media (max-width: 600px) {
        display: block;
        margin-left: -4em;
    }
`