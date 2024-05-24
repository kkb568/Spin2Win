import { Action, actionDataType, betDataType, betOnType } from "../data/dataTypes";
import { countPrevBets, divideBetByTwo, removeBet, removeBetValue, removePrevBets } from "./betUtils";

/* The function is used to set the action for the clicked button in the any of the grid buttons. 
If the button was clicked more than once, the action is "Add_BetValue", 
otherwise, the action is "Add_Bet" or "Add_PrevBets", depending on the redoBets value. */
export function getGridButtonAction(betOnValue: betOnType, redoBets?: boolean) {
    const betDataArray: betDataType[] = JSON.parse(sessionStorage.getItem("betsData") || '{}');
    let action: Action;

    for (let i = 0; i < betDataArray.length; i++) {
        if (betDataArray[i].betOn === betOnValue) {
            action = Action.Add_BetValue;
            return action;
        }
    }

    /* If redoBets is true (meaning the added bets where 
        from the previous play), the action should be "Add_PrevBets",
        otherwise, the action should be "Add_Bet". */
    if (redoBets) {
        action = Action.Add_PrevBets;
    } else {
        action = Action.Add_Bet;
    }
    return action; 
}

// The function is used to add an action to the actionData array.
export function addAction(
    action: Action,
    lastBetValueAdded: number | null,
    betOn?: betOnType
){
        const newActionData: actionDataType = {
            action: action,
            lastBetValueAdded: lastBetValueAdded,
            betOn:betOn
        }
        const actionArray: actionDataType[] = JSON.parse(sessionStorage.getItem("actionData") || '{}');
        actionArray.push(newActionData)
        sessionStorage.setItem("actionData", JSON.stringify(actionArray));
}

/* The function is used to undo the bets done by the user 
when the back action is clicked. */
export function undoBetAction() {
    const actionArray: actionDataType[] = JSON.parse(sessionStorage.getItem("actionData") || '{}');
    const betDataArray: betDataType[] = JSON.parse(sessionStorage.getItem("betsData") || '{}');

    const actionArrayLength = actionArray.length;
    // Count the number of bets from the previous play.
    const prevBetsCount: number = countPrevBets(betDataArray);

    // If the array length is equal to one, stop the functionality.
    if (actionArrayLength === 1) {
        return;
    }
    
    // Get the respective values of the last action done by the user (last element of the actionArray).
    const { 
        action, 
        lastBetValueAdded, 
        betOn 
    } = actionArray[actionArrayLength - 1];

    // Call the respective reverse function based on the action value.
    switch (action) {
        case Action.Add_Bet:
            removeBet(betDataArray);
            break;
        case Action.Double_Bets:
            divideBetByTwo(betDataArray);
            break;
        case Action.Add_BetValue:
            removeBetValue(betDataArray, lastBetValueAdded, betOn)
            break;
        case Action.Add_PrevBets:
            removePrevBets(betDataArray, prevBetsCount);
            removePrevActions(actionArray, prevBetsCount);
            break;
    }

    /* If the action is not equal to "Add_PrevBets" (so as to prevent further
    removal of actions from the actionData after all the actions with "Add_PrevBets" are removed),
    remove only the last element from the actionArray and update the array to the actionData storage. */
    if (action !== Action.Add_PrevBets) {
        actionArray.pop();
        sessionStorage.setItem("actionData", JSON.stringify(actionArray));
    }
}

/* The function is used to remove all the actions data which its action value
is equal to "Add_PrevBets" and then store the array to the actionData storage */
function removePrevActions(actionArray: actionDataType[], actionsNum: number) {
    for (let i = 0; i < actionArray.length; i++) {
        if (actionArray[i].action === Action.Add_PrevBets) {
            actionArray.splice(i, actionsNum);
            sessionStorage.setItem("actionData", JSON.stringify(actionArray));
            return;
        }
    }
}

// The function clears all the actions that the user did on the playing area.
export function clearUserActions() {
    const actionArray: actionDataType[] = JSON.parse(sessionStorage.getItem("actionData") || '{}');
    while (actionArray.length > 1) {
        actionArray.pop();
    }
    sessionStorage.setItem("actionData", JSON.stringify(actionArray));
}