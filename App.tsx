import { FunctionComponent } from 'react'
import * as React from 'react'
import Chat from './component/chat'
import { init } from './service/api'
import styled, { createGlobalStyle } from 'styled-components'
import Authentication from './component/authentication'
import { BrowserRouter } from 'react-router-dom'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,400&display=swap');

  * {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
  
  #root {
  }
`

const App: FunctionComponent = () => {
    init()
    return (
        <>
            <GlobalStyle />
            <Authentication>
                <BrowserRouter></BrowserRouter>
                <Page>
                    <h1>Chat</h1>
                    <Chat />
                </Page>
            </Authentication>
        </>
    )
}

const Page = styled.div`
    display: flex;
    height: 100vh; // This sets fullscreen app
    flex-direction: column;
    padding: 8px;
    box-sizing: border-box;
`

export default App
