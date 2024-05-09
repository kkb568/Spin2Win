import { PlayButton } from "../../../../../styles/styles"
import { useContext, useState } from "react";
import { ButtonFontStyle } from "../../../../../styles/styles";
import { css } from "@emotion/css";
import { ChipContext } from "../../../../PlayArea";
import ShownChip from "../ShownChip/ShownChip";
import { buttonStateType } from "../../../../../data/data";
import { addBet, getBetByBetOn, getChipUrlByBet, getTotalBet } from "../../../../../utils/betUtils";
import { addAction, getGridButtonAction } from "../../../../../utils/actionUtils";

interface Props {
    description: string
}

export default function DescButton({ description }: Props) {
    const { 
        playDataStore, 
        chipValue, 
        setAction,
        updateTotalBet
    } = useContext(ChipContext)
    const { chipUrl } = playDataStore;
    /* The selectedChip is for showing the shown chip when user clicks the button 
    whereas the showTotal is for showing the total bet for the specified button 
    when user hover over the button and the shown chip is present.*/
    const [buttonState, setButtonState] = useState<buttonStateType>({
        selectedChip: true,
        showTotal: true
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

    function showSelectedChip() {
        addAction(
            getGridButtonAction(description),
            chipValue,
            description
        );
        addBet(description, chipValue);
        updateButtonState("selectedChip", true);
        setAction(true);
        updateTotalBet(getTotalBet());
    }

    return (
        <PlayButton style={ButtonFontStyle} 
        onClick={() => showSelectedChip()}
        onMouseEnter={() => updateButtonState("showTotal", true)} 
        onMouseLeave={() => updateButtonState("showTotal", true)}>
                {description}
            <div className={hoverElementStyle}>
                <div className={foregroundStyle}></div>
                <img className={chipStyle} src={chipUrl} />
            </div>
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


const hoverElementStyle = css`
    position: absolute;
    margin-left: 7.6em;
    margin-top: 1em;
`

const foregroundStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 5.9em;
    height: 2.5em;
    margin-left: -6.7em;
    margin-top: -1.5em;
`

const chipStyle = css`
    position: absolute;
    width: 1.5em;
    margin-left: -1.5em;
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