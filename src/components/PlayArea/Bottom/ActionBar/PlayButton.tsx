import { css, cx } from "@emotion/css";
import { useContext } from "react";
import { ChipContext } from "../../PlayArea";
import { MainContext } from "../../../../App";

export default function PlayButton() {
    const { playDataStore } = useContext(ChipContext)
    const { setDisplay } = useContext(MainContext)
    const { enableButton } = playDataStore

    // The style is for ensuring the button is not clicked if there's no chip in the playing area.
    const visibleButtonStyle: string = enableButton ? css`
        opacity: 1;
        cursor: pointer;
        pointer-events: all;
    ` : css`
        opacity: .5;
        cursor: context-menu;
        pointer-events: none;
    `

    // Once called, change the displayWheel value to block after 1 second.
    function startPlay() {
        setTimeout(() => {
            setDisplay("displayWheel", "block");
        }, 1000);
    }

    return (
        <button className={cx(playButtonStyle, visibleButtonStyle)}
        onClick={() => startPlay()}>
            <i className="fa-solid fa-play"></i>
        </button>
    )
}

const playButtonStyle = css`
    width: 8em;
    margin-right: .5em;
    background: linear-gradient(0deg,rgba(255,255,255,.2) 0,rgba(255,255,255,0) 48.19%,rgba(255,255,255,0) 53.48%,rgba(255,255,255,.2) 100%),#ecc440;
    border: 4px solid #dda020;
    color: white;
    border-radius: 3px;
    box-shadow: 0 6px 6px 0 rgba(0,0,0,.5);
    font-size: 1.6em;
`