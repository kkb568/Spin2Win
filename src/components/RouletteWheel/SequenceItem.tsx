import { css } from "@emotion/css"

interface itemProps {
    color: string, 
    num?: number,
    rotateAngle: number
}

export default function SequenceItem({
    color, 
    num, 
    rotateAngle
}: itemProps) {

    const listStyle = css`
        width: 32px;
        height: 175px;
        position: absolute;
        left: 13.7em;
        transform: rotateZ(${rotateAngle}deg);
        transform-origin: bottom;
        display: flex;
        justify-content: center;
        border-left: 21px solid transparent;
        border-right: 21px solid transparent;
        border-top: 15em solid ${color};
        box-sizing: border-box;

        span {
            position: absolute;
            top: -10.5em;
            font-size: 1.3em;
        }
    `
    
    return (
        <li className={listStyle} 
        data-value={num}
        data-rotate={Math.floor(rotateAngle)}>
            {num !== 0 && <span>{num}</span>}
        </li>
    )
}