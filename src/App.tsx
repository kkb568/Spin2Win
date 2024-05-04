import { css } from "@emotion/css"
import PlayArea from "./components/PlayArea"
import { backgroundImageUrl } from "./data/data"


function App() {
  return (
    <>
      <div className={divBackgroundStyle}></div>
      <img src={backgroundImageUrl} 
        alt="Spin2Win background image"
        className={imageBackgroundStyle}/>
      <div className={containerStyle}>
        <PlayArea />
      </div>
    </>
  )
}

export default App

const divBackgroundStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000004;
  z-index: -2;
`

const imageBackgroundStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
`

const containerStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3em;
    font-family: 'Roboto';
`