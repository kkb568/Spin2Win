import { css, cx } from "@emotion/css";
import { PlayButton } from "../../../../../../styles/styles";
import { assignBackgroundColor } from "../../../../../../utils/chipUtils";
import { useContext, useEffect, useState } from "react";
import { ChipContext } from "../../../../PlayArea";
import ShownChip from "../ShownChip/ShownChip";
import { buttonStateType } from "../../../../../../data/dataTypes";
import { addBet, checkValueFromLastBet, getBetByBetOn, getChipUrlByBet, getTotalBet } from "../../../../../../utils/betUtils";
import { addAction, getGridButtonAction } from "../../../../../../utils/actionUtils";
import chessPiece from "../../../../../../assets/cbimage.svg";

interface Props {
    num: number,
    chosenNum: number
}

export default function NumButton({ num, chosenNum }: Props) {
    const { playDataStore, chipValue, updatePlayAreaState } = useContext(ChipContext);
    const { chipUrl, reloadLastBets, ifNumClicked, disableButtonEvents } = playDataStore;

    /**
     * 1. selectedChip: For showing the shown chip when user clicks the button.
     * 2. showTotal: For showing the total bet for the specified button 
            when user hover over the button and the shown chip is present.
     * 3. correctHover: To show the div with the correctHoverStyle classname.
            It's specific to NumButton since the showChessPiece also depends
            on its value.
     * 4. showChessPiece: To show the chess piece image on the button whose
            num value is equal to the chosenNum from the wheel spin functionality.
     */
    const [buttonState, setButtonState] = useState<buttonStateType>({
        selectedChip: false,
        showTotal: false,
        correctHover: false,
        showChessPiece: false
    });

    const buttonColor = assignBackgroundColor(num);
    const betChipUrl = getChipUrlByBet(num)
    const totalBetValue = getBetByBetOn(num)

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
    function showSelectedChip(value: number, ifPrevBet?: boolean) {
        addAction(
            getGridButtonAction(num, ifPrevBet),
            value,
            num
        );
        addBet(num, value, ifPrevBet);
        updateButtonState("selectedChip", true);
        updatePlayAreaState("ifNumClicked", true);
        updatePlayAreaState("enableButton", true);
        updatePlayAreaState("totalBet", getTotalBet());
    }

    /* In case the chosenNum changes, set the disableButtonEvents to true 
    and if the correct value (from the chosen value from the wheel spin functionality)
    is equal to the num value, update the correctHover to true
    and then after 5 seconds, update the correctHover to false, the showChessPiece to true
    and the disableButtonEvents to false. */
    useEffect(() => {
        updatePlayAreaState("disableButtonEvents", true);

        if (chosenNum === num) {
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
            
            const [ found, lastBetValue ] = checkValueFromLastBet(num);
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

    const numButtonStyle = css`
        position: relative;
        font-size: 24px;
        cursor: ${disableButtonEvents ? "context-menu" : "pointer"};
        pointer-events: ${disableButtonEvents ? "none" : "all"};
    `

    return (
        <PlayButton className={numButtonStyle}
            onClick={() => showSelectedChip(chipValue)}
            onMouseEnter={() => updateButtonState("showTotal", true)} 
            onMouseLeave={() => updateButtonState("showTotal", false)}
            style={{
                backgroundColor: buttonColor
            }}>
                    {/* The below div is shown when the user hovers over the button
                    (Check the PlayButton component from styles.tsx). */}
                    <div className={hoverElementStyle}>
                        <div className={foregroundStyle}></div>
                        <img className={chipStyle} src={chipUrl} />
                    </div>
                    
                    {num}

                    {/* The below div is shown when the correctHover is true. */}
                    {buttonState.correctHover &&
                        <div className={correctHoverStyle}></div>
                    }

                    {/* The chess piece image is shown when the showChessPiece is true. */}
                    {
                        buttonState.showChessPiece &&
                        <img src={chessPiece} className={cx(chessPieceStyle, chessPieceHoverStyle)} />
                    }

                    {/* The chip is shown when the selectedChip is false. */}
                    {buttonState.selectedChip &&
                        <div className={selectedChipStyle}>
                            <ShownChip url={betChipUrl} 
                            betTotal={totalBetValue}
                            showTotal={buttonState.showTotal}/>
                        </div>
                    }
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
    width: 2.2em;
    height: 2.5em;
    margin-left: -4.9em;
    margin-top: -1.5em;
`

const chipStyle = css`
    position: absolute;
    width: 1.1em;
    margin-left: -3.2em;
    margin-top: .2em;
    z-index: 4;
    box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
    border-radius: 50%;
`

const selectedChipStyle = css`
    position: absolute;
    z-index: 5;

    span {
        position: absolute;
        color: #1467ff;
        margin-top: -1em;
        margin-left: -.1em;
        font-size: 1.8em;
    }

    p {
        position: absolute;
        margin-left: .5em;
        margin-top: -2.4em;
        font-size: .6em;
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
    width: 2.2em;
    height: 2.5em;
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
    width: 2em;
    height: 2em;
    margin-top: -.5em;
    transition: all .25s ease-in-out;
    animation: movePiece 1s ease-in-out;

    @keyframes movePiece {
        0% {
            opacity: 0;
            margin-top: -2.5em;
        }

        100% {
            opacity: 1;
            margin-top: -.5em;
        }
    }
`