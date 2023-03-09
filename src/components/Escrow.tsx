import { useTonClient } from '../hooks/useTonClient';
import { useAsyncInitialize } from '../hooks/useAsyncInitialize';
import { useTonConnect } from '../hooks/useTonConnect';
import { Address, OpenedContract,toNano,Cell, fromNano, address } from 'ton-core';
import { EscrowTon, } from '../wrappers/EscrowTon';
import { Button } from '@chakra-ui/react';
import { useState,useEffect } from 'react';



export default  function  Escrow(props: { address: any;setResult: React.Dispatch<React.SetStateAction<string>>;result:string}) {
    const client = useTonClient();
    const[arbiter,setArbiter]=useState<string>("");
    const[beneficiary,setBeneficiary]=useState<string>("");
    const[owner,setOwner]=useState<string>("");
    const{address,setResult,result}= props
    const { sender } = useTonConnect(setResult);
   
    const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
     console.log("Result:",result)
    const escrowcontract= useAsyncInitialize(async()=>{
      if (!client) return;
      await sleep(8000)
      const isDeployed=await client.isContractDeployed(Address.parse(address))
      console.log("İsDeployed:",isDeployed)
      if(isDeployed){
      
      const openedContract=EscrowTon.createFromAddress(Address.parse(address))
      
      return  client.open(openedContract) as OpenedContract<EscrowTon>;}
      return null
    },[client,result])  
   
    useEffect(() => {
      async function fetchGetters() {
        if (escrowcontract) {
          const arbiterValue = (await escrowcontract.getArbiter()).toString();
          setArbiter(arbiterValue);
          const beneficiary=(await escrowcontract.getBeneficiary()).toString();
          setBeneficiary(beneficiary)
          const owner= (await escrowcontract.getOwner()).toString()
          setOwner(owner)
        }
      }
      fetchGetters();
    }, [escrowcontract,result]);


  return (
    <div>
   
    {escrowcontract && (
      <>
      Arbiter :{arbiter}
      Beneficiary:{beneficiary}
      Owner:{owner}
      <Button
        id="approveButton"
        colorScheme="green"
        onClick={async () => {
           await escrowcontract.sendApprove(sender, { value: toNano("1.55") })
        }}
      >
        Approve  Address: {address}
      </Button>

<Button
id="cancelButton"
colorScheme="red"
onClick={async () => {
  await escrowcontract.sendCancel(sender, { value: toNano("1.55") })
}}
>
Cancel  Address: {address}
</Button>
</>
    )}
  </div>

  )
}