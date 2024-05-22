import { css } from "@emotion/css"
import { useContext } from "react"
import { ChipContext } from "../../PlayArea"
import { Action, betDataType } from "../../../../data/dataTypes"
import { clearBetsData, doubleBetValue, getTotalBet } from "../../../../utils/betUtils"
import { addAction, clearUserActions, undoBetAction } from "../../../../utils/actionUtils"

export default function ActionSection() {
    const { playDataStore, updatePlayAreaState } = useContext(ChipContext)
    const { enableButton, countReload } = playDataStore;

    const lastBetDataArray: betDataType[] | any[] = JSON.parse(sessionStorage.getItem("lastBetData"));

    /* The functions clear all user actions and bets, disables the action buttons,
    updates the total bet to the original state and update the countReload to zero. */
    function deleteBets() {
        clearUserActions();
        clearBetsData();
        updatePlayAreaState("enableButton", false);
        updatePlayAreaState("totalBet", 0);
        updatePlayAreaState("reloadLastBets", false);
        updatePlayAreaState("countReload", 0);
    }

    /* The function doubles the bet values of all the bets,
    adds the double_bets action to actionData storage and updates the total bet. */
    function doubleBets() {
        doubleBetValue();
        addAction(Action.Double_Bets, null);
        updatePlayAreaState("totalBet", getTotalBet());
    }

    /* The function is undo the bets done by the user, updates the total bets 
    and if the total bets is equal to zero, disable the action buttons
    and update the countReload to zero. */
    function undoBets() {
        undoBetAction();
        updatePlayAreaState("totalBet", getTotalBet());
        
        if(getTotalBet() === 0) {
            updatePlayAreaState("enableButton", false);
            updatePlayAreaState("reloadLastBets", false);
            updatePlayAreaState("countReload", 0);
        }
    }

    /* If the countReload is equal to zero (so as to avoid repetition of adding the last bets to the playing area),
    clear the betsData and then update the reloadLastBets to true and increment the countReload by one. */
    function reloadPrevBets() {
        if (countReload === 0) {
            clearBetsData();
            updatePlayAreaState("reloadLastBets", true);
            updatePlayAreaState("countReload", countReload + 1);
        }
    }

    return (
        <div className={actionSectionStyle}> 
            {/* The below button is enabled if there is data in the lastBetData storage. */}
            <button className={
                lastBetDataArray.length === 0 ? disabledButtonStyle : enabledButtonStyle
            } onClick={() => reloadPrevBets()}>
                <i className="fa-solid fa-rotate-right"></i>
            </button>
            <br/>

            <button className={
                enableButton === true ? enabledButtonStyle : disabledButtonStyle
            } onClick={() => doubleBets()}>x2</button>
            <br/>

            <button className={
                enableButton === true ? enabledButtonStyle : disabledButtonStyle
            } onClick={() => undoBets()}>
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