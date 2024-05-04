import { PlayButton } from "../../../../styles/styles"
import { useContext } from "react";
import { ButtonFontStyle } from "../../../../styles/styles";
import { css } from "@emotion/css";
import { ChipContext } from "../../../PlayArea";

interface Props {
    description: string
}

export default function DescButton({ description }: Props) {
    const { chipUrl } = useContext(ChipContext)
    
    return (
        <PlayButton style={ButtonFontStyle}>
                {description}
            <div className={hoverElementStyle}>
                <div className={foregroundStyle}></div>
                <img className={chipStyle} src={chipUrl} />
            </div>
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
    width: 5.9em;
    height: 2.5em;
    margin-left: -6.7em;
    margin-top: -1.5em;
`

const chipStyle = css`
    position: absolute;
    width: 1.5em;
    margin-left: -1.5em;
    z-index: 4;
    box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
    border-radius: 50%;
`