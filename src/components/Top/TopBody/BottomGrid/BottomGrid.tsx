import { css } from "@emotion/css";
import DescButton from "./DescButton";
import DiamondButton from "./DiamondButton";

export default function BottomGrid() {
    return (
        <div className={BottomGridStyle}>
            <DescButton description="low"/>
            <DescButton description="even"/>
            <DiamondButton color="#ff001f"/>
            <DiamondButton color="#1f1f1f"/>
            <DescButton description="odd"/>
            <DescButton description="high"/>
        </div>
    )
}


const BottomGridStyle = css`
    display: grid;
    grid-template-columns: repeat(6, 1fr);  
`