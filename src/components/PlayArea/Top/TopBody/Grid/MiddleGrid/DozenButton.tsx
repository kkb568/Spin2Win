import { css } from "@emotion/css";
import { PlayButton } from "../../../../../../styles/styles";
import { useContext, useEffect, useState } from "react";
import { ChipContext } from "../../../../PlayArea";
import ShownChip from "../ShownChip/ShownChip";
import { buttonStateType, updateButtonStateType } from "../../../../../../data/dataTypes";
import { addBet, checkValueFromLastBet, getBetByBetOn, getChipUrlByBet, getCorrectLastBetsDetails, getTotalBet } from "../../../../../../utils/betUtils";
import { addAction, getGridButtonAction } from "../../../../../../utils/actionUtils";

interface Props {
    name: string,
    chosenDozenRange: string
}

export default function DozenButton({ name, chosenDozenRange }: Props) {
    const { playDataStore, chipValue, updatePlayAreaState } = useContext(ChipContext)
    const { chipUrl, reloadLastBets, disableButtonEvents, ifSpinned } = playDataStore;
    
    /**
     * 1. selectedChip: For showing the shown chip when user clicks the button.
     * 2. showTotal: For showing the total bet for the specified button 
            when user hover over the button and the shown chip is present.
     * 3. correctLastBets: For showing the chip on the button in which the last bet
            coincided correctly with the last previous chosen number from wheel spin.
     */
    const [buttonState, setButtonState] = useState<buttonStateType>({
        selectedChip: false,
        showTotal: false,
        correctLastBets: getCorrectLastBetsDetails(name)
    })

    const betChipUrl = getChipUrlByBet(name)
    const totalBetValue = getBetByBetOn(name)

     // Get the correct last bet's betOn and chipUrl values.
     const correctLastBetBetOn = buttonState.correctLastBets.betOn;
     const correctLastBetChip = buttonState.correctLastBets.chipUrl;
 
     /* If the ifSpinned is true (meaning the spin wheel functionality is completed),
     call the getChipUrlByCorrectLastBets function and update the correctLatBets state 
     to the function's return value. */
     useEffect(() => {
         if (ifSpinned) {
             updateButtonState("correctLastBets", getCorrectLastBetsDetails(name))
         }
     }, [ifSpinned])

    function updateButtonState(key: string, value: updateButtonStateType) {
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
            const [ found, lastBetValue ] = checkValueFromLastBet(name);
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
            getGridButtonAction(name, ifPrevBet),
            value,
            name
        );
        addBet(name, value, ifPrevBet);
        updateButtonState("selectedChip", true);
        updatePlayAreaState("ifNumClicked", true);
        updatePlayAreaState("enableButton", true);
        updatePlayAreaState("totalBet", getTotalBet());
    }

    return (
        <PlayButton className={dozenButtonStyle}
        onClick={() => showSelectedChip(chipValue)}
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
            
            {name}

            {/* The below elements are shown when the correct value 
            (from the chosen value from the wheel spin functionality)
            is equal to the name value. */}
            {chosenDozenRange === name &&
                <>
                    <div className={correctHoverStyle}></div>
                    {
                        name === correctLastBetBetOn &&
                        <img src={correctLastBetChip} className={correctChipStyle}/>
                    }
                </>
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

const dozenButtonStyle = css`
    font-size: 18px;

    @media (max-width: 900px) {
        width: 18em;
    }

    @media (max-width: 600px) {
        width: 9em;
    }
`

const hoverElementStyle = css`
    position: absolute;
    margin-left: 7.6em;
    margin-top: 1em;

    @media (max-width: 900px) {
        margin-left: 1.5em;
    }

    @media (max-width: 600px) {
        margin-left: 10.5em;
    }
`

const foregroundStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 11.8em;
    height: 2.5em;
    margin-left: -9.7em;
    margin-top: -1.5em;
    z-index: 3;

    @media (max-width: 900px) {
        width: 18em;
    }

    @media (max-width: 600px) {
        width: 9em;
    }
`

const chipStyle = css`
    position: absolute;
    width: 1.5em;
    margin-left: 1.3em;
    z-index: 4;
    box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
    border-radius: 50%;

    @media (max-width: 900px) {
        margin-left: 7.5em;
    }

    @media (max-width: 900px) {
        margin-left: -1.5em;
    }
`

const selectedChipStyle = css`
    position: absolute;
    z-index: 5;

    span {
        position: absolute;
        color: #1467ff;
        margin-top: -1em;
        margin-left: -.2em;
        font-size: 2.5em;
    }

    p {
        position: absolute;
        margin-left: .1em;
        margin-top: -2.5em;
        font-size: .8em;
    }

    img {
        width: 1.5em;
        height: 1.5em;
        box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
        border-radius: 50%;
    }
`

const correctHoverStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 11.8em;
    height: 2.5em;
    margin-top: -.5em;
    animation: blink 1s linear 5;

    @media (max-width: 900px) {
        width: 18em;
    }

    @media (max-width: 600px) {
        width: 9em;
    }

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
`

const correctChipStyle = css`
    position: absolute;
    width: 1.5em;
    height: 1.5em;
    z-index: 3;
`