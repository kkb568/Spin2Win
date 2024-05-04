import { css } from "@emotion/css";
import { arrayNum } from "../../../../data/data";
import { PlayButton } from "../../../../styles/styles";
import { assignBackgroundColor } from "../../../../utils/utils";
import { useContext } from "react";
import { ChipContext } from "../../../PlayArea";

interface Props {
    numArr: arrayNum
}

// Function for rendering each row elements for each of the three rows that contain the numbers.
export function NumButton({ numArr }: Props): JSX.Element[] {
    const { chipUrl } = useContext(ChipContext);

    const numberButtons: JSX.Element[] = numArr.map((num) => {
        const buttonColor = assignBackgroundColor(num);
        return (
            <PlayButton key={num} 
                style={{
                    position: 'relative', 
                    backgroundColor: buttonColor,
                    fontSize: '24px'
                    }}>
                        <div className={hoverElementStyle}>
                            <div className={foregroundStyle}></div>
                            <img className={chipStyle} src={chipUrl} />
                        </div>
                        {num}
            </PlayButton>
        )
    });
    return numberButtons;
}


const hoverElementStyle = css`
    position: absolute;
    margin-left: 7.6em;
    margin-top: 1em;
`

const foregroundStyle = css`
    background-color: rgba(255, 255, 255, .3);
    position: absolute;
    width: 2.2em;
    height: 2.5em;
    margin-left: -4.9em;
    margin-top: -1.5em;
`

const chipStyle = css`
    position: absolute;
    width: 1.1em;
    margin-left: -3.2em;
    margin-top: .2em;
    z-index: 4;
    box-shadow: 0 5px 5px 0 rgba(0,0,0,.5);
    border-radius: 50%;
`