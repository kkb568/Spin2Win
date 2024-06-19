import { css } from "@emotion/css";
import BottomComponent from "./Bottom/BottomComponent";
import TopComponent from "./Top/TopComponent";
import { createContext, useState } from "react";
import { ChipContextType, playDataStoreType, playDataStateType } from "../../data/dataTypes";
import { playAreaContext } from "../../data/data";


// The context is used for all components inside the PlayArea component.
/**
 * 1. chipValue: The value of the selected chip.
 * 2. chipUrl: Url of chip shown when user hovers over any of the buttons in the TopComponent component.
 * 3. enableButton: Enable the action buttons (if set is true),
        when the one of the grid buttons is clicked, or disable the action buttons (if set is false) 
        when the delete button is clicked or when the wheel spin functionality is called.
 * 4. totalBet: The total of all the bet values and is updated when the user clicks on any of the grid or the action
        buttons or when the wheel rotation commences.
 * 5. ifSpinned: To show if the wheel spin rotation is already completed.
 * 6. reloadLastBets: Changes when the reload button (the first button) from the ActionSection component is clicked
 *      so as to show the bets from the previous play.
 * 7. countReload: Count the number of times the reload button is clicked.
 * 8. ifNumClicked: Check if any of the NumButton buttons has been clicked. Useful for removing 
 *      the chess piece if it is present on the playing area.
 * 9. disableButtonEvents: Used for disabling the grid buttons' and the redo button's events when the ifNumClicked is true 
 *      so as to prevent the grid button's event listeners when the correctHoverStyle div is shown for 5 seconds.  
 * 10. disableFooterButtons: Used to disable the second and third footer buttons
 *      when the wheel spin implementation is occurring.
 */
export const ChipContext = createContext<ChipContextType>(playAreaContext);

// The component is the playing area that contains all the buttons and chips.
export default function PlayArea() {
    const [playData, setPlayData] = useState<playDataStoreType>(playAreaContext.playDataStore)

    /* The function is used to update the playData state,
    based on the key and the value parameter values. */
    function updatePlayAreaState(key: string, value: playDataStateType) {
        setPlayData(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }


    const chipContextValue: ChipContextType = {
        playDataStore: playData,
        updatePlayAreaState: updatePlayAreaState
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

    @media (max-width: 900px) {
        width: 600px;
    }

    @media (max-width: 600px) {
        width: 350px;
    }
`