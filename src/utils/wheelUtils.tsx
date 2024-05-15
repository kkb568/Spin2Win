import { wheelSequence } from "../data/data";
import { arrayNum } from "../data/dataTypes";

export function setRotation(ref: React.MutableRefObject<HTMLUListElement>) {
    // Create a random number for rotation.
    const deg = Math.floor(5000 + Math.random() * 5000);
    // Style the ref with appropriate tarnsform and transition.
    ref.current.style.transition = 'all 10s ease-in-out';
    ref.current.style.transform = `rotate(${deg}deg)`;
    
    const interval = setInterval(() => {
        const itemAngle = 360 / wheelSequence.length;
        let rotateAngle = itemAngle;
        while (rotateAngle < deg) {
            console.log(getChosenNumber(ref, rotateAngle));
            rotateAngle += itemAngle;
        }
    }, (deg/10000))

    setTimeout(() => {
        // Get the actual degrees that the ref element will rotated by.
        const actualDeg = deg % 360;
        ref.current.style.transition = 'none';
        ref.current.style.transform = `rotate(${actualDeg}deg)`
        alert(getChosenNumber(ref, actualDeg));
        clearInterval(interval);
    }, 10000);
}

// The function is used to get the chosen number from the wheel spin.
export function getChosenNumber(
    ref: React.MutableRefObject<HTMLUListElement>,
    actualDeg: number
): number {
    const possibleNums: arrayNum = [];
    /* This is the difference between the full circle and the actual rotation degrees. 
    It's has been added 5 to it to compensate for each of the sequence item's thickness. */
    const difference = 360 - actualDeg + 5;
    // The ref's children are stored in an array.
    const children = ref.current.children
    const childrenArray = Object.values(children);

    childrenArray.forEach((child) => {
        // Get the value of each child's data-value and data-rotate values.
        const num = child.attributes.getNamedItem("data-value").value;
        const childRotateAngle = Number(child.attributes.getNamedItem("data-rotate").value);
        /* If the data-rotate value is less than or equal to the difference, 
        add the num to the possibleNums array. */
        if (childRotateAngle <= difference) {
            possibleNums.push(Number(num))
        }
    })
    /* Return the last element of the possibleNums array 
    as its rotate-angle is closest to the difference.*/
    return possibleNums[possibleNums.length - 1];
}