import { css } from "@emotion/css";
import { ButtonFontStyle, PlayButton } from "../../../../../styles/styles";
import { useContext, useState } from "react";
import { ChipContext } from "../../../../PlayArea";
import { addBet, getBetByBetOn, getChipUrlByBet, getTotalBet } from "../../../../../utils/utils";
import ShownChip from "../ShownChip/ShownChip";

interface Props {
    name: string
}

export default function DozenButton({ name }: Props) {
    const { 
        playDataStore,
        chipValue, 
        setAction,
        updateBetData 
    } = useContext(ChipContext)
    const { chipUrl } = playDataStore;
    // This is used to show chip when user selects a button.
    const [selectedChip, setSelectedChip] = useState<boolean>(false);
    // This is used to show the total bet forthe specified button when user hover over the button.
    const [showTotal, setShowTotal] = useState<boolean>(false)

    const betChipUrl = getChipUrlByBet(name)
    const totalBetValue = getBetByBetOn(name)

    function showSelectedChip() {
        addBet(name, chipValue);
        setSelectedChip(true);
        setAction(true);
        updateBetData(
            getTotalBet(),
            getBetByBetOn(name)
        )
    }

    return (
        <PlayButton style={ButtonFontStyle} 
        onClick={() => showSelectedChip()}
        onMouseEnter={() => setShowTotal(true)} 
        onMouseLeave={() => setShowTotal(false)}>
            <div className={hoverElementStyle}>
                <div className={foregroundStyle}></div>
                <img className={chipStyle} src={chipUrl} />
            </div>
            {name}
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


const hoverElementStyle = css`
    position: absolute;
    margin-left: 7.6em;
    margin-top: 1em;
`

const foregroundStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 11.8em;
    height: 2.5em;
    margin-left: -9.7em;
    margin-top: -1.5em;
    z-index: 3;
`

const chipStyle = css`
    position: absolute;
    width: 1.5em;
    margin-left: 1.3em;
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