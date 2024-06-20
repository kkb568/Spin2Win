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

    const { mainData } = useContext(MainContext);

    useEffect(() => {
        const canvas = wheelCanvasRef.current;
        const context = canvas.getContext('2d');
        wheelDraw(context, wheelCanvasRef);
    }, [])

    useEffect(() => {
        if (spinWheel) {
            const getWinValue = async () => {
                const winValue: number = await setRotation(wheelCanvasRef, mainData.betsData);
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