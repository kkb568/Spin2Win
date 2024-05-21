// Data types exports.
export type arrayNum = number[];
export type betOnType = string | number;
export type lastBetValueType = [boolean, number];

export interface redColorsType {
    diamondRed: string,
    normalRed: string
}

export interface chipDataType {
    id: number,
    chipUrl: string,
    chipName: string,
    chipValue: number,
    chipDetails: string,
    isSelected: boolean
}

export interface betDataType {
    betOn: number | string,
    betValue: number,
    ifPrevBet?: boolean
}

export interface playDataStoreType {
    chipUrl: string,
    enableButton: boolean,
    totalBet: number,
    ifSpinned: boolean,
    reloadLastBets: boolean,
    countReload?: number
}

export interface actionDataType {
    action: Action, 
    lastBetValueAdded: number, 
    betOn?: betOnType
}

export interface ChipContextType {
    getChipUrl: (() => void) | null,
    chipValue: number,
    setAction: ((set: boolean) => void) | null
    playDataStore: playDataStoreType,
    updateTotalBet: ((total: number) => void) | null,
    updateIfSpinned: ((value: boolean) => void) | null,
    updateReloadLastBets: ((value: boolean, count?: number) => void) | null
}

export interface MainDataStoreType {
    displayPayTable: string,
    displayWheel: string
}

export interface MainContextType {
    mainData: MainDataStoreType,
    setDisplay: ((key: string, value: string) => void) | null
}

export interface buttonStateType {
    selectedChip: boolean,
    showTotal: boolean
}

export interface actionChangeType {
    action: Action,
    betValueAdded: null | number
}

/* These are the types of actions that will occur, 
depending on the button clicked and the state of the button.
For example, clicking 'x2' button is for Double_Bets, 
clicking for the first time on any grid button is for Add_Bet
and clicking the same button again is for Add_BetValue. */
export enum Action {
    Add_Bet = "Add_Bet",
    Double_Bets = "Double_Bets",
    Add_BetValue = "Add_BetValue",
    Add_PrevBets = "Add_PrevBets",
    None = ""
}

export interface ActionData {
    action: Action,
    lastBetValueAdded: number | null, 
    betOn?: betOnType
}

export interface correctValueDataType {
    value: number,
    even_odd: string,
    low_high: string,
    red_black: string,
    dozenRange: string
}

export interface prevNumDataType {
    key: number,
    value: number
}