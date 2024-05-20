import { css } from "@emotion/css"
import WheelHead from "./WheelHead";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../App";
import { clearBetsData } from "../../utils/betUtils";
import Prize from "./Prize";
import Wheel from "./Wheel";

/* The spinWheel is used to indicate if the wheel should spin or not,
The winningPrize is used to store the prize amount that the user wins by 
and the showPrize is used to to indicate if the prize component is to be shown or not. */
interface mainWheelState {
    spinWheelState: boolean,
    winningPrize: number,
    showPrize: boolean
}

export default function RouletteWheel() {
    const { mainData, setDisplay } = useContext(MainContext);

    const [rouletteWheelState, setRouletteWheelState] = useState<mainWheelState>({
        spinWheelState: false,
        winningPrize: 0,
        showPrize: false
    })

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
            setTimeout(() => {
                setWheelState("spinWheelState", true);
            }, 2000);

            /* After the wheel implementation is done, 
            hide the Prize component (to prevent being shown the previous win when the user plays again),
            set the displayWheel to none and clear the data in the betsData session storage. */
            setTimeout(() => {
                setWheelState("showPrize", false);
                setWheelState("spinWheelState", false);
                setDisplay("displayWheel", "hidden");
                clearBetsData();
            }, 20000);
        }
    }, [mainData.displayWheel])

    const rouletteWheelStyle = css`
        position: absolute;
        z-index: 8;
        visibility: ${mainData.displayWheel};
    `

    return (
        <div className={rouletteWheelStyle}>
            <div className={wheelContentStyle}>
                <Wheel spinWheel={rouletteWheelState.spinWheelState}
                setWheelState={setWheelState}/>
                <WheelHead />
                
                {/* Show the Prize component if the showPrize is true and the winningPrize is not equal to zero. */}
                {rouletteWheelState.showPrize &&
                    <Prize winningPrize={rouletteWheelState.winningPrize}/>
                }
            </div>
        </div>
    )
}

const wheelContentStyle = css`
    width: 960px;
    height: 84.5vh;
    background: radial-gradient(circle,rgba(0,0,0,0) 0,rgba(0,0,0,0) 52.6%,rgba(0,0,0,.8) 100%) rgba(0,0,0,.8);
    display: flex;
    align-items: center;
    justify-content: center;
`