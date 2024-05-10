import { css, cx } from "@emotion/css";
import { lionIconsUrl } from "../../../../data/data";

export default function LionIcons() {
    return (
        <>
            <div className={cx(LionIconStyle, LeftLionIconStyle)}></div>
            <div className={cx(LionIconStyle, RightLionIconStyle)}></div>
        </>
    )
}


const LionIconStyle = css`
    position: absolute;
    margin-top: -5em;
    width: 65px;
    height: 84px;
    background-image: url(${lionIconsUrl});
    opacity: .8;
`

const LeftLionIconStyle = css`
    margin-left: -4.5em;
`

const RightLionIconStyle = css`
    margin-left: 41em;
    transform: scaleX(-1);
`