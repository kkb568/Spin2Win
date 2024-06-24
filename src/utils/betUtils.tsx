import { blackColors, green, redColors } from "../data/data";
import { betDataType, betOnType, chipDataType, correctLastBets, lastBetValueType, prevNumDataType } from "../data/dataTypes";
import { getChipUrlByValueRange } from "./chipUtils";
import { checkEven, checkNumRange, checkRedColor } from "./wheelUtils";

// The function is used to add bet to the betDataArray array.
export function addBet(betOnParam: betOnType, betValueParam: number,
    betDataArray: betDataType[], prevBet?: boolean): betDataType[] {
    
    // The new bet data.
    const newBetData: betDataType = {
        betOn: betOnParam,
        betValue: betValueParam,
        ifPrevBet: prevBet
    }

    /* If the betsData is empty, push the new bet data to betDataArray. */
    if (betDataArray.length === 0) {
        betDataArray.push(newBetData);
        return betDataArray;
    }

    /* If the betsData is not empty and the betOn value exists in the betsData storage,
    update the betValue from the found bet and to the betDataArray. */
    for (let i = 0; i < betDataArray.length; i++) {
        if (betDataArray[i].betOn === betOnParam) {
            betDataArray[i].betValue += betValueParam;
            return betDataArray;
        }
    }

    /* If the betOn value does not exists but the betsData is not empty, 
    push the new bet to the bets array and update the betsData storage. */
    betDataArray.push(newBetData);
    return betDataArray;
}

// The function is used to get the total bet that the user has put for play.
export function getTotalBet(betDataArray: betDataType[]): number {
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
the range in which the total bet for the specified betOn value lies on. 
This is useful for showing the chip when user clicks on the button 
to represent the total bet for the specified button. */
export function getChipUrlByBet(betOn: betOnType, 
    chipsArray: chipDataType[],
    betDataArray: betDataType[]): string {
    let url: string = "";
    const totalBet: number = getBetByBetOn(betOn, betDataArray);
    
    // If the totalBet is equal to zero, return the url as an empty string.
    if (totalBet === 0) {
        return url;
    }

    // Get the url from the getChipUrlByValueRange function.
    url = getChipUrlByValueRange(totalBet, chipsArray);
    return url;
}

// This function is used to get the total bet for the specified betOn value.
export function getBetByBetOn(betOn: betOnType, betDataArray: betDataType[]): number {
    let totalBet: number = 0;
    
    for (let i = 0; i < betDataArray.length; i++) {
        if (betDataArray[i].betOn === betOn) {
            totalBet = betDataArray[i].betValue;
            break;
        }
    }
    return totalBet;
}

/* The function is used to clear all bet elements in the betsDataArray. 
It's called when the delete button is clicked. */
export function clearBetsData(betDataArray: betDataType[]): betDataType[] {
    // Pop every element as long as the array length is not equal to zero.
    while (betDataArray.length > 0) {
        betDataArray.pop()
    }
    return betDataArray;
}

/* The function is used to double all the betValues for all of the betDataArray elements. 
It's called when the 'x2' button is clicked. */
export function doubleBetValue(betDataArray: betDataType[]): betDataType[] {
    for (let i = 0; i < betDataArray.length; i++) {
        betDataArray[i].betValue *= 2;
    }
    return betDataArray;
}

// The function is used to remove the last bet from the betArray and update it to betsData storage.
export function removeBet(betArray: betDataType[]): betDataType[] {
    betArray.pop();
    return betArray;
}

// The function is used to divide each betValue by 2.
export function divideBetByTwo(betArray: betDataType[]): betDataType[] {
    for (let i = 0; i < betArray.length; i++) {
        betArray[i].betValue /= 2;
    }
    return betArray;
}

/* The function is used to subtract the betValue
of the element which its betOn value is equal to the betOn parameter 
(so as to get which bet was added last) by the value parameter. */
export function removeBetValue(betArray: betDataType[], value: number, betOn: betOnType)
: betDataType[] {
    for (let i = 0; i < betArray.length; i++) {
        if (betArray[i].betOn === betOn) {
            betArray[i].betValue -= value;
            break;
        }
    }
    return betArray;
}

/* The function is used to remove all bets in which its ifPrevBet value
is true (indicating that it was a bet from previous play). */
export function removePrevBets(betArray: betDataType[], betsNum: number): betDataType[] {
    for (let i = 0; i < betArray.length; i++) {
        if (betArray[i].ifPrevBet) {
            betArray.splice(i, betsNum);
        }
    }
    return betArray;
}

/*The function is used to count the number of bets in which its ifPrevBet
value is true (indicating that they were previous bets from the last play done). */
export function countPrevBets(betArray: betDataType[]): number {
    let count: number = 0;

    for (let i = 0; i < betArray.length; i++) {
        if (betArray[i].ifPrevBet) {
            count++;
        }
    }
    return count;
}

/*The function is used to push all the bets in the betsData storage
to the lastBetData storage. The function is called when the PlayButton is clicked. */
export function addLastBetData(betDataArray: betDataType[], lastBetDataArray: betDataType[]): betDataType[] {
    betDataArray.forEach((bet) => {
        const lastBet: betDataType = {
            betOn: bet.betOn,
            betValue: bet.betValue
        }
        lastBetDataArray.push(lastBet);
    });
    return lastBetDataArray;
}

/* The function is used to check if the betOn value is in any 
of the data in the lastBetData storage. */
export function checkValueFromLastBet(betOnValue: betOnType, lastBetDataArray: betDataType[]) {
    let returnValue: lastBetValueType = [false, null]

    lastBetDataArray.forEach((bet) => {
        if (bet.betOn === betOnValue) {
            returnValue = [true, bet.betValue]
            return returnValue;
        }
    })
    return returnValue;
}

/* The function is used to clear all the last bets, if any. 
It's called when the PlayButton is clicked. */
export function clearLastBets(lastBetDataArray: betDataType[]): betDataType[] {
    if (lastBetDataArray.length > 0) {
        while (lastBetDataArray.length > 0) {
            lastBetDataArray.pop();
        }
    }
    return lastBetDataArray;
}

/* The function is used to get the details of the correct last bets, useful for 
showing the chip which the user put as last bet and was correct in relation to 
the last chosen number from wheel spin functionality. */
export function getCorrectLastBetsDetails(betOn: betOnType, chipsData: chipDataType[],
    lastBetDataArray: betDataType[], previousChosenNums: prevNumDataType[]
): correctLastBets {
    let correctLastBets: correctLastBets = {
        chipUrl: "",
        betOn: ""
    };
    const correctLastBetsArr: correctLastBets[] = [];

    // If either of the arrays are empty, return the expected values as empty strings.
    if (previousChosenNums.length === 0 || lastBetDataArray.length === 0) {
        return correctLastBets;
    }

    // Loop through all bets from the lastBetsDataArray.
    lastBetDataArray.forEach((bet: betDataType) => {
        // Get the last chosen previous number.
        const lastPrevChosenNum = previousChosenNums[0].value;
        
        // Update the correctLastBets based on the betOn value and if the respective function returns true.
        switch (bet.betOn) {
            case "1~12":
                if (checkNumRange(1, 12, lastPrevChosenNum)) {
                    correctLastBets = {
                        chipUrl: getChipUrlByValueRange(bet.betValue, chipsData),
                        betOn: bet.betOn
                    };
                    correctLastBetsArr.push(correctLastBets);
                }
                break;
            case "13~24":
                if (checkNumRange(13, 24, lastPrevChosenNum)) {
                    correctLastBets = {
                        chipUrl: getChipUrlByValueRange(bet.betValue, chipsData),
                        betOn: bet.betOn
                    };
                    correctLastBetsArr.push(correctLastBets);
                }
                break;
            case "25~36":
                if (checkNumRange(25, 36, lastPrevChosenNum)) {
                    correctLastBets = {
                        chipUrl: getChipUrlByValueRange(bet.betValue, chipsData),
                        betOn: bet.betOn
                    };
                    correctLastBetsArr.push(correctLastBets);
                }
                break;
            case "low":
                if (checkNumRange(1, 18, lastPrevChosenNum)) {
                    correctLastBets = {
                        chipUrl: getChipUrlByValueRange(bet.betValue, chipsData),
                        betOn: bet.betOn
                    };
                    correctLastBetsArr.push(correctLastBets);
                }
                break;
            case "high":
                if (checkNumRange(19, 36, lastPrevChosenNum)) {
                    correctLastBets = {
                        chipUrl: getChipUrlByValueRange(bet.betValue, chipsData),
                        betOn: bet.betOn
                    };
                    correctLastBetsArr.push(correctLastBets);
                }
                break;
            case "even":
                if (checkEven(lastPrevChosenNum)) {
                    correctLastBets = {
                        chipUrl: getChipUrlByValueRange(bet.betValue, chipsData),
                        betOn: bet.betOn
                    };
                    correctLastBetsArr.push(correctLastBets);
                }
                break;
            case "odd":
                if (!checkEven(lastPrevChosenNum)) {
                    correctLastBets = {
                        chipUrl: getChipUrlByValueRange(bet.betValue, chipsData),
                        betOn: bet.betOn
                    };
                    correctLastBetsArr.push(correctLastBets);
                }
                break;
            case redColors.diamondRed:
                if (checkRedColor(lastPrevChosenNum)) {
                    correctLastBets = {
                        chipUrl: getChipUrlByValueRange(bet.betValue, chipsData),
                        betOn: bet.betOn
                    };
                    correctLastBetsArr.push(correctLastBets);
                }
                break;
            case blackColors.normalBlack:
                if (!checkRedColor(lastPrevChosenNum)) {
                    correctLastBets = {
                        chipUrl: getChipUrlByValueRange(bet.betValue, chipsData),
                        betOn: bet.betOn
                    };
                    correctLastBetsArr.push(correctLastBets);
                }
                break;
            case `low ${redColors.normalRed}`:
                if (checkNumRange(1, 18, lastPrevChosenNum) && checkRedColor(lastPrevChosenNum) ) {
                    correctLastBets = {
                        chipUrl: getChipUrlByValueRange(bet.betValue, chipsData),
                        betOn: bet.betOn
                    };
                    correctLastBetsArr.push(correctLastBets);
                }
                break;
            case `high ${redColors.normalRed}`:
                if (checkNumRange(19, 36, lastPrevChosenNum) && checkRedColor(lastPrevChosenNum) ) {
                    correctLastBets = {
                        chipUrl: getChipUrlByValueRange(bet.betValue, chipsData),
                        betOn: bet.betOn
                    };
                    correctLastBetsArr.push(correctLastBets);
                }
                break;
            case `low ${blackColors.normalBlack}`:
                if (checkNumRange(1, 18, lastPrevChosenNum) && !checkRedColor(lastPrevChosenNum) ) {
                    correctLastBets = {
                        chipUrl: getChipUrlByValueRange(bet.betValue, chipsData),
                        betOn: bet.betOn
                    };
                    correctLastBetsArr.push(correctLastBets);
                }
                break;
            case `high ${blackColors.normalBlack}`:
                if (checkNumRange(19, 36, lastPrevChosenNum) && !checkRedColor(lastPrevChosenNum) ) {
                    correctLastBets = {
                        chipUrl: getChipUrlByValueRange(bet.betValue, chipsData),
                        betOn: bet.betOn
                    };
                    correctLastBetsArr.push(correctLastBets);
                }
                break;
            case green:
                if (lastPrevChosenNum === 0) {
                    correctLastBets = {
                        chipUrl: getChipUrlByValueRange(bet.betValue, chipsData),
                        betOn: bet.betOn
                    };
                    correctLastBetsArr.push(correctLastBets);
                }
                break;
            default:
                correctLastBets = {
                    chipUrl: "",
                    betOn: ""
                }
                break;
        }
    });

    correctLastBetsArr.forEach((correctBet) => {
        if (correctBet.betOn === betOn) {
            correctLastBets = correctBet;
            return correctLastBets;
        }
    })

    return correctLastBets;
}