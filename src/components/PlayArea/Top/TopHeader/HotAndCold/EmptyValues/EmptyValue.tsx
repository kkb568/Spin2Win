import { css } from "@emotion/css"

export default function EmptyValue() {
    return (
        <div className={emptyValueStyle}></div>
    )
}

const emptyValueStyle = css`
    width: 1.4em;
    height: 1.4em;
    border-radius: .7em;
    background: rgba(0,0,0,.35);
`