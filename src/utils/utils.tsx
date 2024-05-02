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
playing area buttons when hovered. */
export function getSelectedChipUrl(): string {
    let url: string ="";
    const chipsArray: chipDataType[] = JSON.parse(sessionStorage.getItem("chipsData") || '{}')
    for (let i = 0; i < chipsArray.length; i++) {
        if (chipsArray[i].isSelected === true) {
            url = chipsArray[i].chipUrl;
            break;
        }
    }
    return url;
}