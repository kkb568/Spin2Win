import { css } from "@emotion/css";
import DescButton from "./DescButton";
import DiamondButton from "./DiamondButton";
import { black, diamondRed } from "../../../../../../data/data";

export default function BottomGrid() {
    return (
        <div className={BottomGridStyle}>
            <DescButton description="low"/>
            <DescButton description="even"/>
            <DiamondButton color={diamondRed}/>
            <DiamondButton color={black}/>
            <DescButton description="odd"/>
            <DescButton description="high"/>
        </div>
    )
}


const BottomGridStyle = css`
    display: grid;
    grid-template-columns: repeat(6, 1fr);  
`