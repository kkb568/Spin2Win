import { css } from "@emotion/css"
import { chipDataType } from "../../../../data/data"
import ChipItem from "./ChipItem"
import { useState } from "react"

export default function Chips() {
    const chipsArray = JSON.parse(sessionStorage.getItem("chipsData") || '{}')
    const [chipsData, setChipsData] = useState<chipDataType[]>(chipsArray)
    
    /* The function changes the selected value of the chip object 
    whose keyValue is equal to the key parameter 
    (called when user selects a specific chip). */
    function showSelected(key: number) {
        const newChipsArray: chipDataType[] = chipsData.map(chip =>
            chip.id === key ? 
            {...chip, isSelected: true} : 
            {...chip, isSelected: false}
        )
        setChipsData(newChipsArray)
        sessionStorage.setItem("chipsData", JSON.stringify(newChipsArray))
    }

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
`