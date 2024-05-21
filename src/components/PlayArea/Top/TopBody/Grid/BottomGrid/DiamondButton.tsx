import { css } from "@emotion/css"
import { Diamond, PlayButton } from "../../../../../../styles/styles"
import { useContext, useEffect, useState } from "react"
import { ChipContext } from "../../../../PlayArea"
import ShownChip from "../ShownChip/ShownChip"
import { buttonStateType } from "../../../../../../data/dataTypes"
import { addBet, checkValueFromLastBet, getBetByBetOn, getChipUrlByBet, getTotalBet } from "../../../../../../utils/betUtils"
import { addAction, getGridButtonAction } from "../../../../../../utils/actionUtils"

/*The diamondColor is the color of the diamond, the represent color is the color the diamond represents
(since the red diamond's color is different in hex value from the buttons' color which are red in color) 
and the chosenColor is the color for the chosen number from the wheel spin rotation. */
interface Props {
    diamondColor: string,
    representColor?: string
    chosenColor: string
}

export default function DiamondButton({ diamondColor, chosenColor, representColor }: Props) {
    const { 
        playDataStore, 
        chipValue, 
        setAction,
        updateTotalBet,
        updateReloadLastBets
     } = useContext(ChipContext)
     const { chipUrl, reloadLastBets } = playDataStore;
     
    /* The selectedChip is for showing the shown chip when user clicks the button 
    whereas the showTotal is for showing the total bet for the specified button 
    when user hover over the button and the shown chip is present.*/
    const [buttonState, setButtonState] = useState<buttonStateType>({
        selectedChip: false,
        showTotal: false
    })

    const betChipUrl = getChipUrlByBet(diamondColor)
    const totalBetValue = getBetByBetOn(diamondColor)

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
            const [ found, lastBetValue ] = checkValueFromLastBet(diamondColor);
            if (found) {
                showSelectedChip(lastBetValue);
                updateReloadLastBets(false);
            }
        }
    }, [reloadLastBets])

    /* The function adds the add action, adds the bet to the betsData storage,
    updates the selectedChip to true, enable the action buttons and updates the total bet. */
    function showSelectedChip(value: number) {
        addAction(
            getGridButtonAction(diamondColor),
            value,
            diamondColor
        );
        addBet(diamondColor, value);
        updateButtonState("selectedChip", true);
        setAction(true);
        updateTotalBet(getTotalBet());
    }

    const diamondStyle = css`
        width: 5.1em;
        height: 3.4em;
        margin-top: -.5em;
        background-color: ${diamondColor};
    `

    return (
        <PlayButton onClick={() => showSelectedChip(chipValue)}
        onMouseEnter={() => updateButtonState("showTotal", true)} 
        onMouseLeave={() => updateButtonState("showTotal", false)}>
            <div className={hoverElementDiamondStyle}>
                <div className={foregroundDiamondStyle}></div>
                <img className={chipDiamondStyle} src={chipUrl} />
            </div>
            <Diamond className={diamondStyle} />
            {/* The below div is shown when the chosen color value description 
            (from the chosen value from the wheel spin functionality)
            is equal to the represent color value. */}
            {chosenColor === representColor &&
                <div className={correctHoverStyle}></div>
            }
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

const hoverElementDiamondStyle = css`
    position: absolute;
    margin-left: 5.5em;
    margin-top: 1em;
`

const foregroundDiamondStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 7.9em;
    height: 3.4em;
    margin-left: -6.7em;
    margin-top: -1.5em;
    z-index: 3;
`

const chipDiamondStyle = css`
    position: absolute;
    width: 2.1em;
    margin-left: .4em;
    margin-top: .5em;
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
    width: 7.9em;
    height: 3.4em;
    margin-top: -.5em;
    animation: blink 1s linear 5;

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
`