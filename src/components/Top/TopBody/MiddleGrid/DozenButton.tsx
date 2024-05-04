import { css } from "@emotion/css";
import { ButtonFontStyle, PlayButton } from "../../../../styles/styles";
import { useContext } from "react";
import { ChipContext } from "../../../PlayArea";

interface Props {
    name: string
}

export default function DozenButton({ name }: Props) {
    const { chipUrl } = useContext(ChipContext)

    return (
        <PlayButton style={ButtonFontStyle}>
            <div className={hoverElementStyle}>
                <div className={foregroundStyle}></div>
                <img className={chipStyle} src={chipUrl} />
            </div>
            {name}
        </PlayButton>
    )
}


const hoverElementStyle = css`
    position: absolute;
    margin-left: 7.6em;
    margin-top: 1em;
`

const foregroundStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 11.8em;
    height: 2.5em;
    margin-left: -9.7em;
    margin-top: -1.5em;
    z-index: 3;
`

const chipStyle = css`
    position: absolute;
    width: 1.5em;
    margin-left: 1.3em;
    z-index: 4;
    box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
    border-radius: 50%;
`