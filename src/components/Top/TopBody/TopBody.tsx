import { css } from "@emotion/css";
import BottomGrid from "./BottomGrid/BottomGrid";
import LionIcons from "./LionIcons";
import MiddleGrid from "./MiddleGrid/MiddleGrid";
import TopGrid from "./TopGrid/TopGrid";
import { getSelectedChipUrl } from "../../../utils/utils";
import { createContext } from "react";

interface ChipContextType {
    chipUrl: string
}

export const ChipContext = createContext<ChipContextType>({
    chipUrl: ""
});

// This is the main playing area.
export default function TopBody() {
    const selectedChipUrl = getSelectedChipUrl();

    const contextValue: ChipContextType = {
        chipUrl: selectedChipUrl
    }

    /* The contextValue provides the selected chip to all button
        elements in the three grid components (the buttons in the main playing area). 
        Useful for displaying the selected chipwhen user hovers over the 
        buttons in the three grid components. */
    return (
        <div className={TopBodyStyle}>
            <ChipContext.Provider value={contextValue}>
                <TopGrid />
                <br/><br/><br/>
                <MiddleGrid />
                <br/>
                <BottomGrid />
            </ChipContext.Provider>
            <LionIcons />
        </div>
    )
}


const TopBodyStyle = css`
    margin: 0 10em;
    padding: 2em 0;
`