import { css, cx } from "@emotion/css";
import { Diamond, PlayButton } from "../../../../../../styles/styles";
import { useContext, useEffect, useState } from "react";
import { ChipContext } from "../../../../PlayArea";
import ShownChip from "../ShownChip/ShownChip";
import { buttonStateType, updateButtonStateType } from "../../../../../../data/dataTypes";
import { addBet, checkValueFromLastBet, getBetByBetOn, getChipUrlByBet, getCorrectLastBetsDetails, getTotalBet } from "../../../../../../utils/betUtils";
import { addAction, getGridButtonAction } from "../../../../../../utils/actionUtils";
import { green } from "../../../../../../data/data";
import chessPiece from "../../../../../../assets/chessPiece.svg";

interface Props {
    chosenNum: number
}

export default function GreenButton({ chosenNum }: Props) {
    const { playDataStore, chipValue, updatePlayAreaState } = useContext(ChipContext);
    const { chipUrl, disableButtonEvents, reloadLastBets, ifNumClicked, ifSpinned } = playDataStore;
    
    /**
     * 1. selectedChip: For showing the shown chip when user clicks the button.
     * 2. showTotal: For showing the total bet for the specified button 
            when user hover over the button and the shown chip is present.
    *  3. correctHover: To show the div with the correctHoverStyle classname.
            It's specific to NumButton since the showChessPiece also depends
            on its value.
     * 4. showChessPiece: To show the chess piece image on the button whose
            num value is equal to the chosenNum from the wheel spin functionality.
     * 5. correctLastBets: For showing the chip on the button in which the last bet
            coincided correctly with the last previous chosen number from wheel spin.
     */
    const [buttonState, setButtonState] = useState<buttonStateType>({
        selectedChip: false,
        showTotal: false,
        correctLastBets: getCorrectLastBetsDetails(green),
        correctHover: false,
        showChessPiece: false
    })

    const betChipUrl = getChipUrlByBet(green)
    const totalBetValue = getBetByBetOn(green)

    // Get the correct last bet's betOn and chipUrl values.
    const correctLastBetBetOn = buttonState.correctLastBets.betOn;
    const correctLastBetChip = buttonState.correctLastBets.chipUrl;

    /* If the ifSpinned is true (meaning the spin wheel functionality is completed),
    call the getChipUrlByCorrectLastBets function and update the correctLatBets state 
    to the function's return value. */
    useEffect(() => {
        if (ifSpinned) {
            updateButtonState("correctLastBets", getCorrectLastBetsDetails(green))
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

    /* The function adds the add action, adds the bet to the betsData storage,
    updates the selectedChip and ifNumClicked to true, enable the action buttons and updates the total bet. */
    function showSelectedChip(value: number, ifPrevBet?: boolean) {
        addAction(
            getGridButtonAction(green, ifPrevBet),
            value,
            green
        );
        addBet(green, value, ifPrevBet);
        updateButtonState("selectedChip", true);
        updatePlayAreaState("ifNumClicked", true);
        updatePlayAreaState("enableButton", true);
        updatePlayAreaState("totalBet", getTotalBet());
    }

    /* In case the chosenNum changes, set the disableButtonEvents to true 
    and if the correct value (from the chosen value from the wheel spin functionality)
    is equal to zero, update the correctHover to true and then after 5 seconds, 
    update the correctHover to false, the showChessPiece to true
    and the disableButtonEvents to false. */
    useEffect(() => {
        updatePlayAreaState("disableButtonEvents", true);

        if (chosenNum === 0) {
            updateButtonState("correctHover", true);

            setTimeout(() => {
                updateButtonState("correctHover", false);
                updateButtonState("showChessPiece", true);
            }, 5000);
        }

        setTimeout(() => {
            updatePlayAreaState("disableButtonEvents", false);
        }, 5000)
        
    }, [chosenNum]);

    /*If the reloadLastBets is true, set the showChessPiece to false, 
    get the found and the lastBetValue using the betOn value and if found is true 
    (meaning that the betOn value is in the lastBetData storage), call the showSelectedChip function 
    and then update the reloadLastBets to false. */
    useEffect(() => {
        if (reloadLastBets) {
            updateButtonState("showChessPiece", false);
            
            const [ found, lastBetValue ] = checkValueFromLastBet(green);
            if (found) {
                showSelectedChip(lastBetValue, true);
                updatePlayAreaState("reloadLastBets", false);
            }
        }
    }, [reloadLastBets])

    // If ifNumClicked is true, set the showChessPiece to false.
    useEffect(() => {
        if (ifNumClicked) {
            updateButtonState("showChessPiece", false);
        }
    }, [ifNumClicked])

    /*The chess piece becomes invisible if the showTotal is true.
    The showTotal changes when the user hover over the button. */
    const chessPieceHoverStyle = css`
        opacity: ${buttonState.showTotal ? 0 : 1};
    `

    return (
        <PlayButton className={greenButtonStyle}
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

            <Diamond className={diamondStyle} />

            {/* The below elements are shown when the correctHover is true. */}
            {buttonState.correctHover &&
                <>
                <div className={correctHoverStyle}></div>
                {
                    green === correctLastBetBetOn &&
                    <img src={correctLastBetChip} className={correctChipStyle}/>
                }
            </>
            }

            {/* The chess piece image is shown when the showChessPiece is true. */}
            {
                buttonState.showChessPiece &&
                <img src={chessPiece} className={cx(chessPieceStyle, chessPieceHoverStyle)} />
            }

            {/* The chip is shown when the selectedChip is true. */}
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
    margin-top: -16.95em;
    margin-left: -3.9em;
    height: 13.55em;
    width: 4em;

    @media (max-width: 900px) {
        margin-top: -37.35em;
    }

    @media (max-width: 600px) {
        margin-top: -64.35em;
        margin-left: -8.7em;
    }
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

const correctHoverStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 4em;
    height: 13.5em;
    margin-top: -.5em;
    animation: blink 1s linear 5;

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
`

const chessPieceStyle = css`
    position: absolute;
    z-index: 6;
    width: 3em;
    height: 3em;
    margin-top: 5em;
    transition: all .25s ease-in-out;
    animation: movePiece 1s ease-in-out;

    @keyframes movePiece {
        0% {
            opacity: 0;
            margin-top: 3.5em;
        }

        100% {
            opacity: 1;
            margin-top: 5em;
        }
    }
`

const correctChipStyle = css`
    position: absolute;
    width: 2.4em;
    height: 2.4em;
    z-index: 3;
    box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
    border-radius: 50%;
`