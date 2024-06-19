import { css } from "@emotion/css"
import { chipDataType } from "../../../../../data/dataTypes"
import ChipItem from "./ChipItem"
import { useContext, useEffect } from "react"
import { ChipContext } from "../../../PlayArea"
import { getSelectedChipUrl } from "../../../../../utils/chipUtils"

// The component renders the respective chip and details from chipsData storage.
export default function Chips() {
    const { updatePlayAreaState, playDataStore } = useContext(ChipContext)
    const { chipsData } = playDataStore;

    /* The function changes the selected value of the chip object 
    whose keyValue is equal to the key parameter 
    (called when user selects a specific chip). 
    Afterwards, the chipsArray and the chipsData are updated
    and the chipUrl PlayArea state is updated. */
    function showSelected(key: number) {
        const newChipsArray: chipDataType[] = chipsData.map(chip =>
            chip.id === key ? 
            {...chip, isSelected: true} : 
            {...chip, isSelected: false}
        )
        updatePlayAreaState("chipsData", newChipsArray)
    }

    // Change the chipUrl value if the chipsData changes after the showSelected function is called.
    useEffect(() => {
        chipsData.forEach((chip) => {
            if (chip.isSelected) {
                updatePlayAreaState("chipUrl", getSelectedChipUrl(chipsData))
            }
        });
    }, [chipsData])
    

    const chipItems: JSX.Element[] = chipsData.map((chip) => {
        return (
            <ChipItem key={chip.id} 
                url={chip.chipUrl}
                name={chip.chipName} 
                details={chip.chipDetails}
                keyValue={chip.id}
                selected={chip.isSelected}
                changeSelected={showSelected} />
        )
    })

    return (
        <div className={ChipItemsStyle}>
            {chipItems}
        </div>
    )
}


const ChipItemsStyle = css`
    display: grid;
    grid-template-columns: repeat(6, 60px);
    position: relative;
    top: .5em;

    @media (max-width: 900px) {
        grid-template-columns: repeat(3, 60px);
    }

    @media (max-width: 600px) {
        margin-left: 2em;
        margin-bottom: 1em;
    }
`