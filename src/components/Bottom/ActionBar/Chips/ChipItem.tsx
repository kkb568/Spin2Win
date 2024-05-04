import { css } from "@emotion/css"

interface ChipProps {
    url: string,
    name: string,
    details: string,
    keyValue: number,
    selected: boolean,
    changeSelected: (key: number) => void
}

export default function ChipItem({ 
    url, name, details, keyValue, selected, changeSelected }: ChipProps) {
    
    /* The selected property is boolean value used to 
    determine if the image border should be visible or not. */
    const ImageBorderStyle = css`
        position: absolute;
        margin-left: -7.5px;
        margin-top: -6.5px;
        width: 38px;
        height: 38px;
        border: 4px solid yellow;
        border-radius: 50%;
        display: ${selected ? "block" : "none"};
    `
        
    return (
        <div>
            <div className={ImageDivStyle} onClick={() => changeSelected(keyValue)}>
                <div className={ImageBorderStyle}></div>
                <img src={url} alt={name} className={ChipImageStyle}/>
            </div>
            <p className={ChipDetailsStyle}>{details}</p>
        </div>
    )
}


const ImageDivStyle = css`
    cursor: pointer;
`

const ChipImageStyle = css`
    width: 32px;
    height: 32px;
    box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
    border-radius: 50%;
`

const ChipDetailsStyle = css`
    font-size: 11px;
    font-weight: bold;
    line-height: 5px;
`