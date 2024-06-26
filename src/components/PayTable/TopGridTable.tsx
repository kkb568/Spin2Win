import { css, cx } from "@emotion/css";
import { PayTableGridSection } from "../../styles/styles";
import { useContext } from "react";
import { MainContext } from "../../App";

export default function TopGridTable() {
    const { mainData } = useContext(MainContext);
    const { previousChosenNums } = mainData;

    // Make the heightValue match up to the height of the respective grid in the PlayArea component.
    const heightValue: number = previousChosenNums.length === 0 ? 2 : 2.15;
    const phoneHeightValue: number = previousChosenNums.length === 0 ? 4.2 : 4.3;

    const TopGridTableHeight = css`
        height: ${`${heightValue}em`};

        @media (max-width: 600px) {
            height: ${`${phoneHeightValue}em`};
        }
    `

    return (
        <PayTableGridSection 
        className={cx(TopGridTableStyle, TopGridTableHeight)}>
            <p>Low/High & Colour <b>x4</b></p>
        </PayTableGridSection>
    )
}


const TopGridTableStyle = css`
    float: right;
    margin-right: 7.2em;
    margin-top: -.2em;
    width: 13.9em;
    border: 3px solid white;
    border-radius: 3px;
    background-color: rgba(25,103,255,.5);

    @media (max-width: 900px) {
        width: 14em;
        margin-right: 7em;
        margin-top: 1.6em;
    }

    @media (max-width: 600px) {
        margin-right: 4.2em;
        width: 7.8em;

        p {
            text-align: center;
        }
    }
`