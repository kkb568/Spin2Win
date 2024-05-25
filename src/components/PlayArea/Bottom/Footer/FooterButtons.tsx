import { css } from "@emotion/css"
import { FooterButton } from "../../../../styles/styles"
import { howToPlayUrl } from "../../../../data/data"
import { useContext } from "react"
import { MainContext } from "../../../../App"
import { ChipContext } from "../../PlayArea"
import DisabledFooterButton from "./DisabledFooterButton"

export default function FooterButtons() {
    const { setDisplay } = useContext(MainContext);
    const { playDataStore } = useContext(ChipContext);
    const { disableFooterButtons } = playDataStore;

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
                disableFooterButtons ?
                <DisabledFooterButton iconValue="bar_chart"/> :
                <FooterButton className={enabledButtonStyle}>
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
`

const enabledButtonStyle = css`
    background-color: #1967ff;
    cursor: pointer;
`