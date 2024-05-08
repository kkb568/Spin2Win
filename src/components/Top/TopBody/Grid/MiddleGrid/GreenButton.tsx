import { css } from "@emotion/css";
import { Diamond, PlayButton } from "../../../../../styles/styles";
import { useContext, useState } from "react";
import { ChipContext } from "../../../../PlayArea";
import ShownChip from "../ShownChip/ShownChip";
import { addBet, getBetByBetOn, getChipUrlByBet, getTotalBet } from "../../../../../utils/utils";

const green: string = "#4a8c02"

export default function GreenButton() {
    const { 
        playDataStore,
        chipValue, 
        setAction,
        updateBetData
    } = useContext(ChipContext);
    const { chipUrl } = playDataStore;
    // This is used to show chip when user selects a button.
    const [selectedChip, setSelectedChip] = useState<boolean>(false);
    // This is used to show the total bet forthe specified button when user hover over the button.
    const [showTotal, setShowTotal] = useState<boolean>(false)

    const betChipUrl = getChipUrlByBet(green)
    const totalBetValue = getBetByBetOn(green)

    function showSelectedChip() {
        addBet(green, chipValue);
        setSelectedChip(true);
        setAction(true);
        updateBetData(
            getTotalBet(),
            getBetByBetOn(green)
        )
    }

    return (
        <PlayButton className={greenButtonStyle}
        onClick={() => showSelectedChip()}
        onMouseEnter={() => setShowTotal(true)} 
        onMouseLeave={() => setShowTotal(false)}>
            <div className={hoverElementStyle}>
                <div className={foregroundStyle}></div>
                <img className={chipStyle} src={chipUrl} />
            </div>
            <Diamond className={diamondStyle} />
            {selectedChip &&
                <div className={selectedChipStyle}>
                    <ShownChip url={betChipUrl} 
                    betTotal={totalBetValue}
                    showTotal={showTotal} />
                </div>
            }
        </PlayButton>
    )
}


const greenButtonStyle = css`
    position: absolute;
    margin-top: -16.9em;
    margin-left: -3.9em;
    height: 13.55em;
    width: 4em;
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