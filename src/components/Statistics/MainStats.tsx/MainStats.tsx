import { css } from "@emotion/css"
import RightHandStats from "./RightHandStats.tsx/RightHandStats"
import LeftHandStats from "./LeftHandStats/LeftHandStats"

export default function MainStatistics() {
    return (
        <div className={mainStatisticsStyle}>
            <LeftHandStats />
            <RightHandStats />
        </div>
    )
}


const mainStatisticsStyle = css`
    width: 53em;
    height: 19em;
    background-color: #86000f;
    margin-left: 2.5em;
    border-radius: 1em 1em 0 0;

    @media (max-width: 900px) {
        width: 33em;
    }

    @media (max-width: 600px) {
        width: 18em;
        height: 35em;
        margin-top: 1.5em;
    }
`