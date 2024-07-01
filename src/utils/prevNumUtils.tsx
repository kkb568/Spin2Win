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

/* The function is used to get the slice length for each number based on the frequency value
and the background color for each slice based on whether the value is hot value, cold value or neither. */
export function getSliceLengthAndColor(prevNumsArr: prevNumDataType[], 
    num: number,
    radius: number) {
    // Get the frequencies of each number from 0 to 36.
    const numFreqArr = getPrevNumFrequency(prevNumsArr);

    // Get the frequency for the specified num parameter value from the numFreqArr array.
    let freq: number = 0;
    numFreqArr.forEach((numFreq) => {
        if (num === numFreq.number) {
            freq = numFreq.frequency;
        }
    });

    // Initialise the full slice length that the slice can maximumly occupy.
    let fullSliceLength: number = 0;
    if (radius > 0) {
        fullSliceLength = radius - 10;
    }

    // Get the highest frequency value from the numFreArr array.
    const topFreqValue: number = numFreqArr.slice(0, 1)[0].frequency;
    // Initialise the sliceLength using the specified freq, fullSlicelength and topFreqValue values.
    let sliceLength = Math.floor((freq * fullSliceLength) / topFreqValue);

    /* If the sliceLength is not equal to zero or the highest frequency value,
    increase the sliceLength to 3/4 of the original sliceLength. 
    This is for compensating the visibility of the smaller slices, 
    especially when the topFreqValue is a higher value. */
    if (freq !== 0 && freq !== topFreqValue) {
        sliceLength += Math.floor(adjustLength(topFreqValue) * sliceLength);
    }

    // Set the default color to gray.
    let color: string = "#b3b3b3";
    // Get the top five and bottom five numbers from numFreqArr by the frequency value.
    const topFiveFreqArr = numFreqArr.slice(0, 5);
    const bottomFiveFreqArr = numFreqArr.slice(-5);
    
    // If the num value is present in the topFiveFreqArr array, set the color to yellow.
    topFiveFreqArr.forEach((numFreq) => {
        if (numFreq.number === num) {
            color = "#fff400";
        }
    })

    // If the num value is present in the bottomFiveFreqArr array, set the color to blue.
    bottomFiveFreqArr.forEach((numFreq) => {
        if (numFreq.number === num) {
            color = "#7eccff"
        }
    })

    // Return the sliceLength and color values in one object.
    return { sliceLength, color};
}

// The function is used to set the value for adjusting the sliceLength, depending on the maxFreq parameter value.
function adjustLength(maxFreq: number): number {
    let adjust = 0;

    switch (true) {
        case maxFreq === 2:
            adjust = .75;
            break;
        case maxFreq === 3:
            adjust = .3;
            break;
        case maxFreq === 4:
            adjust = .15;
            break;
        default:
            break;
    }

    return adjust;
}