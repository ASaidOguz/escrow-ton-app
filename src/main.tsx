
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider,Box } from '@chakra-ui/react'
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import bgImage from './assets/Escrow-Ton.png'
import { Global } from "@emotion/react";
import AnimatedBackground from './components/AnimatedBackground';
const manifestUrl = 'https://ASaidOguz.github.io/escrow-ton-app/tonconnect-manifest.json';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 
 <ChakraProvider>
  
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>

  </ChakraProvider>
  
)
