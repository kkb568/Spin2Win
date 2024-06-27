import { css, cx } from "@emotion/css"
import { Diamond } from "../../../styles/styles"

interface itemProps {
    background: string,
    num: number,
    frequency: number,
    textColor: string
}

export default function HotColdItem({ background, 
    num, frequency, textColor 
}: itemProps) {
    const numColorStyle = css`
        background: ${background};
        color: ${textColor};
    `

    return (
        <div className={hotColdItemStyle}>
            <div className={cx(numStyle, numColorStyle)}>
                {num === 0 ?
                    <Diamond className={diamondStyle}/> : num
                }
            </div>
            {frequency}
        </div>
    )
}


const hotColdItemStyle = css`
    margin-top: -3.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .2em;
    font-family: 'Adamina';
`

const numStyle = css`
    width: 1.8em;
    height: 1.8em;
    border-radius: .9em;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 8px 0 rgba(0,0,0,.5);
`

const diamondStyle = css`
    width: .8em;
    height: 1.5em;
    background-color: #3e7600;
`