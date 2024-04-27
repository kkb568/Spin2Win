import { css } from "@emotion/css";
import { TopHeaderStyle } from "../../styles/styles";

export default function TopHeader() {
    return (
        <div className={TopHeaderStyle}>
            <p className={css`
                margin-left: 1.5em;
                font-size: 13px;
            `}>Statistics are not available yet.</p>
        </div>
    )
}