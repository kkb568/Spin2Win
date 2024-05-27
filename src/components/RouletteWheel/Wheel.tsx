import { css } from "@emotion/css"
import { useEffect, useRef } from "react"
import { wheelDraw } from "../../utils/canvasUtils";
import { setRotation } from "../../utils/wheelUtils";

interface wheelProps {
    spinWheel: boolean,
    setWheelState: (key: string, value: boolean | number) => void
}

export default function Wheel({ spinWheel, setWheelState }: wheelProps) {
    const canvasRef = useRef<HTMLCanvasElement>();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        wheelDraw(context, canvasRef);
    }, [])

    useEffect(() => {
        if (spinWheel) {
            const getWinValue = async () => {
                const winValue: number = await setRotation(canvasRef);
                setWheelState("winningPrize", winValue);
                
                /* If the winValue is not equal to zero 
                (zero meaning the user has lost the game), show the Prize component. */
                setTimeout(() => {
                    if (winValue !== 0) {
                        setWheelState("showPrize", true);
                    }
                }, 2000);
            }
            getWinValue();
        }
    }, [spinWheel])


    return (
        <canvas className={sequenceListStyle}
        ref={canvasRef}></canvas>
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