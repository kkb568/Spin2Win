import { css, cx } from "@emotion/css"
import WheelHead from "./WheelHead";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../App";
import { clearBetsData } from "../../utils/betUtils";
import Prize from "./Prize";
import Wheel from "./Wheel";
import { prevNumDataType } from "../../data/dataTypes";

/* The spinWheel is used to indicate if the wheel should spin or not,
The winningPrize is used to store the prize amount that the user wins by 
and the showPrize is used to to indicate if the prize component is to be shown or not. */
interface mainWheelState {
    spinWheelState: boolean,
    winningPrize: number,
    showPrize: boolean
}

// The component shows the spin wheel and its various parts.
export default function RouletteWheel() {
    const { mainData, setMainState } = useContext(MainContext);
    const { betsData } = mainData;

    const [rouletteWheelState, setRouletteWheelState] = useState<mainWheelState>({
        spinWheelState: false,
        winningPrize: 0,
        showPrize: false
    })

    const prevChosenNums: prevNumDataType[] = mainData.previousChosenNums;

    // Make the heightValue match up to the height of the PlayArea component.
    const heightValue: number = prevChosenNums.length === 0 ? 559.5 : 563.5;
    const tabletHeightValue: number = prevChosenNums.length === 0 ? 972.5 : 976.5;
    const phoneHeightValue: number = prevChosenNums.length === 0 ? 1750.8 : 1754.8;

    function setWheelState(key:string, value: boolean | number) {
        setRouletteWheelState(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    useEffect(() => {
        /* If the displayWheel value is equal to visible, 
        the spinWheelState is set to true after 2 seconds. */
        if (mainData.displayWheel === "visible") {
            const wheelSpinStartTimeout = setTimeout(() => {
                setWheelState("spinWheelState", true);
            }, 2000);

            /* After the wheel implementation is done, 
            hide the Prize component (to prevent being shown the previous win when the user plays again),
            set the spinWheelState to false, set the displayWheel to hidden 
            and clear the data in the betsData session storage. */
            const wheelSpinEndTimeout = setTimeout(() => {
                setWheelState("showPrize", false);
                setWheelState("spinWheelState", false);
                setMainState("displayWheel", "hidden");
                clearBetsData(betsData);
            }, 20000);

            return () => {
                clearTimeout(wheelSpinStartTimeout);
                clearTimeout(wheelSpinEndTimeout)
            }
        }
    }, [mainData.displayWheel])

    
    const rouletteWheelStyle = css`
        position: absolute;
        z-index: 8;
        visibility: ${mainData.displayWheel};
    `

    const wheelHeightStyle = css`
        height: ${`${heightValue}px`};

        @media (max-width: 900px) {
            height: ${`${tabletHeightValue}px`};
        }

        @media (max-width: 600px) {
            height: ${`${phoneHeightValue}px`};
        }
    `

    return (
        <div className={rouletteWheelStyle}>
            <div className={cx(wheelContentStyle, wheelHeightStyle)}>
                <Wheel spinWheel={rouletteWheelState.spinWheelState}
                setWheelState={setWheelState}/>
                <WheelHead />
                
                {/* Show the Prize component if the showPrize is true. */}
                {rouletteWheelState.showPrize &&
                    <>
                        <Prize winningPrize={rouletteWheelState.winningPrize}/>
                    </>
                }
            </div>
        </div>
    )
}

const wheelContentStyle = css`
    width: 960px;
    background: radial-gradient(circle,rgba(0,0,0,0) 0,rgba(0,0,0,0) 52.6%,rgba(0,0,0,.8) 100%) rgba(0,0,0,.8);
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 900px) {
        width: 600px;
    }

    @media (max-width: 600px) {
        width: 350px;
    }
`