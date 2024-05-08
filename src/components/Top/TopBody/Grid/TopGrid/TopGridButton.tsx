import { useContext, useState } from "react";
import { Diamond, PlayButton } from "../../../../../styles/styles";
import { css } from "@emotion/css";
import { ChipContext } from "../../../../PlayArea";
import { addBet, getBetByBetOn, getChipUrlByBet, getTotalBet } from "../../../../../utils/utils";
import ShownChip from "../ShownChip/ShownChip";

interface Props {
    name: string,
    diamondColor: string
}

export default function TopGridButton({ name, diamondColor }: Props) {
    const { chipValue, 
        setAction, 
        playDataStore, 
        updateBetData 
    } = useContext(ChipContext);
    const { chipUrl } = playDataStore;
    // This is used to show the shown chip when user clicks the button.
    const [selectedChip, setSelectedChip] = useState<boolean>(false);
    // This is used to show the total bet for the specified button when user hover over the button.
    const [showTotal, setShowTotal] = useState<boolean>(false)

    // The betOnValue is a combination of name and button color.
    const betOnValue = name.concat(` ${diamondColor}`)
    
    const totalBetValue = playDataStore.buttonBetValue;
    const betChipUrl = getChipUrlByBet(betOnValue);

    const diamondStyle = css`
        width: 5.1em;
        height: 3.4em;
        margin-top: -.5em;
        background-color: ${diamondColor};
    `

    function showSelectedChip() {
        addBet(betOnValue, chipValue);
        setSelectedChip(true);
        setAction(true);
        updateBetData(
            getTotalBet(),
            getBetByBetOn(betOnValue)
        )
    }

    return (
        <PlayButton className={ButtonTextStyle} 
        onClick={() => showSelectedChip()} 
        onMouseEnter={() => setShowTotal(true)} 
        onMouseLeave={() => setShowTotal(false)}>
            <div className={hoverElementStyle}>
                <div className={foregroundStyle}></div>
                <img className={chipStyle} src={chipUrl} />
            </div>
            <Diamond className={diamondStyle}>
                <span>{name}</span>
            </Diamond>
            {/* The chip is shown when the selectedChip is false 
            and the betChipUrl is not an empty string. */}
            {selectedChip && betChipUrl !== "" &&
                <div className={selectedChipStyle}>
                    <ShownChip url={betChipUrl} 
                    betTotal={totalBetValue}
                    showTotal={showTotal} />
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