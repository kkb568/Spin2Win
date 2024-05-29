import { css, cx } from "@emotion/css"
import { Diamond } from "../../../styles/styles"

interface previousNumProps {
    keyValue: number
    value: number,
    color: string,
    recentKeyValue: number
}

export default function PrevNumStats({ keyValue,
    value, 
    color, 
    recentKeyValue 
}: previousNumProps) {
    
    /* If the value is equal to zero, set the background to the light-green gradient,
    otherwise, set the background to the color props value. */
    const backgroundColorStyle = value === 0 ?
    css`
        background: linear-gradient(180deg,#7ec000 0,#5eb300 100%);
    ` : css`
        background-color: ${color};
    `

    // Make the most recent previous chosen value larger than the rest of the values.
    const numSizeStyle: string = keyValue === recentKeyValue
    ? css`
        width: 1.4em;
        height: 1.7em;
        font-size: 2em;
    ` : css`
        width: 1.2em;
        height: 1.5em;
        font-size: 1.6em;
    `

    const diamondSizeStyle: string = keyValue === recentKeyValue 
    ? css`
        width: 1em;
        height: 1.6em;
    ` : css`
        width: .8em;
        height: 1.3em;
    `

    // Show green diamond shape if the value is equal to zero, otherwise, show only the value.
    return (
        <div className={cx(prevNumStyle, numSizeStyle, backgroundColorStyle)}>
            {value === 0 ?
                <Diamond className={cx(diamondColorStyle, diamondSizeStyle)}/>
                : value
            }
        </div>
    )
}

const prevNumStyle = css`
    border: 1px solid rgba(255,255,255,.15);
    padding: 0 3px;
    margin: .3em 0 .3em .3em;
    border-radius: 5px;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, .2);
    font-family: 'Adamina';
    display: flex;
    align-items: center;
    justify-content: center;
`

const diamondColorStyle = css`
    background-color: #3e7600;
`