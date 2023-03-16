
import { TonConnectButton } from '@tonconnect/ui-react';
import Form from './components/Form';
import { SetStateAction, useState } from 'react';
import { Button, ButtonGroup,SimpleGrid, Stack,Text,Grid,GridItem,Box } from '@chakra-ui/react'
import { useTonConnect } from './hooks/useTonConnect';
import { useEscrowContract } from './hooks/useEscrowContract';
import Escrow from './components/Escrow';
import { useEffect } from 'react';
import bgImage from "./assets/Escrow-Ton.png";
import AnimatedBackground from './components/AnimatedBackground';
import EscrowExplorer from './components/EscrowExplorer';
import AnimatedTitle from './components/AnimatedTitle';



function App() {
  const[arbiter,setArbiter]=useState<string>("");
  const[beneficiary,setBeneficiary]=useState<string>("");
  const[value,setValue]=useState<string>("");
  const[job_description,setJob_description]=useState<string>("");

  const [result, setResult] = useState<string>('');
  const [contractadrress,setContractadrress]=useState<string[]>([]);

  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
  
  const { connected } = useTonConnect(setResult);
  
  const {  address, sendDeploy } = useEscrowContract(arbiter,beneficiary,value,setResult,job_description)?? {};;
  
  useEffect(() => {
    const storedAddresses = localStorage.getItem('contractAddresses');
    console.log("Stored address:",storedAddresses)
    if (storedAddresses) {
      setContractadrress(JSON.parse(storedAddresses));   
    }
  },[]);
  useEffect(() => {
    setContractadrress(prevState => {
      const newAddresses = [...prevState, address];
      const uniqueAddresses = Array.from(new Set(newAddresses.filter(addr => addr)));
      return uniqueAddresses as string[];
    });  
  }, [result]);
    useEffect(()=>{
      localStorage.setItem('contractAddresses', JSON.stringify(contractadrress));
    },[contractadrress,result])
    console.log("Connect :",connected)
    
   
   return (
    <>
    <Box>
    <AnimatedBackground/>
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
    <GridItem ml={7}>
      <AnimatedTitle/>
    <Form
      arbiter={''} 
      beneficiary={''} 
      value={''} 
      job_description={''}
      setArbiter={setArbiter}
      setBeneficiary={setBeneficiary}
      setValue={setValue}
      setJob_description={setJob_description}
    />
    {address ? (
      <Stack mt={4}>
        <div>Contract Address: {address}</div>
        <div>Arbiter: {arbiter}</div>
        <div>Beneficiary: {beneficiary}</div>
        <div>Value: {value}</div>
        {sendDeploy && (
          <Button id="deployButton" colorScheme='green' onClick={()=>{
            sendDeploy()
           
            console.log("Address:",address)
            }}>Deploy</Button>
        )}
         
      </Stack>
    ) : (
      <Stack>
      <Text mt={4}>No contract details to show</Text>
      </Stack>
    )}
    {contractadrress&&<div>
    { <SimpleGrid spacing={2} mt={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
     { contractadrress.map((address,index)=><Escrow address={address} key={index} 
     setResult={setResult} 
     result={result}
     />)}
      </SimpleGrid>}
    </div>}
    <Box display="flex" justifyContent="center">
    <Button  colorScheme={"teal"}  color={"red"} mt={4} mb={4} onClick={()=>{localStorage.removeItem('contractAddresses') 
    }}>Clear Contract Cache</Button>
    </Box>
    </GridItem>
    <GridItem>
      <Box mt={4}>
      <TonConnectButton/>
      </Box>
    <EscrowExplorer setResult={function (value: SetStateAction<string>): void {
               throw new Error('Function not implemented.');
             } } result={''}/>
    </GridItem>
  </Grid>
  </Box>
  </>
  );
}

export default App
