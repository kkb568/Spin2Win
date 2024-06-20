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
                // Get the prize and previousChosenNums array and set to respective states.
                const { prize, prevChosenNums} = await setRotation(wheelCanvasRef, betsData, previousChosenNums);
                setWheelState("winningPrize", prize);
                setMainState("previousChosenNums", prevChosenNums);
                
                /* If the winValue is not equal to zero 
                (zero meaning the user has lost the game), show the Prize component. */
                setTimeout(() => {
                    if (prize !== 0) {
                        setWheelState("showPrize", true);
                    }
                }, 2000);
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