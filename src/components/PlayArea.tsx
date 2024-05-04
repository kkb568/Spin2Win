import { css } from "@emotion/css";
import BottomComponent from "./Bottom/BottomComponent";
import TopComponent from "./Top/TopComponent";
import { createContext, useState } from "react";
import { getSelectedChipUrl } from "../utils/utils";

interface ChipContextType {
    chipUrl: string,
    getChipUrl: (() => void) | null
}

export const ChipContext = createContext<ChipContextType>({
    chipUrl: "",
    getChipUrl: null
});

export default function PlayArea() {
    const [selectedChipUrl, setSelectedChipUrl] = useState(getSelectedChipUrl());

    /* The function gets the selected chip url and is called
    when the user selects a chip so as to update the chip 
    shown when user hovers any of the buttons in the TopComponent component. */
    function getSelectedChip() {
        setSelectedChipUrl(getSelectedChipUrl())
    }

    const contextValue: ChipContextType = {
        chipUrl: selectedChipUrl,
        getChipUrl: getSelectedChip
    }

    /* The contextValue provides the selected chip and 
        the getSelectedChip function to all elements within the PlayArea component.
        Useful for displaying the selected chip when user hovers over the 
        buttons in the TopComponent component. */
    return (
        <div className={PlayAreaStyle}>
            <ChipContext.Provider value={contextValue}>
                <TopComponent />
                <BottomComponent />
            </ChipContext.Provider>
        </div>
    )
}


const PlayAreaStyle = css`
    width: 960px;
    height: 80vh;
    color: white;
`