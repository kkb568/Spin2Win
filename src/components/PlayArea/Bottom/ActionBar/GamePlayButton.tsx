import { css, cx } from "@emotion/css";
import { useContext } from "react";
import { ChipContext } from "../../PlayArea";
import { MainContext } from "../../../../App";
import { addLastBetData, clearLastBets } from "../../../../utils/betUtils";
import { clearUserActions } from "../../../../utils/actionUtils";

// The component renders the button the user clicks to start the wheel spin.
export default function GamePlayButton() {
    const { playDataStore, updatePlayAreaState } = useContext(ChipContext);
    const { enableButton } = playDataStore;
    
    const { setMainState, mainData } = useContext(MainContext);
    const { betsData } = mainData

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

    /* Once called, disable the footer buttons, clear the user actions and the last bets data, 
    call the addLastBetData function, set the ifNumClicked to false 
    and change the displayWheel value to block after 1 second. */
    function startPlay() {
        setTimeout(() => {
            updatePlayAreaState("disableFooterButtons", true);
            clearUserActions();
            clearLastBets();
            addLastBetData(betsData);
            updatePlayAreaState("ifNumClicked", false);
            setMainState("displayWheel", "visible");
        }, 1000);
        /* Wait for 21 seconds (for the wheel to implement fully) 
        then set the disableFooterButtons and the enableButton to false, 
        update the total bet to zero and update the ifSpinned value from ChipContext to true. */
        setTimeout(() => {
            updatePlayAreaState("disableFooterButtons", false);
            updatePlayAreaState("enableButton", false);
            updatePlayAreaState("totalBet", 0);
            updatePlayAreaState("ifSpinned", true);
        }, 21000)
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

    @media (max-width: 900px) {
        height: 3em;
    }

    @media (max-width: 600px) {
        margin-left: 1em;
    }
`