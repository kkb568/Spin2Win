import { css } from "@emotion/css"
import { useContext } from "react"
import { ChipContext } from "../../PlayArea"
import { clearBetsData, doubleBetValue } from "../../../utils/utils"

export default function ActionSection() {
    const { setAction, playDataStore, updateBetData } = useContext(ChipContext)
    const { enableButton } = playDataStore;

    /* The functions clears all bets, disables the action buttons 
    and updates the betData to the original state. */
    function deleteBets() {
        clearBetsData();
        setAction(false);
        updateBetData(0, 0);
    }

    return (
        <div className={actionSectionStyle}> 
            <button>
                <i className="fa-solid fa-rotate-right"></i>
            </button>
            <br/>

            <button className={
                enableButton === true ? enabledButtonStyle : disabledButtonStyle
            } onClick={() => doubleBetValue()}>x2</button>
            <br/>

            <button className={
                enableButton === true ? enabledButtonStyle : disabledButtonStyle
            }>
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </button>
            <br/>
            
            <button className={
                enableButton === true ? enabledButtonStyle : disabledButtonStyle
            } onClick={() => deleteBets()}>
                <i className="fa-solid fa-trash-can"></i>
            </button>
        </div>
    )
}


const actionSectionStyle = css`
    position: absolute;
    margin-left: 44em;
    margin-top: -21em;
    
    button {
        border: none;
        width: 2.1em;
        height: 2.1em;
        border-radius: 20em;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 5px 0 rgba(0,0,0,.1),0 5px 5px 0 rgba(0,0,0,.2);
        font-size: 1em;
        font-family: 'Roboto';
        font-weight: 700;
        transition: 50ms ease-in;

        &:hover {
            transform: scale(1.1);
        }
    }
`

const enabledButtonStyle = css`
    background-color: white;
    color: #b70016;
    cursor: pointer;
    pointer-events: all;
`

const disabledButtonStyle = css`
    background-color: rgba(255,255,255,.35);
    color: rgba(255,255,255,.5);
    pointer-events: none;
`