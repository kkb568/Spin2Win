import { css } from "@emotion/css";
import BottomComponent from "./Bottom/BottomComponent";
import TopComponent from "./Top/TopComponent";
import { createContext, useState } from "react";
import { ChipContextType, playDataStoreType, playDataStateType } from "../../data/dataTypes";
import { playAreaContext } from "../../data/data";


// The context is used for all components inside the PlayArea component.
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