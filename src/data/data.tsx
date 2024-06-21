import { getSelectedChipUrl, getSelectedChipValue } from "../utils/chipUtils"
import { Action, ActionData, ChipContextType, MainContextType, arrayNum, blackColorsType, chipDataType, correctValueDataType, redColorsType } from "./dataTypes"

// Data exports
export const firstRowNumbers: arrayNum  = [3,6,9,12,15,18,21,24,27,30,33,36]
export const secondRowNumbers: arrayNum  = [2,5,8,11,14,17,20,23,26,29,32,35]
export const thirdRowNumbers: arrayNum  = [1,4,7,10,13,16,19,22,25,28,31,34]
export const redNumbers: arrayNum = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]
export const wheelSequence: arrayNum = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26]

export const backgroundImageUrl: string = "https://virtual-games.virtustec.com/desktop-v4/default/spin2win-background-royale.b173736335143c77aa0c.png"
export const lionIconsUrl: string = "https://virtual-games.virtustec.com/desktop-v4/default/spin2win-royale-lion.c24f2de95fb5e09bb485.svg"
export const howToPlayUrl: string = "https://virtual-games.virtustec.com/desktop-v4/default/assets/rules/en-GB/casinogame/how_to_play_casinogame_spin2win_deluxe_en-GB.pdf"

export const green: string = "#4a8c02";
export const redColors: redColorsType = {
    diamondRed: "#ff001f",
    normalRed: "#d0021b"
}
export const blackColors: blackColorsType = {
    pureBlack: "#000",
    normalBlack: "#1f1f1f"
}

export const chipsStore: chipDataType[] = [
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

export const topGridButtons: {
    key: number,
    name: string,
    backgroundColor: string
}[] = [
    {
        key: 1,
        name: "low",
        backgroundColor: redColors.normalRed
    },
    {
        key: 2,
        name: "high",
        backgroundColor: redColors.normalRed
    },
    {
        key: 3,
        name: "low",
        backgroundColor: blackColors.normalBlack
    },
    {
        key: 4,
        name: "high",
        backgroundColor: blackColors.normalBlack
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

export const playAreaContext: ChipContextType = {
    playDataStore: {
        chipValue: getSelectedChipValue(chipsStore),
        chipUrl: getSelectedChipUrl(chipsStore),
        chipsData: chipsStore,
        actionsData: actionArray,
        lastBetData: [],
        enableButton: false,
        totalBet: 0,
        ifSpinned: false,
        reloadLastBets: false,
        countReload: 0,
        ifNumClicked: false,
        disableButtonEvents: false,
        disableFooterButtons: false
    },
    updatePlayAreaState: null
}

// This is used to store the details of the chosen value from the wheel spin.
/**
 * 1. value: The chosen value from the spin wheel functionality.
 * 2. even_odd: If the value is even or odd number.
 * 3. low_high: If the value is low (between 1 and 18) or high (between 19 and 36).
 * 4. numColor: If the value is from redNumbers array (having red background color - "red") or not "black".
 *      If the value is zero, the numColor will be the green hex value.
 * 5. dozenRange: The dozen range in which the value lies.
 */
const initialCorrectValueData: correctValueDataType = {
    value: null,
    even_odd: "",
    low_high: "",
    numColor: "",
    dozenRange: ""
}

export const AppContext: MainContextType = {
    mainData: {
        displayPayTable: "none",
        displayWheel: "hidden",
        displayStatistics: "none",
        betsData: [],
        previousChosenNums: [],
        correctValueData: initialCorrectValueData
    },
    setMainState: null
}