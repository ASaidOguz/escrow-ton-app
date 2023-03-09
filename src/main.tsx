import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const manifestUrl = 'https://ASaidOguz.github.io/escrow-ton-app/tonconnect-manifest.json';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 
 <ChakraProvider>
  
  <TonConnectUIProvider manifestUrl={manifestUrl}>
  
    <App />
  
  </TonConnectUIProvider>
  </ChakraProvider>
  
)
