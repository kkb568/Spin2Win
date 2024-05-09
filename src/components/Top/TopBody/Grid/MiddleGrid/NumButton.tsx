import { css } from "@emotion/css";
import { PlayButton } from "../../../../../styles/styles";
import { assignBackgroundColor } from "../../../../../utils/chipUtils";
import { useContext, useState } from "react";
import { ChipContext } from "../../../../PlayArea";
import ShownChip from "../ShownChip/ShownChip";
import { buttonStateType } from "../../../../../data/data";
import { addBet, getBetByBetOn, getChipUrlByBet, getTotalBet } from "../../../../../utils/betUtils";
import { addAction, getGridButtonAction } from "../../../../../utils/actionUtils";

interface Props {
    num: number
}

export default function NumButton({ num }: Props) {
    const { 
        playDataStore, 
        chipValue, 
        setAction,
        updateTotalBet
    } = useContext(ChipContext);
    const { chipUrl } = playDataStore;
    /* The selectedChip is for showing the shown chip when user clicks the button 
    whereas the showTotal is for showing the total bet for the specified button 
    when user hover over the button and the shown chip is present.*/
    const [buttonState, setButtonState] = useState<buttonStateType>({
        selectedChip: true,
        showTotal: true
    })

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

    function showSelectedChip() {
        addAction(
            getGridButtonAction(num),
            chipValue,
            num
        );
        addBet(num, chipValue);
        updateButtonState("selectedChip", true);
        setAction(true);
        updateTotalBet(getTotalBet());
    }

    return (
        <PlayButton
            onClick={() => showSelectedChip()}
            onMouseEnter={() => updateButtonState("showTotal", true)} 
            onMouseLeave={() => updateButtonState("showTotal", false)}
            style={{
                position: 'relative', 
                backgroundColor: buttonColor,
                fontSize: '24px'
                }}>
                    <div className={hoverElementStyle}>
                        <div className={foregroundStyle}></div>
                        <img className={chipStyle} src={chipUrl} />
                    </div>
                    {num}
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
        margin-left: .6em;
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