import { firstRowNumbers, secondRowNumbers, thirdRowNumbers } from "../data/data";
import { arrayNum, prevNumDataType, rowNumFreqDataType } from "../data/dataTypes";

/* The function is used to get the number of times each number from 0 to 36
is selected from the previous chosen numbers from previous wheel spins. */
export function getPrevNumFrequency(prevNumsArr: prevNumDataType[]): rowNumFreqDataType[] {
    // Put all the row numbers into one array (including zero).
    const rowNumbers: arrayNum = [...firstRowNumbers, ...secondRowNumbers, ...thirdRowNumbers];
    rowNumbers.push(0);
    
    const rowNumFreqArr: rowNumFreqDataType[] = [];
    // Loop through each number in the rowNumbers array.
    rowNumbers.forEach((rowNum) => {
        // Initialise the count variable to zero.
        let count = 0;
        // For each previous number, if prevNum is equal to rowNum, increment the count by one.
        prevNumsArr.forEach((prevNum) => {
            if (rowNum === prevNum.value) {
                count++;
            }
        });

        // Push the rowNum and the count to the rowNumFreqArr array.
        rowNumFreqArr.push({
            number: rowNum,
            frequency: count
        })
    })

    // Sort the rowNumFreqArr in descending order of the frequency value.
    const sortedNumFreqArr = rowNumFreqArr.sort((a, b) => b.frequency - a.frequency);
    return sortedNumFreqArr;
}