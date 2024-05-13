import { css } from "@emotion/css"
import { Diamond, PlayButton } from "../../../../../../styles/styles"
import { useContext, useState } from "react"
import { ChipContext } from "../../../../PlayArea"
import ShownChip from "../ShownChip/ShownChip"
import { buttonStateType } from "../../../../../../data/dataTypes"
import { addBet, getBetByBetOn, getChipUrlByBet, getTotalBet } from "../../../../../../utils/betUtils"
import { addAction, getGridButtonAction } from "../../../../../../utils/actionUtils"

interface Props {
    color: string
}

export default function DiamondButton({ color }: Props) {
    const { 
        playDataStore, 
        chipValue, 
        setAction,
        updateTotalBet
     } = useContext(ChipContext)
     const { chipUrl } = playDataStore
    /* The selectedChip is for showing the shown chip when user clicks the button 
    whereas the showTotal is for showing the total bet for the specified button 
    when user hover over the button and the shown chip is present.*/
    const [buttonState, setButtonState] = useState<buttonStateType>({
        selectedChip: false,
        showTotal: false
    })

    const betChipUrl = getChipUrlByBet(color)
    const totalBetValue = getBetByBetOn(color)

    function updateButtonState(key: string, value: boolean) {
        setButtonState(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    function showSelectedChip() {
        addAction(
            getGridButtonAction(color),
            chipValue,
            color
        );
        addBet(color, chipValue);
        updateButtonState("selectedChip", true);
        setAction(true);
        updateTotalBet(getTotalBet());
    }

    const diamondStyle = css`
        width: 5.1em;
        height: 3.4em;
        margin-top: -.5em;
        background-color: ${color};
    `

    return (
        <PlayButton onClick={() => showSelectedChip()}
        onMouseEnter={() => updateButtonState("showTotal", true)} 
        onMouseLeave={() => updateButtonState("showTotal", false)}>
            <div className={hoverElementDiamondStyle}>
                <div className={foregroundDiamondStyle}></div>
                <img className={chipDiamondStyle} src={chipUrl} />
            </div>
            <Diamond className={diamondStyle} />
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