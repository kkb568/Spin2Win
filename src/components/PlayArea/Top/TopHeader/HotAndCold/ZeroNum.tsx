import { css } from "@emotion/css";
import { Diamond, HotColdNumDiv } from "../../../../../styles/styles";

export default function ZeroNum() {
    return (
        <HotColdNumDiv className={zeroNumStyle}>
            <Diamond className={diamondStyle}/>
        </HotColdNumDiv>
    )
}

const zeroNumStyle = css`
    background: linear-gradient(180deg,#7ec000 0,#5eb300 100%);
`

const diamondStyle = css`
    background-color: #3e7600;
    width: .7em;
    height: 1.2em;
`