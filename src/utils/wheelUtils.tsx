import { black, diamondRed, red, redNumbers, wheelSequence } from "../data/data";
import { betDataType } from "../data/dataTypes";

/*The function is used to set the rotation of the roulette wheel 
and returns the winning prize.*/
export function setRotation(ref: React.MutableRefObject<HTMLCanvasElement>) {
    let winningPrize: number = 0;
    // This is the angle degrees for each slice in the rotate wheel.
    const sliceDeg = 360/wheelSequence.length;

    // Create a random number for rotation between 5000 and 10000.
    const deg = Math.floor(5000 + Math.random() * 5000);
    // Style the ref with appropriate transform and transition.
    ref.current.style.transition = 'all 10s ease-in-out';
    ref.current.style.transform = `rotate(${deg}deg)`;

    return new Promise<number>((resolve, reject) => { 
        setTimeout(() => {
            // Get the actual degrees that the ref element will rotated by.
            const actualDeg = (deg % 360);
            ref.current.style.transition = 'none';
            ref.current.style.transform = `rotate(${actualDeg}deg)`;
            
            // Get the chosen number from the wheel.
            var index = Math.floor(((360 - actualDeg - 90) % 360) / sliceDeg);
            index = (wheelSequence.length + index) % wheelSequence.length; // This is used to fix any negative index value.
            const chosenNum = wheelSequence[index];
    
            // Get the winning prize based on the chosenNum value.
            winningPrize = getWinningPrize(chosenNum);
            resolve(winningPrize);
        }, 10000);
     })
}

/* The function is used to get the winning prize based on the chosen number 
from the wheel and the bets the user put into. */
function getWinningPrize(chosenNum: number): number {
    // Get the bets that the user put into.
    const betArray: betDataType[] = JSON.parse(sessionStorage.getItem("betsData"));
    let winningPrize = 0;

    // Loop through each bet data.
    betArray.forEach(bet => {
        if (typeof bet.betOn === "number") {
            // If the betOn type is number and is equal to the chosenNum, multiply the betValue by 36 and add to the winningPrize.
            if (bet.betOn === chosenNum) {
                const prize = bet.betValue * 36;
                winningPrize += prize;
            }
        } else {
            const prize = getPrizeByStringBetOn(bet.betOn, bet.betValue, chosenNum);
            winningPrize += prize;
        }
    });
    return winningPrize;
}

// The function is used to get the prize based on the betOn value if the value's type is a string.
function getPrizeByStringBetOn(betOn: string, 
    betValue: number, 
    chosenNum: number
): number{
    let prize: number = 0;
    switch (betOn) {
        case "1~12":
            if (checkNumRange(1, 12, chosenNum)) {
                prize = betValue * 3;
                break
            }
            break;
        case "13~24":
            if (checkNumRange(13, 24, chosenNum)) {
                prize = betValue * 3;
            }
            break;
        case "25~36":
            if (checkNumRange(25, 36, chosenNum)) {
                prize = betValue * 3;
            }
            break;
        case "low":
            if (checkNumRange(1, 18, chosenNum)) {
                prize = betValue * 2;
            }
            break;
        case "high":
            if (checkNumRange(19, 36, chosenNum)) {
                prize = betValue * 2;
            }
            break;
        case "even":
            if (checkEven(chosenNum)) {
                prize = betValue * 2;
            }
            break;
        case "odd":
            if (!checkEven(chosenNum)) {
                prize = betValue * 2;
            }
            break;
        case diamondRed:
            if (checkRedColor(chosenNum)) {
                prize = betValue * 2;
            }
            break;
        case black:
            if (!checkRedColor(chosenNum)) {
                prize = betValue * 2;
            }
            break;
        case `low ${red}`:
            if (checkNumRange(1, 18, chosenNum) && checkRedColor(chosenNum) ) {
                prize = betValue * 4;
            }
            break;
        case `high ${red}`:
            if (checkNumRange(19, 36, chosenNum) && checkRedColor(chosenNum) ) {
                prize = betValue * 4;
            }
            break;
        case `low ${black}`:
            if (checkNumRange(1, 18, chosenNum) && !checkRedColor(chosenNum) ) {
                prize = betValue * 4;
            }
            break;
        case `high ${black}`:
            if (checkNumRange(19, 36, chosenNum) && !checkRedColor(chosenNum) ) {
                prize = betValue * 4;
            }
            break;
        default:
            break;
    }
    return prize;
}

// The function is used to check if the chosenNum is between the min and max values.
function checkNumRange(min: number, 
    max: number,
    chosenNum: number
) {
    let correct: boolean = false;
    if (chosenNum >= min && chosenNum <= max) {
        correct = true;
        return correct;
    }
}

/* The function is used to check if the chosenNum is a value in the redNumbers array 
(indicating that the chosenNum was of a red color). */
function checkRedColor(chosenNum: number) {
    let correct: boolean = false;
    for (let i = 0; i < redNumbers.length; i++) {
        if (redNumbers[i] === chosenNum) {
            correct = true;
            break;
        }
    }
    return correct;
}

/* The function is used to check if the chosenNum is an even number or not. */
function checkEven(chosenNum: number) {
    let correct: boolean = false;
    if (chosenNum % 2 === 0) {
        correct = true;
    }
    return correct;
}