import { css } from "@emotion/css";

// This is the dark red heading that would contain game's statistics.
export default function TopHeader() {
    return (
        <div className={TopHeaderStyle}>
            <p>Statistics are not available yet.</p>
        </div>
    )
}


const TopHeaderStyle = css`
    background-color: rgba(0, 0, 0, .3);
    box-shadow:  0 1px 0 0 rgba(0,0,0,.5);
    padding: .1em;

    p {
        margin-left: 1.5em;
        font-size: 13px;
    }
`