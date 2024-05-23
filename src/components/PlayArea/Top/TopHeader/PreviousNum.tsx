import { css, cx } from "@emotion/css"

interface previousNumProps {
    keyValue: number
    value: number,
    color: string,
    recentKeyValue: number
}

export default function PreviousNum({ keyValue,
    value, 
    color, 
    recentKeyValue 
}: previousNumProps) {
    
    const backgroundColorStyle = css`
        background-color: ${color};
    `

    // Make the most recent previous chosen value larger than the rest of the values.
    const numSizeStyle: string = keyValue === recentKeyValue
    ? css`
        width: 1.4em;
        height: 1.7em;
        font-size: 1.2em;
    ` : css`
        width: 1.2em;
        height: 1.4em;
        font-size: 1em;
    `

    return (
        <div className={cx(prevNumStyle, numSizeStyle, backgroundColorStyle)}>
            {value}
        </div>
    )
}

const prevNumStyle = css`
    border: 1px solid rgba(255,255,255,.15);
    padding: 0 3px;
    margin: .3em 0 .3em .7em;
    border-radius: 5px;
    box-shadow: 0 1px 8px 0 rgba(0,0,0,.5);
    font-family: 'Adamina';
    display: flex;
    align-items: center;
    justify-content: center;
`