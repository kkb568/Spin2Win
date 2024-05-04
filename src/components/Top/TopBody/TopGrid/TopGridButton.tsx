import { useContext } from "react";
import { Diamond, PlayButton } from "../../../../styles/styles";
import { css } from "@emotion/css";
import { ChipContext } from "../../../PlayArea";

interface Props {
    name: string,
    diamondColor: string
}

export default function TopGridButton({ name, diamondColor }: Props) {
    const { chipUrl } = useContext(ChipContext);

    const diamondStyle = css`
        width: 5.1em;
        height: 3.4em;
        margin-top: -.5em;
        background-color: ${diamondColor};
    `

    return (
        <PlayButton className={ButtonTextStyle}>
            <div className={hoverElementStyle}>
                <div className={foregroundStyle}></div>
                <img className={chipStyle} src={chipUrl} />
            </div>
            <Diamond className={diamondStyle}>
                <span>{name}</span>
            </Diamond>
        </PlayButton>
    )
}


const ButtonTextStyle = css`
    width: 5.5em;
    height: 3.5em;
`

const hoverElementStyle = css`
    position: absolute;
    margin-left: 4.5em;
    margin-top: 1em;
`

const foregroundStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 5.5em;
    height: 3.4em;
    margin-left: -5em;
    margin-top: -1.5em;
    z-index: 3;
`

const chipStyle = css`
    position: absolute;
    width: 1.8em;
    margin-top: 1em;
    z-index: 4;
    box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
    border-radius: 50%;
`