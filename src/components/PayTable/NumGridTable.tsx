import { css, cx } from "@emotion/css";
import { PayTableGridSection } from "../../styles/styles";
import { prevNumDataType } from "../../data/dataTypes";

export default function NumGridTable() {
    const prevChosenNums: prevNumDataType[] | any[] = JSON.parse(sessionStorage.getItem("previousChosenNums"));

    // Make the heightValue match up to the height of of the respective grid in the PlayArea component.
    const heightValue: number = prevChosenNums.length === 0 ? 8.5 : 8.6;
    const tabletHeightValue: number = prevChosenNums.length === 0 ? 17 : 17.2;
    const phoneHeightValue: number = prevChosenNums.length === 0 ? 34.4 : 34.5;

    const NumGridTableHeight = css`
        height: ${`${heightValue}em`};

        @media (max-width: 900px) {
            height: ${`${tabletHeightValue}em`};
        }

        @media (max-width: 600px) {
            height: ${`${phoneHeightValue}em`};
        }
    `

    return (
        <PayTableGridSection 
        className={cx(NumGridTableStyle, NumGridTableHeight)}>
            <p>Exact Number <b>x36</b></p>
        </PayTableGridSection>
    )
}

const NumGridTableStyle = css`
    margin-left: 7.6em;
    margin-top: 3.7em;
    width: 31em;
    background-color: rgba(25,103,255,.7);
    border: 3px solid white;
    border-radius: 0 3px 0 0;

    @media (max-width: 900px) {
        width: 15.5em;
    }

    @media (max-width: 600px) {
        margin-left: 4.6em;
        margin-top: 6.2em;
        width: 7.5em;
        text-align: center;
    }
`