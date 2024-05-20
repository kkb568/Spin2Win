import { css } from "@emotion/css"

export default function WheelHead() {    
    return (
        <>
            <div className={wheelHeadBorderStyle}></div>
            <div className={wheelHeadStyle}>
                <span>Spin</span>
            </div>
            <div className={wheelHeadPointerStyle}></div>
        </>
    )
}


const wheelHeadStyle = css`
    background-color: black;
    font-family: 'Adamina';
    color: white;
    width: 8em;
    height: 8em;
    border-radius: 50%;
    position: absolute;
    z-index: 10;
    text-align: center;
    display: table;
    border: 3px solid transparent;

    span {
        display: table-cell;
        vertical-align: middle;
        font-size: 3em;
    }
`

const wheelHeadBorderStyle = css`
    position: absolute;
    z-index: 9;
    width: 9.5em;
    height: 9.5em;
    border-radius: 50%;
    background: radial-gradient(#B59410, #FFD700);
`

const wheelHeadPointerStyle = css`
    position: absolute;
    z-index: 8;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 25px solid #FFD700;
    margin-bottom: 10.5em;
`