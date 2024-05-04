import { css } from "@emotion/css"
import { Diamond, PlayButton } from "../../../../styles/styles"
import { useContext } from "react"
import { ChipContext } from "../../../PlayArea"

interface Props {
    color: string
}

export default function DiamondButton({ color }: Props) {
    const { chipUrl } = useContext(ChipContext)
    
    return (
        <PlayButton>
            <div className={hoverElementDiamondStyle}>
                <div className={foregroundDiamondStyle}></div>
                <img className={chipDiamondStyle} src={chipUrl} />
            </div>
            <Diamond className={diamondStyle}
            style={{
                backgroundColor: color
            }}></Diamond>
        </PlayButton>
    )
}

const diamondStyle = css`
    width: 5.1em;
    height: 3.4em;
    margin-top: -.5em;
`

const hoverElementDiamondStyle = css`
    position: absolute;
    margin-left: 5.5em;
    margin-top: 1em;
`

const foregroundDiamondStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 7.9em;
    height: 3.4em;
    margin-left: -6.7em;
    margin-top: -1.5em;
    z-index: 3;
`

const chipDiamondStyle = css`
    position: absolute;
    width: 2.1em;
    margin-left: .4em;
    margin-top: .5em;
    z-index: 4;
    box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
    border-radius: 50%;
`