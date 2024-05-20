import { css } from "@emotion/css";
import BottomGrid from "./Grid/BottomGrid/BottomGrid";
import LionIcons from "./LionIcons";
import MiddleGrid from "./Grid/MiddleGrid/MiddleGrid";
import TopGrid from "./Grid/TopGrid/TopGrid";
import ActionSection from "./ActionSection";
import { createContext, useContext, useEffect, useState } from "react";
import { correctValueDataType } from "../../../../data/dataTypes";
import { ChipContext } from "../../PlayArea";

export const GridContext = createContext<correctValueDataType>({
    value: 0,
    even_odd: "",
    low_high: "",
    red_black: "",
    dozenRange: ""
})

// This is the main playing area.
export default function TopBody() {
    const { playDataStore, updateIfSpinned } = useContext(ChipContext);
    const { ifSpinned } = playDataStore;

    // The state is shared only on the buttons in the three grids.
    const [gridState, setGridState] = useState<correctValueDataType>({
        value: 0,
        even_odd: "",
        low_high: "",
        red_black: "",
        dozenRange: ""
    });

    /* If ifSpinned is true, update the gridState to the correctValueData session storage
    and then after 5 seconds, update the gridState, the ifSpinned to false
    and remove the correctValueData session storage. */
    useEffect(() => {
        if (ifSpinned) {
            const correctValueData: correctValueDataType = JSON.parse(sessionStorage.getItem("correctValueData"));
            setGridState(correctValueData);

            setTimeout(() => {
                setGridState(prevState => {
                    return {
                        ...prevState,
                        even_odd: "",
                        low_high: "",
                        red_black: "",
                        dozenRange: ""
                    }
                });
                updateIfSpinned(false);
                sessionStorage.removeItem("correctValueData");
            }, 5000);
        }
    }, [ifSpinned])

    return (
        <div className={TopBodyStyle}>
            <GridContext.Provider value={gridState}>
                <TopGrid />
                <br/><br/><br/>
                <MiddleGrid />
                <br/>
                <BottomGrid />
            </GridContext.Provider>
            <LionIcons />
            <ActionSection />
        </div>
    )
}


const TopBodyStyle = css`
    margin: 0 10em;
    padding: 2em 0;
`