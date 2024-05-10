import { css } from "@emotion/css"

interface BetTotalProps {
    showTotal: boolean,
    betTotal: number
}

export default function BetTotal({ showTotal, betTotal }: BetTotalProps) {
    return (
        <>
            {showTotal && 
                <>
                    <span className="material-symbols-outlined">
                        tooltip
                    </span>
                    <p className={css`
                        font-family: 'Roboto';
                    `}>{betTotal}</p>
                </>
            }
        </>
    )
}