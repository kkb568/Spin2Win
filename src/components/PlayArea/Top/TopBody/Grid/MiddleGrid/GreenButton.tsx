import { css } from "@emotion/css";
import { Diamond, PlayButton } from "../../../../../../styles/styles";
import { useContext, useState } from "react";
import { ChipContext } from "../../../../PlayArea";
import ShownChip from "../ShownChip/ShownChip";
import { buttonStateType } from "../../../../../../data/dataTypes";
import { addBet, getBetByBetOn, getChipUrlByBet, getTotalBet } from "../../../../../../utils/betUtils";
import { addAction, getGridButtonAction } from "../../../../../../utils/actionUtils";
import { green } from "../../../../../../data/data";

export default function GreenButton() {
    const { 
        playDataStore,
        chipValue,
        updatePlayAreaState
    } = useContext(ChipContext);
    const { chipUrl, disableButtonEvents } = playDataStore;
    
    /**
     * 1. selectedChip: For showing the shown chip when user clicks the button.
     * 2. showTotal: For showing the total bet for the specified button 
            when user hover over the button and the shown chip is present.
     */
    const [buttonState, setButtonState] = useState<buttonStateType>({
        selectedChip: false,
        showTotal: false
    })

    const betChipUrl = getChipUrlByBet(green)
    const totalBetValue = getBetByBetOn(green)

    function updateButtonState(key: string, value: boolean) {
        setButtonState(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    /* The function adds the add action, adds the bet to the betsData storage,
    updates the selectedChip and ifNumClicked to true, enable the action buttons and updates the total bet. */
    function showSelectedChip() {
        addAction(
            getGridButtonAction(green),
            chipValue,
            green
        );
        addBet(green, chipValue);
        updateButtonState("selectedChip", true);
        updatePlayAreaState("ifNumClicked", true);
        updatePlayAreaState("enableButton", true);
        updatePlayAreaState("totalBet" ,getTotalBet());
    }

    return (
        <PlayButton className={greenButtonStyle}
        onClick={() => showSelectedChip()}
        onMouseEnter={() => updateButtonState("showTotal", true)} 
        onMouseLeave={() => updateButtonState("showTotal", false)}
        style={{
            cursor: disableButtonEvents ? "context-menu" : "pointer",
            pointerEvents: disableButtonEvents ? "none" : "all"
        }}>
            {/* The below div is shown when the user hovers over the button
            (Check the PlayButton component from styles.tsx). */}
            <div className={hoverElementStyle}>
                <div className={foregroundStyle}></div>
                <img className={chipStyle} src={chipUrl} />
            </div>

            <Diamond className={diamondStyle} />

            {/* The chip is shown when the selectedChip is false. */}
            {buttonState.selectedChip &&
                <div className={selectedChipStyle}>
                    <ShownChip url={betChipUrl} 
                    betTotal={totalBetValue}
                    showTotal={buttonState.showTotal} />
                </div>
            }
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
    background-color: ${green};
`

const selectedChipStyle = css`
    position: absolute;
    z-index: 5;

    span {
        position: absolute;
        color: #1467ff;
        margin-top: .9em;
        margin-left: -.1em;
        font-size: 2.8em;
    }

    p {
        position: absolute;
        margin-left: .2em;
        margin-top: 3em;
        font-size: 1em;
    }

    img {
        width: 2.4em;
        height: 2.4em;
        box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
        border-radius: 50%;
        margin-top: 5em;
    }
`