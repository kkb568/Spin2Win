import { css } from "@emotion/css"

export default function WheelBorder() {
    return (
        <>
            <div className={wheelBorderStyle} />
            <div className={wheelBorderPointerStyle}>
                <div />
                <div />
            </div>
        </>
    )
}


const wheelBorderStyle = css`
    width: 32em;
    height: 32em;
    background: linear-gradient(315deg, #a96f44 0%, #f2ecb6 74%);
    border-radius: 50%;

    @media (max-width: 600px) {
        width: 21.5em;
        height: 21.5em;
    }
`

const wheelBorderPointerStyle = css`
    position: absolute;
    z-index: 9;
    margin-bottom: 31em;
    filter: drop-shadow(0 1px 1px #1c1c1c);

    @media (max-width: 600px) {
        margin-bottom: 21em;
    }

    div:first-child {
        width: 32px;
        height: 18px;
        background-color: #f2ecb6;
        border-radius: 15px 15px 0 0;

        @media (max-width: 600px) {
            width: 25px;
            height: 15px;
        }
    }

    div:last-child {
        border-left: 16px solid transparent;
        border-right: 16px solid transparent;
        border-top: 30px solid #f2ecb6;

        @media (max-width: 600px) {
            border-left: 12px solid transparent;
            border-right: 12px solid transparent;
            border-top: 25px solid #f2ecb6;
        }
    }
`