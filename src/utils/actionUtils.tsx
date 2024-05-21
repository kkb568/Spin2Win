import { Action, actionDataType, betDataType, betOnType } from "../data/dataTypes";

/* The function is used to set the action for the clicked button in the any of the grid buttons. 
If the button was clicked more than once, the action is "Add_BetValue", 
otherwise, the action is "Add_Bet". */
export function getGridButtonAction(betOnValue: betOnType) {
    const betDataArray: betDataType[] = JSON.parse(sessionStorage.getItem("betsData") || '{}');
    let action: Action;

    for (let i = 0; i < betDataArray.length; i++) {
        if (betDataArray[i].betOn === betOnValue) {
            action = Action.Add_BetValue;
            return action;
        }
    }
    action = Action.Add_Bet;
    return action; 
}

// The function is used to add an action to the actionData array.
export function addAction(action: Action,
    lastBetValueAdded: number | null,
    betOn?: betOnType) {
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
    // If the array length is equal to one, stop the functionality.
    if (actionArrayLength === 1) {
        return;
    }
    // Get the respective values of the last action done by the user (last element of the actionArray).
    const { action, lastBetValueAdded, betOn } = actionArray[actionArrayLength - 1];

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
    }
    // Remove the last element of the actionArray and then update it to the actionData storage.
    actionArray.pop();
    sessionStorage.setItem("actionData", JSON.stringify(actionArray));
}

// The function is used to remove the last bet from the betArray and update it to betsData storage.
function removeBet(betArray: betDataType[]) {
    betArray.pop();
    sessionStorage.setItem("betsData", JSON.stringify(betArray));
}

// The function is used to divide each betValue by 2.
function divideBetByTwo(betArray: betDataType[]) {
    for (let i = 0; i < betArray.length; i++) {
        betArray[i].betValue /= 2;
    }
    sessionStorage.setItem("betsData", JSON.stringify(betArray));
}

/* The function is used to subtract the betValue
of the element which its betOn value is equal to the betOn parameter 
(so as to get which bet was added last) by the value parameter. */
function removeBetValue(betArray: betDataType[], value: number, betOn: betOnType) {
    for (let i = 0; i < betArray.length; i++) {
        if (betArray[i].betOn === betOn) {
            betArray[i].betValue -= value;
            break;
        }
    }
    sessionStorage.setItem("betsData", JSON.stringify(betArray));
}

// The function clears all the actions that the user did on the playing area.
export function clearUserActions() {
    const actionArray: actionDataType[] = JSON.parse(sessionStorage.getItem("actionData") || '{}');
    while (actionArray.length > 1) {
        actionArray.pop();
    }
    sessionStorage.setItem("actionData", JSON.stringify(actionArray));
}