import { blackColors, redColors } from "../data/data";
import { prevNumDataType } from "../data/dataTypes";
import { checkEven, checkNumRange, checkRedColor } from "./wheelUtils";

/* The function is used to count the number of previous chosen nums' values 
(except for zero) that have the specified type parameter value's attribute. */
export function countPrevNumsByType( type: string ): number {
    const previousChosenNums: prevNumDataType[] = JSON.parse(sessionStorage.getItem("previousChosenNums"));
    let count: number = 0;

    previousChosenNums.forEach((num) => {
        if (num.value !== 0) {
            switch (type) {
                case "1~12":
                    if (checkNumRange(1, 12, num.value)) {
                        count++;
                    }
                    break;
                case "13~24":
                    if (checkNumRange(13, 24, num.value)) {
                        count++;
                    }
                    break;
                case "25~36":
                    if (checkNumRange(25, 36, num.value)) {
                        count++;
                    }
                    break;
                case `low ${redColors.normalRed}`:
                    if (checkNumRange(1, 18, num.value) && checkRedColor(num.value) ) {
                        count++;
                    }
                    break;
                case `high ${redColors.normalRed}`:
                    if (checkNumRange(19, 36, num.value) && checkRedColor(num.value) ) {
                        count++;
                    }
                    break;
                case `low ${blackColors.normalBlack}`:
                    if (checkNumRange(1, 18, num.value) && !checkRedColor(num.value) ) {
                        count++;
                    }
                    break;
                case `high ${blackColors.normalBlack}`:
                    if (checkNumRange(19, 36, num.value) && !checkRedColor(num.value) ) {
                        count++;
                    }
                    break;
                case "low":
                    if (checkNumRange(1, 18, num.value)) {
                        count++;
                    }
                    break;
                case "high":
                    if (checkNumRange(19, 36, num.value)) {
                        count++;
                    }
                    break;
                case "even":
                    if (checkEven(num.value)) {
                        count++;
                    }
                    break;
                case "odd":
                    if (!checkEven(num.value)) {
                        count++;
                    }
                    break;
                case "red":
                    if (checkRedColor(num.value)) {
                        count++;
                    }
                    break;
                case "black":
                    if (!checkRedColor(num.value)) {
                        count++;
                    }
                    break;
            }
        }
    })
    return count;
}

export function countZeroNums(): number {
    const previousChosenNums: prevNumDataType[] = JSON.parse(sessionStorage.getItem("previousChosenNums"));
    let count: number = 0;
    previousChosenNums.forEach((num) => {
        if (num.value === 0) {
            count++;
        }
    });
    return count;
}

// The function converts the count to percentage in relation to the total previous chosen numbers.
export function countInPercentage(count: number): number {
    const previousChosenNums: prevNumDataType[] = JSON.parse(sessionStorage.getItem("previousChosenNums"));
    // Get the total number of prevNums elements.
    const totalPrevNums = previousChosenNums.length;

    // Get the percentage of the dozenCount and use it as the width of the orange bar.
    const countPercentage = Math.round((count / totalPrevNums) * 100);
    return countPercentage;
}