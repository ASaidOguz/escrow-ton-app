import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import Form from './components/Form';
import { useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useTonConnect } from './hooks/useTonConnect';
import { useEscrowContract } from './hooks/useEscrowContract';


function App() {
  const[arbiter,setArbiter]=useState<string>("");
  const[beneficiary,setBeneficiary]=useState<string>("");
  const[value,setValue]=useState<string>("");
  
  const { connected } = useTonConnect();
  

  const {  address, sendDeploy,sendApprove } = useEscrowContract(arbiter,beneficiary,value)?? {};;
   console.log("Arbiter:",arbiter)
   console.log("Benefciary:",beneficiary)
   console.log("Value:",value)

   return (
    <div>
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
            <Button id="deployButton" colorScheme='blue' onClick={sendDeploy}>Deploy</Button>
          )}
          {sendApprove && (
            <Button id="approveButton" colorScheme='green' onClick={sendApprove}>Approve</Button>
          )}
        </>
      ) : (
        <div>No contract details to show</div>
      )}
    </div>
  );
}

export default App
