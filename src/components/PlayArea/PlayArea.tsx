import { css } from "@emotion/css";
import BottomComponent from "./Bottom/BottomComponent";
import TopComponent from "./Top/TopComponent";
import { createContext, useState } from "react";
import { getSelectedChipUrl, getSelectedChipValue } from "../../utils/chipUtils";
import { ChipContextType, playDataStoreType } from "../../data/dataTypes";

// The context is used for all components inside the PlayArea component.
export const ChipContext = createContext<ChipContextType>({
    getChipUrl: null,
    chipValue: 0,
    setAction: null,
    playDataStore: {
        chipUrl: "",
        enableButton: false,
        totalBet: 0,
        ifSpinned: false,
        reloadLastBets: false,
        countReload: 0
    },
    updateTotalBet: null,
    updateIfSpinned: null,
    updateReloadLastBets: null
});

// The component is the playing area that contains all the buttons and chips.
export default function PlayArea() {
    const [playData, setPlayData] = useState<playDataStoreType>({
        chipUrl: getSelectedChipUrl(),
        enableButton: false,
        totalBet: 0,
        ifSpinned: false,
        reloadLastBets: false,
        countReload: 0
    })
    const selectedChipValue = getSelectedChipValue();

    /* The function gets the selected chip url and is called
    when the user selects a chip so as to update the chip 
    shown when user hovers over any of the buttons in the TopComponent component. */
    function getSelectedChip() {
        setPlayData(prevState => {
            return {
                ...prevState,
                chipUrl: getSelectedChipUrl()
            }
        })
    }
    /*The function is used to enable the action buttons (if set is true),
    when the one of the grid buttons is clicked, or disable the action buttons 
    (if set is false) when the delete button is clicked. */
    function setActionButtons(set: boolean) {
        setPlayData(prevState => {
            return {
                ...prevState,
                enableButton: set
            }
        })
    }

    /* The function is used to update the total bet 
    and is called when the user clicks on any of the grid buttons. */
    function updateTotalBet(total: number) {
        setPlayData(prevState => {
            return {
                ...prevState,
                totalBet: total
            }
        })
    }

    /* The function is used to update the ifSpinned value.
    The ifSpinned state is used to show if the wheel had already completed the spinning process. */
    function updateIfSpinned(value: boolean) {
        setPlayData(prevState => {
            return {
                ...prevState,
                ifSpinned: value
            }
        })
    }

    /*The function is used to set the reloadLastBets value. It's called when
    the reload button (the first button) from the ActionSection component is clicked. 
    The countReload is used to count the number of times the reload button is clicked. */
    function updateReload(value: boolean, count?: number) {
        setPlayData(prevState => {
            return {
                ...prevState,
                reloadLastBets: value,
                countReload: count
            }
        })
    }



     /* The contextValue provides the selected chip and 
        the getSelectedChip function to all elements within the PlayArea component, 
        useful for displaying the selected chip when user hovers over the 
        buttons in the TopComponent component.
        It also provide the enableButton for setting the action buttons 
        based on its value. */
    const chipContextValue: ChipContextType = {
        getChipUrl: getSelectedChip,
        chipValue: selectedChipValue,
        setAction: setActionButtons,
        playDataStore: playData,
        updateTotalBet: updateTotalBet,
        updateIfSpinned: updateIfSpinned,
        updateReloadLastBets: updateReload
    }

    return (
        <div className={PlayAreaStyle}>
            <ChipContext.Provider value={chipContextValue}>
                <TopComponent />
                <BottomComponent />
            </ChipContext.Provider>
        </div>
    )
}


const PlayAreaStyle = css`
    width: 960px;
    color: white;
`