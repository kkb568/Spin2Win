import { Action, ActionData, arrayNum, betDataType, chipDataType } from "./dataTypes"

// Data exports
export const firstRowNumbers: arrayNum  = [3,6,9,12,15,18,21,24,27,30,33,36]
export const secondRowNumbers: arrayNum  = [2,5,8,11,14,17,20,23,26,29,32,35]
export const thirdRowNumbers: arrayNum  = [1,4,7,10,13,16,19,22,25,28,31,34]
export const redNumbers: arrayNum = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]
export const wheelSequence = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26]

export const backgroundImageUrl: string = "https://virtual-games.virtustec.com/desktop-v4/default/spin2win-background-royale.b173736335143c77aa0c.png"
export const lionIconsUrl: string = "https://virtual-games.virtustec.com/desktop-v4/default/spin2win-royale-lion.c24f2de95fb5e09bb485.svg"
export const howToPlayUrl: string = "https://virtual-games.virtustec.com/desktop-v4/default/assets/rules/en-GB/casinogame/how_to_play_casinogame_spin2win_deluxe_en-GB.pdf"

export const green: string = "#4a8c02";
export const red: string = "#d0021b";
export const diamondRed: string = "#ff001f";
export const black: string = "#1f1f1f";

const chipData: chipDataType[] = [
    {
        id: 1,
        chipUrl: "https://virtual-games.virtustec.com/desktop-v4/default/assets/images/spin2win/chips/spin2win-chip-purple.svg",
        chipName: "Purple chip",
        chipValue: 500,
        chipDetails: "Ksh500",
        isSelected: false
    },
    {
        id: 2,
        chipUrl: "https://virtual-games.virtustec.com/desktop-v4/default/assets/images/spin2win/chips/spin2win-chip-black.svg",
        chipName: "Black chip",
        chipValue: 400,
        chipDetails: "Ksh400",
        isSelected: false
    },
    {
        id: 3,
        chipUrl: "https://virtual-games.virtustec.com/desktop-v4/default/assets/images/spin2win/chips/spin2win-chip-orange.svg",
        chipName: "Orange chip",
        chipValue: 200,
        chipDetails: "Ksh200",
        isSelected: false
    },
    {
        id: 4,
        chipUrl: "https://virtual-games.virtustec.com/desktop-v4/default/assets/images/spin2win/chips/spin2win-chip-green.svg",
        chipName: "Green chip",
        chipValue: 100,
        chipDetails: "Ksh100",
        isSelected: false
    },
    {
        id: 5,
        chipUrl: "https://virtual-games.virtustec.com/desktop-v4/default/assets/images/spin2win/chips/spin2win-chip-red.svg",
        chipName: "Red chip",
        chipValue: 50,
        chipDetails: "Ksh50",
        isSelected: false
    },
    {
        id: 6,
        chipUrl: "https://virtual-games.virtustec.com/desktop-v4/default/assets/images/spin2win/chips/spin2win-chip-blue.svg",
        chipName: "Blue chip",
        chipValue: 10,
        chipDetails: "Ksh10",
        isSelected: true
    }
]
sessionStorage.setItem("chipsData", JSON.stringify(chipData))

const betData: betDataType[] | [] = []
sessionStorage.setItem("betsData", JSON.stringify(betData))

export const topGridButtons: {
    key: number,
    name: string,
    backgroundColor: string
}[] = [
    {
        key: 1,
        name: "low",
        backgroundColor: red
    },
    {
        key: 2,
        name: "high",
        backgroundColor: red
    },
    {
        key: 3,
        name: "low",
        backgroundColor: black
    },
    {
        key: 4,
        name: "high",
        backgroundColor: black
    },
]

export const dozenGridButtons: {
    key: number,
    name: string,
}[] = [
    {
        key: 1,
        name: "1~12"
    },
    {
        key: 2,
        name: "13~24"
    },
    {
        key: 3,
        name: "25~36"
    }
]

/* The array is used to store the action that occurred, 
the last bet value added and on which bet was the value is added. */ 
const actionArray: ActionData[] = [
    {
        action: Action.None,
        lastBetValueAdded: null,
        betOn: "",
    }
]
sessionStorage.setItem("actionData", JSON.stringify(actionArray));