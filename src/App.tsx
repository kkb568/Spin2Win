import PlayArea from "./components/PlayArea"
import { backgroundImageUrl } from "./data/data"
import { containerStyle, divBackgroundStyle, imageBackgroundStyle } from "./styles/styles"


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
