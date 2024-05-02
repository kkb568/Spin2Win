import { css } from "@emotion/css";
import { Button, Diamond } from "../../../../styles/styles";
import { ButtonFontStyle } from "../../../../styles/styles";
import { useContext } from "react";
import { ChipContext } from "../TopBody";

export default function BottomGrid() {
    const { chipUrl } = useContext(ChipContext)

    return (
        <div className={BottomGridStyle}>
            <Button style={ButtonFontStyle}>
                Low
                <div className={hoverElementStyle}>
                    <div className={foregroundStyle}></div>
                    <img className={chipStyle} src={chipUrl} />
                </div>
            </Button>
            <Button style={ButtonFontStyle}>
                Even
                <div className={hoverElementStyle}>
                    <div className={foregroundStyle}></div>
                    <img className={chipStyle} src={chipUrl} />
                </div>
            </Button>
            <Button>
                <div className={hoverElementStyle}>
                    <div className={foregroundStyle}></div>
                    <img className={chipStyle} src={chipUrl} />
                </div>
                <Diamond className={diamondStyle}
                style={{
                    backgroundColor: "#ff001f"
                }}></Diamond>
            </Button>
            <Button>
                <div className={hoverElementStyle}>
                    <div className={foregroundStyle}></div>
                    <img className={chipStyle} src={chipUrl} />
                </div>
                <Diamond className={diamondStyle}
                style={{
                    backgroundColor: "#1f1f1f"
                }}></Diamond>
            </Button>
            <Button style={ButtonFontStyle}>
                Odd
                <div className={hoverElementStyle}>
                    <div className={foregroundStyle}></div>
                    <img className={chipStyle} src={chipUrl} />
                </div>
            </Button>
            <Button style={ButtonFontStyle}>
                High
                <div className={hoverElementStyle}>
                    <div className={foregroundStyle}></div>
                    <img className={chipStyle} src={chipUrl} />
                </div>
            </Button>
        </div>
    )
}


const hoverElementStyle = css`
    position: absolute;
    margin-left: 7.6em;
    margin-top: 1em;
`

const foregroundStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 5.9em;
    height: 2.5em;
    margin-left: -6.7em;
    margin-top: -1.5em;
`

const chipStyle = css`
    position: absolute;
    width: 1.5em;
    margin-left: -1.5em;
    z-index: 3;
    
`

const BottomGridStyle = css`
    display: grid;
    grid-template-columns: repeat(6, 1fr);  
`

const diamondStyle = css`
    width: 5.1em;
    height: 3.4em;
    margin-top: -.5em;
`