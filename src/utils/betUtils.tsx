import { betDataType, betOnType } from "../data/dataTypes";
import { getChipUrlByValue } from "./chipUtils";

// The function is used to add bet to the betsData session storage.
export function addBet(betOnParam: betOnType, betValueParam: number) {
    // Get the bets array from the betsData storage.
    const betDataArray: betDataType[] | any[] = JSON.parse(sessionStorage.getItem("betsData") || '{}');
    
    // The new bet data.
    let newBetData: betDataType = {
        betOn: betOnParam,
        betValue: betValueParam
    }

    /* If the betsData is empty, push the new bet data to bets array 
    and store the array to betsData storage. */
    if (betDataArray.length === 0) {
        betDataArray.push(newBetData)
        sessionStorage.setItem("betsData", JSON.stringify(betDataArray));
        return;
    }

    /* If the betsData is not empty, if the betOn value exists in the betsData storage,
    update the betValue from the found bet and to the betsData storage. */
    for (let i = 0; i < betDataArray.length; i++) {
        if (betDataArray[i].betOn === betOnParam) {
            betDataArray[i].betValue += betValueParam;
            sessionStorage.setItem("betsData", JSON.stringify(betDataArray));
            return;
        }
    }

    /* If the betOn value does not exists, push the new bet to the bets array
    and update the betsData storage. */
    betDataArray.push(newBetData);
    sessionStorage.setItem("betsData", JSON.stringify(betDataArray));
}

// The function is used to get the total bet that the user has put for play.
export function getTotalBet(): number {
    // Get the bets array from the betsData storage.
    const betDataArray: betDataType[] | any[] = JSON.parse(sessionStorage.getItem("betsData") || '{}');

    // If the array length is 0, return the totalBet as 0
    let totalBet: number = 0;
    if (betDataArray.length === 0) {
        return totalBet;
    }

    // If array length is greater than 0, sum up all of the betValues for each betDatArray element.
    for (let i = 0; i < betDataArray.length; i++) {
        totalBet += betDataArray[i].betValue
    }
    return totalBet;
}

/* The function is used to get the chip image based on 
the range in which the total bet for the specific betOn value lies on. 
This is useful for showing the chip when user clicks on the button 
to represent the total bet for the specified button. */
export function getChipUrlByBet(betOn: betOnType): string {
    let url: string = "";
    const totalBet = getBetByBetOn(betOn);
    
    // If the totalBet is equal to zero, return the url as an empty string.
    if (totalBet === 0) {
        return url;
    }

    switch (true) {
        case (totalBet < 50):
            url = getChipUrlByValue(10)
            break;
        case (totalBet < 100):
            url = getChipUrlByValue(50)
            break;
        case (totalBet < 200):
            url = getChipUrlByValue(100)
            break;
        case (totalBet < 400):
            url = getChipUrlByValue(200)
            break;
        case (totalBet < 500):
            url = getChipUrlByValue(400)
            break;
        default:
            url = getChipUrlByValue(500)
    }
    return url;
}

// This function is used to get the total bet for the specified betOn value.
export function getBetByBetOn(betOn: betOnType): number {
    // Get the bets array from the betsData storage.
    const betDataArray: betDataType[] = JSON.parse(sessionStorage.getItem("betsData") || '{}');
    let totalBet: number = 0;
    
    for (let i = 0; i < betDataArray.length; i++) {
        if (betDataArray[i].betOn === betOn) {
            totalBet = betDataArray[i].betValue;
            break;
        }
    }
    return totalBet;
}

/* The function is used to clear all bet elements in the betsData storage. 
It's called when the delete button is clicked. */
export function clearBetsData() {
    const betDataArray: betDataType[] = JSON.parse(sessionStorage.getItem("betsData") || '{}');

    // Pop every element as long as the array length is not equal to zero.
    while (betDataArray.length > 0) {
        betDataArray.pop()
    }
    sessionStorage.setItem("betsData", JSON.stringify(betDataArray));
}

/* The function is used to double all the betValues for all of the betDataArray elements. 
It's called when the 'x2' button is clicked. */
export function doubleBetValue() {
    const betDataArray: betDataType[] = JSON.parse(sessionStorage.getItem("betsData") || '{}');

    for (let i = 0; i < betDataArray.length; i++) {
        betDataArray[i].betValue *= 2;
    }
    sessionStorage.setItem("betsData", JSON.stringify(betDataArray));
}