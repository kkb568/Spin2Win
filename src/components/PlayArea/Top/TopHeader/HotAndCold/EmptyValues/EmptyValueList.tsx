import { css } from "@emotion/css";
import { arrayNum } from "../../../../../../data/dataTypes"
import EmptyValue from "./EmptyValue";

export default function EmptyValueList() {
    const count: arrayNum = [];
    for (let i = 1; i < 6; i++) {
        count.push(i);
    }

    const emptyValueList = count.map((num) => {
        return (
            <EmptyValue key={num} />
        )
    })

    return (
        <div className={emptyValuesStyle}>
            {emptyValueList}
        </div>
    )
}

const emptyValuesStyle = css`
    display: flex;
    gap: .2em;
`