import { css } from "@emotion/css"

interface BetTotalProps {
    showTotal: boolean,
    betTotal: number
}

export default function BetTotal({ showTotal, betTotal }: BetTotalProps) {
    const total: string = betTotal >= 1000 ? 
    `${Math.floor(betTotal/1000)}k` : betTotal.toString();

    return (
        <>
            {showTotal && 
                <>
                    <span className="material-symbols-outlined">
                        tooltip
                    </span>
                    <p className={css`
                        font-family: 'Roboto';
                    `}>{total}</p>
                </>
            }
        </>
    )
}