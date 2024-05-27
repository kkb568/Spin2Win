import { PlayButton } from "../../../../../../styles/styles"
import { useContext, useEffect, useState } from "react";
import { css } from "@emotion/css";
import { ChipContext } from "../../../../PlayArea";
import ShownChip from "../ShownChip/ShownChip";
import { buttonStateType } from "../../../../../../data/dataTypes";
import { addBet, checkValueFromLastBet, getBetByBetOn, getChipUrlByBet, getTotalBet } from "../../../../../../utils/betUtils";
import { addAction, getGridButtonAction } from "../../../../../../utils/actionUtils";

interface Props {
    description: string,
    correctValueDesc: string
}

export default function DescButton({ description, correctValueDesc }: Props) {
    const { playDataStore, chipValue,updatePlayAreaState } = useContext(ChipContext)
    const { chipUrl, reloadLastBets, disableButtonEvents } = playDataStore;
    
    /**
     * 1. selectedChip: For showing the shown chip when user clicks the button.
     * 2. showTotal: For showing the total bet for the specified button 
            when user hover over the button and the shown chip is present.
     */
    const [buttonState, setButtonState] = useState<buttonStateType>({
        selectedChip: false,
        showTotal: false
    })

    const betChipUrl = getChipUrlByBet(description)
    const totalBetValue = getBetByBetOn(description)

    function updateButtonState(key: string, value: boolean) {
        setButtonState(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    /*If the reloadLastBets is true, get the found and the lastBetValue using the betOn value
    and if found is true (meaning that the betOn value is in the lastBetData storage), 
    call the showSelectedChip function and update the reloadLastBets to false. */
    useEffect(() => {
        if (reloadLastBets) {
            const [ found, lastBetValue ] = checkValueFromLastBet(description);
            if (found) {
                showSelectedChip(lastBetValue, true);
                updatePlayAreaState("reloadLastBets", false);
            }
        }
    }, [reloadLastBets])

    /* The function adds the add action, adds the bet to the betsData storage,
    updates the selectedChip and ifNumClicked to true, enable the action buttons and updates the total bet. */
    function showSelectedChip(value: number, ifPrevBet?: boolean) {
        addAction(
            getGridButtonAction(description, ifPrevBet),
            value,
            description
        );
        addBet(description, value, ifPrevBet);
        updateButtonState("selectedChip", true);
        updatePlayAreaState("ifNumClicked", true);
        updatePlayAreaState("enableButton", true);
        updatePlayAreaState("totalBet", getTotalBet());
    }

    return (
        <PlayButton className={descButtonStyle}
        onClick={() => showSelectedChip(chipValue)}
        onMouseEnter={() => updateButtonState("showTotal", true)} 
        onMouseLeave={() => updateButtonState("showTotal", false)}
        style={{
            cursor: disableButtonEvents ? "context-menu" : "pointer",
            pointerEvents: disableButtonEvents ? "none" : "all",
        }} >
            
            {description}

            {/* The below div is shown when the user hovers over the button
            (Check the PlayButton component from styles.tsx). */}
            <div className={hoverElementStyle}>
                <div className={foregroundStyle}></div>
                <img className={chipStyle} src={chipUrl} />
            </div>

            {/* The below div is shown when the correct value description (from the chosen value from the wheel spin functionality)
            is equal to the description value. */}
            {correctValueDesc === description &&
                <div className={correctHoverStyle}></div>
            }

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


const descButtonStyle = css`
    font-size: 18px;

    @media (max-width: 600px) {
        width: 9em;
    }
`

const hoverElementStyle = css`
    position: absolute;
    margin-left: 7.6em;
    margin-top: 1em;

    @media (max-width: 600px) {
        margin-left: 4.5em;
    }
`

const foregroundStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 5.9em;
    height: 2.5em;
    margin-left: -6.7em;
    margin-top: -1.5em;

    @media (max-width: 600px) {
        width: 9em;
    }
`

const chipStyle = css`
    position: absolute;
    width: 1.5em;
    margin-left: -1.5em;
    z-index: 4;
    box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
    border-radius: 50%;

    @media (max-width: 600px) {
        margin-left: 1.5em;
    }
`

const selectedChipStyle = css`
    position: absolute;
    z-index: 5;

    span {
        position: absolute;
        color: #1467ff;
        margin-top: -1em;
        margin-left: -.25em;
        font-size: 2.5em;
    }

    p {
        position: absolute;
        margin-top: -2.4em;
        font-size: .8em;
    }

    img {
        width: 1.6em;
        height: 1.6em;
        box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
        border-radius: 50%;
    }
`

const correctHoverStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 5.9em;
    height: 2.5em;
    margin-top: -.5em;
    animation: blink 1s linear 5;

    @media (max-width: 600px) {
        width: 9em;
    }

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
`