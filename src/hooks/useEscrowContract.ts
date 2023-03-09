import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract,toNano,Cell, fromNano } from 'ton-core';
import { EscrowTon, } from '../wrappers/EscrowTon';
import { Buffer } from 'buffer';
import { useTonAddress } from '@tonconnect/ui-react';


export function useEscrowContract(arbiter:string,beneficiary:string,value:string,setResult: React.Dispatch<React.SetStateAction<string>>) {
    const client = useTonClient();
     //EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p
    
    const { sender } = useTonConnect(setResult);
    const DeployerAddress = useTonAddress();
    console.log("User friendly Address:",DeployerAddress)

  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
  
  const escrowContract = useAsyncInitialize(async () => {

    if (!client) return;
    if (!arbiter || !beneficiary || arbiter.length < 36 || beneficiary.length < 36) {
        // Return an error or do nothing, depending on what you want to do
        return null;
      }
      
      const ARBITER_ADDRESS=Address.parse(arbiter)
      const BENEFICIARY_ADDRESS=Address.parse(beneficiary)
      const DEPLOYER_ADDRESS=Address.parse(DeployerAddress)
const boc={"hex":"b5ee9c72410212010001bb000114ff00f4a413f4bcf2c80b01020162090202012006030201200504000dbb778f001f8428000db9ef3f001f84380201480807000db734be003f0890000db7fcbe003f08300202cd0b0a009fd7800b8104008646582a802678b2c7d010965b5658fc68629cdedc5a82e4c4d2e8cae44082c8c8e4cae6e6405886dedae0eae8c2e8d2dedc40cccaca40c6dedcccd2e6c6c2e8cac8430678b64b9fd8040201200f0c0201200e0d008d3c005c0820043232c15400f3c5887e8084b2dab2c7e342748656c6c6f2c417262697465722063616e63656c656420746865207472616e73616374696f6e21833c5b260c1bec02000913c005c0820043232c15400f3c5887e8084b2dab2c7e342948656c6c6f2c62656e656669636961727920596f7572207061796d656e7420636f6e6669726d656421833c5b260c1bec0200201201110002f3b513434c7c07e187e90007e18be90007e18fe900c3e192000bf08a084165a0bc02f3cb82ec831c02497c0f8007434c0c05c6c2497c0f83e900c3c007e10948431c16ce6cc4060840ee6b280287c01380c0c74c7cc0820843a3055a06ea5cc3c007e10fc00b820843303c949aea5bc007e113c00f82103fcbc200ceed0cd"}
    
    const EscrowCodeCell=Cell.fromBoc(Buffer.from(boc.hex,"hex"))[0]
    console.log("Escrow Cell",EscrowCodeCell)
    const contract = EscrowTon.createFromConfig({
        query_id:Math.floor(Math.random() * 10000),
        arbiter:ARBITER_ADDRESS,
        beneficiary:BENEFICIARY_ADDRESS,
        owner:DEPLOYER_ADDRESS,

      },EscrowCodeCell);
    
    return client.open(contract) as OpenedContract<EscrowTon>;
  }, [client,arbiter,beneficiary]);
 
  return {
    
    address: escrowContract?.address.toString(),
    sendDeploy: async() => {
      
      return await escrowContract?.sendDeploy(sender,toNano(value));
    }
 
  };
}