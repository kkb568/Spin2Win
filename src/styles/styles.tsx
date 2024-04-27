import { css, injectGlobal } from "@emotion/css"
import Roboto from '../fonts/Roboto-Regular.ttf'

injectGlobal`
    @font-face {
        font-family: 'Roboto';
        src: url(${Roboto});
    }
`

export const divBackgroundStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000004;
  z-index: -2;
`

export const imageBackgroundStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 120vh;
    z-index: -1;
`

export const containerStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3em;
    font-family: 'Roboto';
`

export const PlayAreaStyle = css`
    width: 960px;
    height: 80vh;
    color: white;
`

export const TopComponentStyle = css`
    background-color: #b70016;
    width: 100%;
    background-image: radial-gradient(circle,rgba(0,0,0,0) 0,rgba(0,0,0,0) 52.6%,rgba(0,0,0,.8) 100%),url(data:image/png;base64,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);
`

export const TopHeaderStyle = css`
    background-color: rgba(0, 0, 0, .3);
    box-shadow:  0 1px 0 0 rgba(0,0,0,.5);
    padding: .1em;
`

export const TopBodyStyle = css`
    margin: 0 10em;
    padding: 2em 0;
`

export const TopGridStyle = css`
    float: right;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-right: -.5em;
`

export const MiddleGridNumStyle = css`
    display: grid;
    grid-template-columns: repeat(12, 54px);
`

export const MiddleGridDozenStyle = css`
    display: grid;
    grid-template-columns: repeat(3, 216px);
`

export const BottomGridStyle = css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    
`

export const ButtonFontStyle = {
    fontSize: '18px'
}

export const ActionBarStyle = css`
    width: 100%;
    background-color: #192348;
    padding: 1em 0;
`

export const BetBalanceStyle = css`
    width: 8em;
    height: 4em;
    padding: 0 0 3px 5px;
    background-color: #efefef;
    border: 2px solid #d9d9d9;
    border-radius: 3px;
    margin-left: 2em;

    p:first-child {
        color: #4a4a4a;
        font-size: 11px;
        text-transform: uppercase;
    }

    p:last-child {
        font-weight: 600;
        line-height: 10px;
        color: #2d2d2d;
        font-size: 18px;
    }
`

export const FooterStyle = css`
    width: 100%;
    background-color: #013b93;
    padding: .5em 0;
    display: flex;
    gap: 10em;
    font-size: 13px;
`