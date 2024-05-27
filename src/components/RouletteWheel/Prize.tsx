import { css } from "@emotion/css"

interface PrizeProps {
    winningPrize: number
}

export default function Prize({ winningPrize }: PrizeProps) {
    return (
        <div className={prizeStyle}>
            <div className={whiteBorderStyle}>
                <p>You Won!</p>
                <p>Ksh{winningPrize}.00</p>
            </div>
        </div>
    )
}


const prizeStyle = css`
    position: absolute;
    z-index: 11;
    width: 28em;
    height: 28em;
    border-radius: 50%;
    background-color: #00a200;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';

    @media (max-width: 600px) {
        width: 18em;
        height: 18em;
    }
`

const whiteBorderStyle = css`
    width: 24em;
    height: 24em;
    border-radius: 50%;
    border: 10px solid white;
    text-align: center;

    @media (max-width: 600px) {
        width: 14em;
        height: 14em;
    }

    p:first-child {
        color: white;
        margin-top: 2.5em;
        font-size: 2.5em;

        @media (max-width: 600px) {
            margin-top: 2em;
            font-size: 1.5em;
        }
    }

    p:last-child {
        font-size: 4em;
        color: yellow;

        @media (max-width: 600px) {
            font-size: 3em;
        }
    }
`