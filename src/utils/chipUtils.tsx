import { chipDataType, redNumbers } from "../data/data";

/* Function for assigning the background color of the main playing buttons 
based on whether it's on the redNumbers array or not. */
export function assignBackgroundColor(num: number): string {
    let buttonColor: string = "";
    for (let i = 0; i < redNumbers.length; i++) {
        if (redNumbers[i] == num) {
            buttonColor = "#d0021b";
            break;
        } else {
            buttonColor = "#1f1f1f";
        }
    }
    return buttonColor;
}

/* The function is used to get the chip url which its isSelected value is true. 
Useful for showing which chip is selected by the user on the 
TopComponent buttons when hovered. */
export function getSelectedChipUrl(): string {
    let url: string = "";
    const chipsArray: chipDataType[] = JSON.parse(sessionStorage.getItem("chipsData") || '{}')
    
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
export function getSelectedChipValue(): number {
    let value: number = 0;
    const chipsArray: chipDataType[] = JSON.parse(sessionStorage.getItem("chipsData") || '{}')
    
    for (let i = 0; i < chipsArray.length; i++) {
        if (chipsArray[i].isSelected === true) {
            value = chipsArray[i].chipValue;
            break;
        }
    }
    return value;
}

// The function is used to get the chip url based on the chip value.
export function getChipUrlByValue(value: number): string {
    let url: string = "";
    const chipsArray: chipDataType[] = JSON.parse(sessionStorage.getItem("chipsData") || '{}')
    
    for (let i = 0; i < chipsArray.length; i++) {
        if (chipsArray[i].chipValue === value) {
            url = chipsArray[i].chipUrl
        }
    }
    return url;
}