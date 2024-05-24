import { useContext, useEffect, useState } from "react";
import { Diamond, PlayButton } from "../../../../../../styles/styles";
import { css } from "@emotion/css";
import { ChipContext } from "../../../../PlayArea";
import ShownChip from "../ShownChip/ShownChip";
import { buttonStateType } from "../../../../../../data/dataTypes";
import { addBet, checkValueFromLastBet, getBetByBetOn, getChipUrlByBet, getTotalBet } from "../../../../../../utils/betUtils";
import { addAction, getGridButtonAction } from "../../../../../../utils/actionUtils";

interface Props {
    name: string,
    diamondColor: string,
    chosenNumDetails: string
}

export default function TopGridButton({ name, diamondColor, chosenNumDetails }: Props) {
    const { chipValue, playDataStore, updatePlayAreaState } = useContext(ChipContext);
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

    // The betOnValue is a combination of name and button color.
    const betOnValue = name.concat(` ${diamondColor}`)
    
    const totalBetValue = getBetByBetOn(betOnValue);
    const betChipUrl = getChipUrlByBet(betOnValue);

    const diamondStyle = css`
        width: 5.1em;
        height: 3.4em;
        margin-top: -.5em;
        background-color: ${diamondColor};
    `

    function updateButtonState(key: string, value: boolean | number) {
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
            const [ found, lastBetValue ] = checkValueFromLastBet(betOnValue);
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
            getGridButtonAction(betOnValue, ifPrevBet),
            value,
            betOnValue
        );
        addBet(betOnValue, value, ifPrevBet);
        updateButtonState("selectedChip", true);
        updatePlayAreaState("ifNumClicked", true);
        updatePlayAreaState("enableButton", true);
        updatePlayAreaState("totalBet", getTotalBet());
    }
    

    return (
        <PlayButton className={ButtonTextStyle} 
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

            <Diamond className={diamondStyle}>
                <span>{name}</span>
            </Diamond>

            {/* The below div is shown when the chosenNumDetails value 
            (from the chosen value from the wheel spin functionality)
            is equal to the betOn value. */}
            {betOnValue === chosenNumDetails &&
                <div className={correctHoverStyle}></div>
            }
            
            {/* The chip is shown when the selectedChip is false 
            and the betChipUrl is not an empty string. */}
            {buttonState.selectedChip && betChipUrl !== "" &&
                <div className={selectedChipStyle}>
                    <ShownChip url={betChipUrl} 
                    betTotal={totalBetValue}
                    showTotal={buttonState.showTotal} />
                </div>
            }
        </PlayButton>
    )
}


const ButtonTextStyle = css`
    width: 5.5em;
    height: 3.5em;
`

const hoverElementStyle = css`
    position: absolute;
    margin-left: 4.5em;
    margin-top: 1em;
`

const foregroundStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 5.5em;
    height: 3.4em;
    margin-left: -5em;
    margin-top: -1.5em;
    z-index: 3;
`

const chipStyle = css`
    position: absolute;
    width: 1.8em;
    margin-top: 1em;
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
        font-size: 3em;
    }

    p {
        position: absolute;
        margin-left: .3em;
        margin-top: -2.4em;
    }

    img {
        width: 2.2em;
        height: 2.2em;
        box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
        border-radius: 50%;
    }
`

const correctHoverStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 5.5em;
    height: 3.4em;
    margin-top: -.5em;
    animation: blink 1s linear 5;

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
`