import { css } from "@emotion/css"
import { FooterButton } from "../../../../styles/styles"
import { howToPlayUrl } from "../../../../data/data"
import { useContext } from "react"
import { MainContext } from "../../../../App"
import { ChipContext } from "../../PlayArea"
import DisabledFooterButton from "./DisabledFooterButton"
import { prevNumDataType } from "../../../../data/dataTypes"

export default function FooterButtons() {
    const { setDisplay } = useContext(MainContext);
    const { playDataStore } = useContext(ChipContext);
    const { disableFooterButtons } = playDataStore;

    const prevChosenNums: prevNumDataType[] | any[] = JSON.parse(sessionStorage.getItem("previousChosenNums"));

    return (
        <div className={buttonDivStyle}>
            <FooterButton className={enabledButtonStyle}>
                <a href={howToPlayUrl} target="_blank"></a>
                <span className="material-symbols-outlined">
                        help
                </span>
            </FooterButton>

            {
                disableFooterButtons ?
                <DisabledFooterButton iconValue="attach_money" /> : 
                <FooterButton onClick={() => setDisplay("displayPayTable", "block")}
                className={enabledButtonStyle}>
                    <span className="material-symbols-outlined">
                        attach_money
                    </span>
                </FooterButton>
            }
            
            {
                disableFooterButtons || prevChosenNums.length === 0 ?
                <DisabledFooterButton iconValue="bar_chart"/> :
                <FooterButton onClick={() => setDisplay("displayStatistics", "block")}
                className={enabledButtonStyle}>
                    <span className="material-symbols-outlined">
                        bar_chart
                    </span>
                </FooterButton>
            }
        </div>
    )
}

const buttonDivStyle = css`
    display: flex;
    gap: .2em;
    margin-left: 7em;

    @media (max-width: 900px) {
        margin-left: -2em;
        margin-right: 1em;
    }

    @media (max-width: 600px) {
        margin-left: 2em;
    }
`

const enabledButtonStyle = css`
    background-color: #1967ff;
    cursor: pointer;
`