import { useTonClient } from '../hooks/useTonClient';
import { useAsyncInitialize } from '../hooks/useAsyncInitialize';
import { useTonConnect } from '../hooks/useTonConnect';
import { Address, OpenedContract,toNano,Cell, fromNano, address } from 'ton-core';
import { EscrowTon, } from '../wrappers/EscrowTon';
import { Box, Button, Stack } from '@chakra-ui/react';
import { useState,useEffect } from 'react';
import { Card, 
         CardHeader, 
         CardBody, 
         CardFooter,
         Text,
         Skeleton,
         CircularProgress,
         Textarea,
         FormControl,
         FormLabel,
         Input,
         FormHelperText  } from '@chakra-ui/react'

export default function EscrowExplorer(props: {
    setResult: React.Dispatch<React.SetStateAction<string>>;
    result:string;
  }) {
    const client = useTonClient();
    const{result,setResult}=props

    const{sender}=useTonConnect(setResult)
    const[address,setAddress]=useState<string>("")
    const[arbiter,setArbiter]=useState<string>("");
    const[beneficiary,setBeneficiary]=useState<string>("");
    const[owner,setOwner]=useState<string>("");
    const[job_description,setJob_description]=useState<string>("");
    const[approved,setApproved]=useState<number>(0);
    const[canceled,setCanceled]=useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const[balance,setBalance]=useState<string>("");

    const handleAddresschange=(e: { target: { value: string } })=>setAddress(e.target.value);
    console.log("Address:",address)
    const fetchGetters = async () => {
        if (escrowcontract) {
          try {
            const arbiterValue = (await escrowcontract.getArbiter()).toString();
            setArbiter(arbiterValue);
            const beneficiary = (await escrowcontract.getBeneficiary()).toString();
            setBeneficiary(beneficiary);
            const owner = (await escrowcontract.getOwner()).toString();
            setOwner(owner);
            const jb = (await escrowcontract.getJobDescription()).toString()
            setJob_description(jb)
            const apprvd = await escrowcontract.getApproved()
            setApproved(apprvd)
            const cancld = await escrowcontract.getCanceled()
            setCanceled(cancld)
            const blnce= await client?.getBalance(escrowcontract.address)
            if (typeof blnce === 'bigint') {
                setBalance(fromNano(blnce));
              }
            setIsLoading(false);
          } catch (error) {
            setIsError(true);
            setIsLoading(false)
            console.log("loading:",isLoading)
          }
        }
      };
      useEffect(() => {
        const fetchData = async () => {
          await fetchGetters();
        };
      
        fetchData();
      }, [result]);
      
    const escrowcontract= useAsyncInitialize(async()=>{
        if (!client) return;
        const isDeployed=await client.isContractDeployed(Address.parse(address))
        console.log("İsDeployed:",isDeployed)
        if(isDeployed){
        const openedContract=EscrowTon.createFromAddress(Address.parse(address))
        return  client.open(openedContract) as OpenedContract<EscrowTon>;}
        return null
      },[address])  
  return (
    <Box mt={4}>
    <FormControl>
        <FormLabel>Escrow Explorer</FormLabel>
            <Input type='text'  onChange={handleAddresschange}></Input>
    <FormHelperText>Please insert your Contract address to see details</FormHelperText>          
    </FormControl>
    <Button
  id="approveButton"
  colorScheme="green"
  mt={4}
  mr={2}
  onClick={async () => {
    await fetchGetters();
  }} 
>Check Escrow Contract
</Button>

    {escrowcontract?(<Box mt={6} mr={4}>
        <Card  bg="#FFD300" align='center'>

<CardBody>

{escrowcontract ? (
<>
<Stack>
<Text size={'md'} mt={4} isTruncated fontSize="md" fontWeight="bold">
{isLoading ? (
<Skeleton height="20px" w="100%" />
) : (
<>
<Text as="span" color="blue.500">C. Address: </Text>
<Text as="span">{escrowcontract.address.toString()}</Text>
</>
)}
</Text>
<Text size={'md'} mt={4} isTruncated>
{isLoading ? (
<Skeleton height="20px" w="100%" />
) : (
<>
<Text as="span" color="green.500">Arbiter:&nbsp;&nbsp;&nbsp;</Text>
<Text as="span">{arbiter}</Text>
</>
)}
</Text>
<Text size={'md'} mt={4} isTruncated fontSize="md" color="gray.500">
{isLoading ? (
<Skeleton height="20px" w="100%" />
) : (
<>
<Text as="span" color="purple.500">Beneficiary: </Text>
<Text as="span">{beneficiary}</Text>
</>
)}
</Text>
<Text size={'md'} mt={4} isTruncated>
{isLoading ? (
<Skeleton height="20px" w="100%" />
) : (
<>
<Text as="span" color="orange.500">Owner:&nbsp;&nbsp;&nbsp;</Text>
<Text as="span">{owner}</Text>
</>
)}
</Text>
<Text size={'md'} mt={4} isTruncated>
{isLoading ? (
<Skeleton height="20px" w="100%" />
) : (
<>
<Text as="span" color="orange.500">Approved: </Text>
<Text as="span">{approved}</Text>
</>
)}
</Text>
<Text size={'md'} mt={4} isTruncated>
{isLoading ? (
<Skeleton height="20px" w="100%" />
) : (
<>
<Text as="span" color="orange.500">Canceled: </Text>
<Text as="span">{canceled}</Text>
</>
)}
</Text>
<Text size={'md'} mt={4} >
{isLoading ? (
<Skeleton height="20px" w="100%" />
) : (
<>
<Text as="span" color="orange.500">Job Description: </Text>
<Text as="span" overflow={'auto'} >{job_description}</Text>
</>
)}
</Text>
<Text size={'md'} mt={4} >
{isLoading ? (
<Skeleton height="20px" w="100%" />
) : (
<>
<Text as="span" color="orange.500">Contract Balance: </Text>
<Text as="span" overflow={'auto'} >{balance}</Text>
</>
)}
</Text>
</Stack>

<Button
  id="approveButton"
  colorScheme="green"
  mt={4} mr={2}
  onClick={async () => {
     await escrowcontract.sendApprove(sender, { value: toNano("1.55") })
  }}
>
  Approve 
</Button>

<Button mt={4} ml={2}
id="cancelButton"
colorScheme="red"
onClick={async () => {
await escrowcontract.sendCancel(sender, { value: toNano("1.55") })
}}
>
Cancel  
</Button>
</>
):(<CircularProgress

size="120px"
thickness="10px"
isIndeterminate color="blue.500"
capIsRound
/>)}

</CardBody>
</Card>
    </Box>):(<Text>Contract not Deployed!</Text>)}
    </Box>
  )
}
