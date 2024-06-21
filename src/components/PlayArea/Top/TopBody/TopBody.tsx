import { css } from "@emotion/css";
import BottomGrid from "./Grid/BottomGrid/BottomGrid";
import LionIcons from "./LionIcons";
import MiddleGrid from "./Grid/MiddleGrid/MiddleGrid";
import TopGrid from "./Grid/TopGrid/TopGrid";
import ActionSection from "./ActionSection";
import { useContext, useEffect } from "react";
import { correctValueDataType } from "../../../../data/dataTypes";
import { ChipContext } from "../../PlayArea";
import { MainContext } from "../../../../App";

// This is the main playing area.
export default function TopBody() {
    const { playDataStore, updatePlayAreaState } = useContext(ChipContext);
    const { ifSpinned } = playDataStore;

    const { mainData, setMainState } = useContext(MainContext);
    const { correctValueData } = mainData;

    /* If ifSpinned is true, after 5 seconds (to wait for the correctHover div from each button to be fully shown),
    update the correctValueData state to the newCorrectValueData and update the ifSpinned to false.*/
    useEffect(() => {
        if (ifSpinned) {
            setTimeout(() => {
                const correctValue = correctValueData.value;
                const newCorrectValueData: correctValueDataType = {
                    value: correctValue,
                    even_odd: "",
                    low_high: "",
                    numColor: "",
                    dozenRange: ""
                }
                setMainState("correctValueData", newCorrectValueData);
                updatePlayAreaState("ifSpinned", false);
            }, 5000);
        }
    }, [ifSpinned])

    return (
        <div className={TopBodyStyle}>
            <TopGrid />
            <br/><br/><br/>
            <MiddleGrid />
            <br/>
            <BottomGrid />
            <LionIcons />
            <ActionSection />
        </div>
    )
}


const TopBodyStyle = css`
    margin: 0 10em;
    padding: 2em 0;
`