import { css } from "@emotion/css"
import { HotColdNumDiv } from "../../../../../../styles/styles"

interface Props {
    num: number
}

export default function ColdValueNum({ num }: Props) {
    return (
        <HotColdNumDiv className={coldValueNumStyle}>
            {num}
        </HotColdNumDiv>
    )
}

const coldValueNumStyle = css`
    color: #005383;
    background: linear-gradient(180deg,#7eccff 0,#d3fffc 100%);
`