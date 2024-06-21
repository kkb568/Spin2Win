import { css } from "@emotion/css"
import { useContext, useEffect, useRef } from "react"
import { wheelDraw } from "../../utils/wheelCanvasUtils";
import { setRotation } from "../../utils/wheelUtils";
import { MainContext } from "../../App";

interface wheelProps {
    spinWheel: boolean,
    setWheelState: (key: string, value: boolean | number) => void
}

export default function Wheel({ spinWheel, setWheelState }: wheelProps) {
    const wheelCanvasRef = useRef<HTMLCanvasElement>();

    const { mainData, setMainState } = useContext(MainContext);
    const { betsData, previousChosenNums } = mainData;

    useEffect(() => {
        const canvas = wheelCanvasRef.current;
        const context = canvas.getContext('2d');
        wheelDraw(context, wheelCanvasRef);
    }, [])

    useEffect(() => {
        if (spinWheel) {
            const getWinValue = async () => {
                // Get the prize, previousChosenNums array and chosenNumDetails object.
                const { prize, prevChosenNums, chosenNumDetails} = await setRotation(wheelCanvasRef, betsData, previousChosenNums);
                // Set the winningPrize state to the prize's value.
                setWheelState("winningPrize", prize);
                
                /* If the winValue is not equal to zero 
                (zero meaning that the user has lost the game), show the Prize component. */
                setTimeout(() => {
                    if (prize !== 0) {
                        setWheelState("showPrize", true);
                    }
                }, 2000);

                /* After 8 seconds (from the time the wheel stops to spins to the time the whole RouletteWheel component is closed),
                set the previousChosenNums and correctValueData states to the respective returned values from the wheel spin. */
                setTimeout(() => {
                    setMainState("previousChosenNums", prevChosenNums);
                    setMainState("correctValueData", chosenNumDetails);
                }, 8000);
            }
            getWinValue();
        }
    }, [spinWheel])


    return (
        <canvas className={sequenceListStyle}
        ref={wheelCanvasRef}></canvas>
    )
}


const sequenceListStyle = css`
    height: 30em;
    width: 30em;

    @media (max-width: 600px) {
        height: 20em;
        width: 20em;
    }
`