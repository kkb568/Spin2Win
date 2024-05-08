import { useContext } from "react"
import { ChipContext } from "../../../../PlayArea";
import BetTotal from "./BetTotal";

interface chipProp {
    url: string,
    betTotal: number,
    showTotal: boolean
}

export default function ShownChip({ url, betTotal, showTotal }: chipProp) {
    const { playDataStore } = useContext(ChipContext);
    const { enableButton } = playDataStore;
    
    /* The component is rendered if the enableButton is true 
    and the betTotal is greater than 0. 
    This helps to remove unwanted chip display when the delete button is clicked. */
    return (
        <>
            {enableButton && betTotal > 0 &&
                <>
                    <BetTotal showTotal={showTotal}
                        betTotal={betTotal} />
                    <img src= {url} />
                </>
            }
        </>
    )
}
