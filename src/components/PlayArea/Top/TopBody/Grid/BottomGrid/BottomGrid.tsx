import { css } from "@emotion/css";
import DescButton from "./DescButton";
import DiamondButton from "./DiamondButton";
import { black, redColors } from "../../../../../../data/data";
import { useContext } from "react";
import { GridContext } from "../../TopBody";

export default function BottomGrid() {
    const { even_odd, low_high, red_black } = useContext(GridContext)

    return (
        <div className={BottomGridStyle}>
            <DescButton description="low" 
                correctValueDesc={low_high} />
            <DescButton description="even" 
                correctValueDesc={even_odd} />
            <DiamondButton diamondColor={redColors.diamondRed}
                representColor={redColors.normalRed}
                chosenColor={red_black}/>
            <DiamondButton diamondColor={black}
                representColor={black}
                chosenColor={red_black}/>
            <DescButton description="odd" 
                correctValueDesc={even_odd} />
            <DescButton description="high" 
                correctValueDesc={low_high} />
        </div>
    )
}


const BottomGridStyle = css`
    display: grid;
    grid-template-columns: repeat(6, 1fr);  
`