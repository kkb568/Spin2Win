import { Action, actionDataType, betDataType, betOnType } from "../data/dataTypes";

/* The function is used to set the action for the clicked button in the any of the grid buttons. 
If the button was clicked more than once, the action is "Add_BetValue", 
otherwise, the action is "Add_Bet". */
export function getGridButtonAction(betOnValue: betOnType, redoBets?: boolean) {
    const betDataArray: betDataType[] = JSON.parse(sessionStorage.getItem("betsData") || '{}');
    let action: Action;

    for (let i = 0; i < betDataArray.length; i++) {
        if (betDataArray[i].betOn === betOnValue) {
            action = Action.Add_BetValue;
            return action;
        }
    }

    if (redoBets) {
        action = Action.Add_PrevBets;
    } else {
        action = Action.Add_Bet;
    }
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
    // Count the number of bets from the previous play.
    const prevBetsCount: number = countPrevBets(betDataArray);

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
        case Action.Add_PrevBets:
            removePrevBets(betDataArray, prevBetsCount);
            removePrevActions(actionArray, prevBetsCount);
            break;
    }

    /* If the action is not equal to "Add_PrevBets" (so as to prevent further
    removal of actions from the actionData after all the actions with "Add_PrevBets" are removed),
    remove the last element from the actionArray and update the array to the actionData storage. */
    if (action !== Action.Add_PrevBets) {
        actionArray.pop();
        sessionStorage.setItem("actionData", JSON.stringify(actionArray));
    }
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

/* The function is used to remove all bets in which its ifPrevBet value
is true (indicating that it was a bet from previous play). */
function removePrevBets(betArray: betDataType[], betsNum: number) {
    for (let i = 0; i < betArray.length; i++) {
        if (betArray[i].ifPrevBet) {
            betArray.splice(i, betsNum);
        }
    }
    sessionStorage.setItem("betsData", JSON.stringify(betArray));
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

/*The function is used to count the number of bets in which its ifPrevBet
value is true (indicating that they were previous bets from the last play done). */
function countPrevBets(betArray: betDataType[]): number {
    let count: number = 0;

    for (let i = 0; i < betArray.length; i++) {
        if (betArray[i].ifPrevBet) {
            count++;
        }
    }
    return count;
}

// The function clears all the actions that the user did on the playing area.
export function clearUserActions() {
    const actionArray: actionDataType[] = JSON.parse(sessionStorage.getItem("actionData") || '{}');
    while (actionArray.length > 1) {
        actionArray.pop();
    }
    sessionStorage.setItem("actionData", JSON.stringify(actionArray));
}