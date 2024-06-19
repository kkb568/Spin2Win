import { blackColors, redColors, redNumbers } from "../data/data";
import { chipDataType } from "../data/dataTypes";

/* Function for assigning the background color of the main playing buttons 
based on whether it's on the redNumbers array or not. */
export function assignBackgroundColor(num: number): string {
    let buttonColor: string = "";
    for (let i = 0; i < redNumbers.length; i++) {
        if (redNumbers[i] == num) {
            buttonColor = redColors.normalRed;
            break;
        } else {
            buttonColor = blackColors.normalBlack;
        }
    }
    return buttonColor;
}

/* The function is used to get the chip url which its isSelected value is true. 
Useful for showing which chip is selected by the user on the 
TopComponent buttons when hovered. */
export function getSelectedChipUrl(chipsArray: chipDataType[]): string {
    let url: string = "";
    
    for (let i = 0; i < chipsArray.length; i++) {
        if (chipsArray[i].isSelected === true) {
            url = chipsArray[i].chipUrl;
            break;
        }
    }
    return url;
}

/* The function is used to get the chip value 
of the chip which its 'isSelected' value is true. */
export function getSelectedChipValue(chipsArray: chipDataType[]): number {
    let value: number = 0;
    
    for (let i = 0; i < chipsArray.length; i++) {
        if (chipsArray[i].isSelected === true) {
            value = chipsArray[i].chipValue;
            break;
        }
    }
    return value;
}

// The function is used to get the chip url based on the chip value.
export function getChipUrlByValue(value: number, chipsArray: chipDataType[]): string {
    let url: string = "";
    
    for (let i = 0; i < chipsArray.length; i++) {
        if (chipsArray[i].chipValue === value) {
            url = chipsArray[i].chipUrl
        }
    }
    return url;
}

// The function is used to get the chip url based on the range in which the value lies on.
export function getChipUrlByValueRange(value: number, chipsArray: chipDataType[]): string {
    let url: string = "";
    
    switch (true) {
        case (value < 50):
            url = getChipUrlByValue(10, chipsArray)
            break;
        case (value < 100):
            url = getChipUrlByValue(50, chipsArray)
            break;
        case (value < 200):
            url = getChipUrlByValue(100, chipsArray)
            break;
        case (value < 400):
            url = getChipUrlByValue(200, chipsArray)
            break;
        case (value < 500):
            url = getChipUrlByValue(400, chipsArray)
            break;
        default:
            url = getChipUrlByValue(500, chipsArray)
    }

    return url;
}