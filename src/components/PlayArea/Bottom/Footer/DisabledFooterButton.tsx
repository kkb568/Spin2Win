import { css } from "@emotion/css"
import { FooterButton } from "../../../../styles/styles"

interface Props {
    iconValue: string
}

export default function DisabledFooterButton({ iconValue }: Props) {
    return (
        <FooterButton className={disabledButtonStyle}>
            <span className="material-symbols-outlined">
                {iconValue}
            </span>
        </FooterButton>
    )
}


const disabledButtonStyle = css`
    cursor: context-menu;
    background-color: #02348a;
    opacity: .6;
`