import { css } from "@emotion/css"

export default function WheelHead() {    
    return (
        <>
            <div className={wheelHeadBorderStyle}>
                <div />
                <div />
            </div>
            <div className={wheelHeadStyle}>
                <span>Spin</span>
            </div>
        </>
    )
}


const wheelHeadBorderStyle = css`
    position: absolute;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 2px 5px #1c1c1c);

    div:first-child {
        width: 9.5em;
        height: 9.5em;
        border-radius: 50%;
        background: linear-gradient(315deg, #a96f44 0%, #f2ecb6 74%);
        
        @media (max-width: 600px) {
            width: 7.5em;
            height: 7.5em;
        }
    }

    div:last-child {
        position: absolute;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-bottom: 25px solid #f2ecb6;
        margin-top: -10.5em;

        @media (max-width: 600px) {
            margin-top: -8.5em;
            border-left: 12px solid transparent;
            border-right: 12px solid transparent;
        }
    }
`

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

    @media (max-width: 600px) {
        width: 6em;
        height: 6em;
    }

    span {
        display: table-cell;
        vertical-align: middle;
        font-size: 3em;

        @media (max-width: 600px) {
            font-size: 2em;
        }
    }
`