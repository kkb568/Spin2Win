import { css } from "@emotion/css"
import { useContext } from "react"
import { ChipContext } from "../../PlayArea"
import { Action, betDataType } from "../../../../data/dataTypes"
import { clearBetsData, doubleBetValue, getTotalBet } from "../../../../utils/betUtils"
import { addAction, clearUserActions, undoBetAction } from "../../../../utils/actionUtils"
import { ActionButton } from "../../../../styles/styles"
import { MainContext } from "../../../../App"

// The component displays the four action buttons on the right side of the PlayArea.
export default function ActionSection() {
    const { playDataStore, updatePlayAreaState } = useContext(ChipContext)
    const { enableButton, countReload, disableButtonEvents,
        actionsData
     } = playDataStore;

    const { setMainState, mainData } = useContext(MainContext);
    const { betsData } = mainData;

    const lastBetDataArray: betDataType[] | any[] = JSON.parse(sessionStorage.getItem("lastBetData"));

    /* The functions clear all user actions and bets, disables the action buttons,
    updates the total bet to the original state and update the countReload to zero. */
    function deleteBets() {
        updatePlayAreaState("actionsData", clearUserActions(actionsData));
        setMainState("betsData", clearBetsData(betsData));
        updatePlayAreaState("enableButton", false);
        updatePlayAreaState("totalBet", 0);
        updatePlayAreaState("reloadLastBets", false);
        updatePlayAreaState("countReload", 0);
    }

    /* The function doubles the bet values of all the bets,
    adds the double_bets action to actionData storage and updates the total bet. */
    function doubleBets() {
        setMainState("betsData", doubleBetValue(betsData));
        updatePlayAreaState("actionsData", addAction(Action.Double_Bets, null, actionsData));
        updatePlayAreaState("totalBet", getTotalBet(betsData));
    }

    /* The function is undo the bets done by the user, update the respective actions and bets, and the total bets 
    and if the total bets is equal to zero, disable the action buttons and update the countReload to zero. */
    function undoBets() {
        const returnedArrays = undoBetAction(actionsData, betsData);
        updatePlayAreaState("actionsData", returnedArrays.actionsArray);
        setMainState("betsData", returnedArrays.betsDataArray);
        updatePlayAreaState("totalBet", getTotalBet(betsData));
        
        if(getTotalBet(betsData) === 0) {
            updatePlayAreaState("enableButton", false);
            updatePlayAreaState("reloadLastBets", false);
            updatePlayAreaState("countReload", 0);
        }
    }

    /* If the countReload is equal to zero (so as to avoid repetition of adding the last bets to the playing area),
    clear the betsData and then update the reloadLastBets to true and increment the countReload by one. */
    function reloadPrevBets() {
        if (countReload === 0) {
            setMainState("betsData", clearBetsData(betsData));
            updatePlayAreaState("reloadLastBets", true);
            updatePlayAreaState("countReload", countReload + 1);
        }
    }

    return (
        <div className={actionSectionStyle}> 
            {/* The below button is enabled if there is data in the lastBetData storage
            and the disableButtonEvents is false. */}
            <ActionButton className={
                lastBetDataArray.length === 0 || disableButtonEvents ? disabledButtonStyle : enabledButtonStyle
            } onClick={() => reloadPrevBets()}>
                <i className="fa-solid fa-rotate-right"></i>
            </ActionButton>
            <br/>

            <ActionButton className={
                enableButton === true ? enabledButtonStyle : disabledButtonStyle
            } onClick={() => doubleBets()}>x2</ActionButton>
            <br/>

            <ActionButton className={
                enableButton === true ? enabledButtonStyle : disabledButtonStyle
            } onClick={() => undoBets()}>
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </ActionButton>
            <br/>
            
            <ActionButton className={
                enableButton === true ? enabledButtonStyle : disabledButtonStyle
            } onClick={() => deleteBets()}>
                <i className="fa-solid fa-trash-can"></i>
            </ActionButton>
        </div>
    )
}


const actionSectionStyle = css`
    position: absolute;
    margin-left: 44em;
    margin-top: -21em;

    @media (max-width: 900px) {
        margin-left: 23em;
        margin-top: -31em;
    }

    @media (max-width: 600px) {
        margin-left: 8em;
        margin-top: -55em;
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