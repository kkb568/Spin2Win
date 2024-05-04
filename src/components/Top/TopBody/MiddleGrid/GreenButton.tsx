import { css } from "@emotion/css";
import { Diamond, PlayButton } from "../../../../styles/styles";
import { useContext } from "react";
import { ChipContext } from "../../../PlayArea";

export default function GreenButton() {
    const { chipUrl } = useContext(ChipContext)

    return (
        <PlayButton className={greenButtonStyle}>
            <div className={hoverElementStyle}>
                <div className={foregroundStyle}></div>
                <img className={chipStyle} src={chipUrl} />
            </div>
            <Diamond className={diamondStyle} style={{
                backgroundColor: "#4a8c02"
            }}/>
        </PlayButton>
    )
}


const greenButtonStyle = css`
    position: absolute;
    margin-top: -16.9em;
    margin-left: -3.9em;
    height: 13.55em;
    width: 4em;
`

const hoverElementStyle = css`
    position: absolute;
    margin-left: 7.6em;
    margin-top: 1em;
`

const foregroundStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 4em;
    height: 13.5em;
    margin-left: -5.8em;
    margin-top: -1.5em;
    z-index: 3;
`

const chipStyle = css`
    position: absolute;
    width: 2.1em;
    margin-left: -2.8em;
    margin-top: 10.6em;
    z-index: 4;
    box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
    border-radius: 50%;
`

const diamondStyle = css`
    width: 3em;
    height: 8em;
    margin-top: 2em;
    margin-left: .1em;
`