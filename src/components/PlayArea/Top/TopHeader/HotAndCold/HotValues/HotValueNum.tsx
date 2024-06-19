import { css } from "@emotion/css"
import { HotColdNumDiv } from "../../../../../../styles/styles"

interface Props {
    num: number
}

export default function HotValueNum({ num }: Props) {
    return (
        <HotColdNumDiv className={hotValueNumStyle}>
            {num}
        </HotColdNumDiv>
    )
}

const hotValueNumStyle = css`
    color: #730900;
    background: linear-gradient(180deg,#ffa941 0,#fff400 100%);
`