import { arrayNum } from "../../../../data/data";
import { Button } from "../../../../styles/styles";
import { assignBackgroundColor } from "../../../../utils/utils";

interface Props {
    numArr: arrayNum
}

// Function for rendering each row elements for each of the three rows that contain the numbers.
export function NumButton({ numArr }: Props): JSX.Element[] {

    const numberButtons: JSX.Element[] = numArr.map((num) => {
        const buttonColor = assignBackgroundColor(num);
        return (
            <Button key={num} 
                style={{
                    position: 'relative', 
                    backgroundColor: buttonColor,
                    fontSize: '24px'
                    }}>
                        {num}
            </Button>
        )
    });
    return numberButtons;
}