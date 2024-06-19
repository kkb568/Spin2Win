// Data types exports.
export type arrayNum = number[];
export type playDataStateType = number | boolean | string | object;
export type betOnType = string | number;
export type lastBetValueType = [boolean, number];
export type updateButtonStateType = boolean | correctLastBets | string;

export interface redColorsType {
    diamondRed: string,
    normalRed: string
}

export interface blackColorsType {
    pureBlack: string,
    normalBlack: string
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

export interface actionDataType {
    action: Action, 
    lastBetValueAdded: number, 
    betOn?: betOnType
}

export interface playDataStoreType {
    chipUrl: string,
    chipsData: chipDataType[],
    enableButton: boolean,
    totalBet: number,
    ifSpinned: boolean,
    reloadLastBets: boolean,
    countReload: number,
    ifNumClicked: boolean,
    disableButtonEvents: boolean,
    disableFooterButtons: boolean
}

export interface ChipContextType {
    chipValue: number,
    playDataStore: playDataStoreType,
    updatePlayAreaState: ((key: string, value: playDataStateType) => void) | null
}

export interface MainDataStoreType {
    displayPayTable: string,
    displayWheel: string,
    displayStatistics: string
}

export interface MainContextType {
    mainData: MainDataStoreType,
    setDisplay: ((key: string, value: string) => void) | null
}

export interface buttonStateType {
    selectedChip: boolean,
    showTotal: boolean,
    correctLastBets: correctLastBets,
    correctHover?: boolean,
    showChessPiece?: boolean,
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
    numColor: string,
    dozenRange: string
}

export interface prevNumDataType {
    key: number,
    value: number
}

export interface correctLastBets {
    chipUrl: string,
    betOn: betOnType
}

export interface rowNumFreqDataType {
    number: number,
    frequency: number
}