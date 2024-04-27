import { redNumbers } from "../data/data";

/* Function for assigning the background color based on whether
it's on the redNumbers array or not. */
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