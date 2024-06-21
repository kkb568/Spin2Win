import { css } from "@emotion/css"
import { AppContext, backgroundImageUrl } from "./data/data"
import PlayArea from "./components/PlayArea/PlayArea"
import PayTable from "./components/PayTable/PayTable"
import { createContext, useState } from "react"
import { MainContextType, MainDataStoreType } from "./data/dataTypes"
import RouletteWheel from "./components/RouletteWheel/RouletteWheel"
import Statistics from "./components/Statistics/Statistics"

export const MainContext = createContext<MainContextType>(AppContext)


function App() {
  /* The displayPayTable is used to determine if the blue modal PayTable is shown or not
  whereas the displayWheel does the same but for the RouletteWheel. */
  const [mainData, setMainData] = useState<MainDataStoreType>(AppContext.mainData)

  function setMainState(key: string, value: string | object) {
    setMainData(prevState => {
      return {
        ...prevState,
        [key]: value
      }
    })
  }

  const mainContextValue: MainContextType = {
    mainData: mainData,
    setMainState: setMainState
  }

  return (
    <>
      <div className={divBackgroundStyle}></div>
      <img src={backgroundImageUrl} 
        alt="Spin2Win background image"
        className={imageBackgroundStyle}/>
      <div className={containerStyle}>
        <MainContext.Provider value={mainContextValue}>
          <PlayArea />
          <PayTable />
          <RouletteWheel />
          <Statistics />
        </MainContext.Provider>
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
    justify-content: center;
    margin-top: 3em;
    font-family: 'Roboto';
`