import { css } from "@emotion/css"
import { WheelHeadBorder, WheelHeadContent } from "../../styles/styles"

export default function WheelHead() {    
    return (
        <>
            <WheelHeadBorder className={wheelHeadBorderStyle}>
                <div />
                <div />
            </WheelHeadBorder>
            <WheelHeadContent className={wheelHeadStyle}>
                <span>Spin</span>
            </WheelHeadContent>
        </>
    )
}


const wheelHeadBorderStyle = css`
    div:first-child {
        width: 9.5em;
        height: 9.5em;
        
        @media (max-width: 600px) {
            width: 7.5em;
            height: 7.5em;
        }
    }

    div:last-child {
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
    width: 8em;
    height: 8em;

    @media (max-width: 600px) {
        width: 6em;
        height: 6em;
    }

    span {
        font-size: 3em;

        @media (max-width: 600px) {
            font-size: 2em;
        }
    }
`