import { css, cx } from "@emotion/css";
import { PayTableGridSection } from "../../styles/styles";
import { prevNumDataType } from "../../data/dataTypes";

export default function GreenButtonTable() {
    const prevChosenNums: prevNumDataType[] | any[] = JSON.parse(sessionStorage.getItem("previousChosenNums"));

    // Make the heightValue match up to the height of of the respective grid in the PlayArea component.
    const heightValue: number = prevChosenNums.length === 0 ? 2.4 : 2.5;

    const marginTopValue: number = prevChosenNums.length === 0 ? -5.62 : -5.75;
    const marginLeftValue: number = prevChosenNums.length === 0 ? 2 : 1.9;
    const tabletMarginTopValue: number = prevChosenNums.length === 0 ? -14.12 : -14.35;
    const phoneMarginTopValue: number = prevChosenNums.length === 0 ? -31.52 : -31.65;
    const phoneMarginLeftValue: number = prevChosenNums.length === 0 ? -1.02 : -1.12;

    const GreenGridVarStyle = css`
        height: ${`${heightValue}em`};
        margin-top: ${`${marginTopValue}em`};
        margin-left: ${`${marginLeftValue}em`};

        @media (max-width: 900px) {
            margin-top: ${`${tabletMarginTopValue}em`};
        }

        @media (max-width: 600px) {
            margin-top: ${`${phoneMarginTopValue}em`};
            margin-left: ${`${phoneMarginLeftValue}em`};
        }
    `


    return (
        <PayTableGridSection 
        className={cx(GreenButtonTableStyle, GreenGridVarStyle)}>
            <p>Green <b>x36</b></p>
        </PayTableGridSection>
    )
}

const GreenButtonTableStyle = css`
    width: 8.5em;
    background-color: rgba(25,103,255,.7);
    border: 3px solid white;
    border-bottom: 0;
    border-radius: 3px 3px 0 0;
    padding: .5px;
    transform: rotate(-90deg);
`