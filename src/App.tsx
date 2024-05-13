import { css } from "@emotion/css"
import { backgroundImageUrl } from "./data/data"
import PlayArea from "./components/PlayArea/PlayArea"
import PayTable from "./components/PayTable/PayTable"
import { createContext, useState } from "react"
import { MainContextType, MainDataStoreType } from "./data/dataTypes"

export const MainContext = createContext<MainContextType>({
  mainData: {
    displayValue: "none"
  },
  setDisplay: null
})


function App() {
  // The displayValue is used to determine if the blue modal PayTable is shown or not.
  const [mainData, setMainData] = useState<MainDataStoreType>({
    displayValue: "none"
  })

  // The function is used to set the displayValue to the value parameter.
  function displayModal(value: string) {
    setMainData(prevState => {
      return {
        ...prevState,
        displayValue: value
      }
    })
  }

  const mainContextValue: MainContextType = {
    mainData: mainData,
    setDisplay: displayModal
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