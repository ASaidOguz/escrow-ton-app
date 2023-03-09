import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import Form from './components/Form';
import { useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useTonConnect } from './hooks/useTonConnect';
import { useEscrowContract } from './hooks/useEscrowContract';
import Escrow from './components/Escrow';
import { useEffect } from 'react';


function App() {
  const[arbiter,setArbiter]=useState<string>("");
  const[beneficiary,setBeneficiary]=useState<string>("");
  const[value,setValue]=useState<string>("");
  const [result, setResult] = useState<string>('');
  const [contractadrress,setContractadrress]=useState<string[]>([]);

  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
  
  const { connected } = useTonConnect(setResult);
  
  const {  address, sendDeploy } = useEscrowContract(arbiter,beneficiary,value,setResult)?? {};;
  
  useEffect(() => {
    const storedAddresses = localStorage.getItem('contractAddresses');
    console.log("Stored address:",storedAddresses)
    if (storedAddresses) {
      setContractadrress(JSON.parse(storedAddresses));   
    }
  },[]);
  useEffect(() => {
    localStorage.setItem('contractAddresses', JSON.stringify(contractadrress));
  }, [contractadrress]);
  
   return (
    <div >
  
    <TonConnectButton />
    <Form
      arbiter={''} 
      beneficiary={''} 
      value={''} 
      setArbiter={setArbiter}
      setBeneficiary={setBeneficiary}
      setValue={setValue}
    />
    {address ? (
      <>
        <div>Contract Address: {address}</div>
        <div>Arbiter: {arbiter}</div>
        <div>Beneficiary: {beneficiary}</div>
        <div>Value: {value}</div>
        {sendDeploy && (
          <Button id="deployButton" colorScheme='blue' onClick={()=>{
            sendDeploy()
            setContractadrress(prevState=>[...prevState,address])
            console.log("Address:",address)
            }}>Deploy</Button>
        )}
         
      </>
    ) : (
      <div>No contract details to show</div>
    )}
    {contractadrress&&<div>
    {contractadrress.map((address,index)=><Escrow address={address} key={index} setResult={setResult} result={result}/>)}
    </div>}
    <Button colorScheme={"cyan"}  color={"red"} onClick={()=>{localStorage.removeItem('contractAddresses')
      
    }}>Clear Contract Cache</Button>
  </div>
  );
}

export default App
