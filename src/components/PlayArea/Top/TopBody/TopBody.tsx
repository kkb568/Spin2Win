import { css } from "@emotion/css";
import BottomGrid from "./Grid/BottomGrid/BottomGrid";
import LionIcons from "./LionIcons";
import MiddleGrid from "./Grid/MiddleGrid/MiddleGrid";
import TopGrid from "./Grid/TopGrid/TopGrid";
import ActionSection from "./ActionSection";
import { createContext, useContext, useEffect, useState } from "react";
import { correctValueDataType } from "../../../../data/dataTypes";
import { ChipContext } from "../../PlayArea";

// This is used to store the details of the chosen value stored in the correctValueData storage.
/**
 * 1. value: The chosen value from the spin wheel functionality.
 * 2. even_odd: If the value is even or odd number.
 * 3. low_high: If the value is low (between 1 and 18) or high (between 19 and 36).
 * 4. numColor: If the value is from redNumbers array (having red background color - "red") or not "black".
 *      If the value is zero, the numColor will be the green hex value.
 * 5. dozenRange: The dozen range in which the value lies.
 */
export const GridContext = createContext<correctValueDataType>({
    value: null,
    even_odd: "",
    low_high: "",
    numColor: "",
    dozenRange: ""
})

// This is the main playing area.
export default function TopBody() {
    const { playDataStore, updatePlayAreaState } = useContext(ChipContext);
    const { ifSpinned } = playDataStore;

    // The state is shared only on the buttons in the three grids.
    const [gridState, setGridState] = useState<correctValueDataType>({
        value: null,
        even_odd: "",
        low_high: "",
        numColor: "",
        dozenRange: ""
    });

    /* If ifSpinned is true, update the gridState to the correctValueData session storage
    and then after 5 seconds (to wait for the correctHover div from each button to be fully shown),
    update the gridState, the ifSpinned to false and remove the correctValueData session storage. */
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
                        numColor: "",
                        dozenRange: ""
                    }
                });
                updatePlayAreaState("ifSpinned", false);
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