import { css } from "@emotion/css"
import { FooterButton } from "../../../styles/styles"
import { howToPlayUrl } from "../../../data/data"

export default function FooterButtons() {
    return (
        <div className={buttonDivStyle}>
            <FooterButton>
                <a href={howToPlayUrl} target="_blank"></a>
                <span className="material-symbols-outlined">
                        help
                </span>
            </FooterButton>
            <FooterButton>
                <span className="material-symbols-outlined">
                    attach_money
                </span>
            </FooterButton>
            <FooterButton>
                <span className="material-symbols-outlined">
                    bar_chart
                </span>
            </FooterButton>
        </div>
    )
}

const buttonDivStyle = css`
    display: flex;
    gap: .2em;
    margin-left: 7em;
`