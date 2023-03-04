import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract,toNano,Cell } from 'ton-core';
import { EscrowTon, } from '../wrappers/EscrowTon';
import { Buffer } from 'buffer';



export function useEscrowContract(arbiter:string,beneficiary:string,value:string) {
    const client = useTonClient();
     //EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p

    const { sender } = useTonConnect();
   


  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  const escrowContract = useAsyncInitialize(async () => {

    if (!client) return;
    if (!arbiter || !beneficiary || arbiter.length < 36 || beneficiary.length < 36) {
        // Return an error or do nothing, depending on what you want to do
        return null;
      }
      const ARBITER_ADDRESS=Address.parse(arbiter)
      const BENEFICIARY_ADDRESS=Address.parse(beneficiary)
      const DEPLOYER_ADDRESS=Address.parse("EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p")
const boc={"hex":"b5ee9c7241021201000154000114ff00f4a413f4bcf2c80b01020162090202012006030201200504000dbb778f001f8428000db9ef3f001f84380201480807000db734be003f0890000db7fcbe003f08300202cd0b0a008dd7800b8104008646582a801e78b10fd010965b5658fc684e90cad8d8de5882e4c4d2e8cae440c6c2dcc6cad8cac840e8d0ca40e8e4c2dce6c2c6e8d2dedc430678b64c1837d8040201200f0c0201200e0d00913c005c0820043232c15400f3c5887e8084b2dab2c7e342948656c6c6f2c62656e656669636961727920596f7572207061796d656e7420636f6e6669726d656421833c5b260c1bec02000133c007e10b1c17cb82ee00201201110002f3b513434c7c07e187e90007e18be90007e18fe900c3e1920007d0831c02456f8007434c0c05c6c2456f83e900c0074c7cc007c008820843a3055a06ea5cc3c007e10fc00f820843303c949aea5bc007e113c01382103fcbc2018c3b16f"}
   
    const EscrowCodeCell=Cell.fromBoc(Buffer.from(boc.hex,"hex"))[0]
    console.log("Escrow Cell",EscrowCodeCell)
    const contract = EscrowTon.createFromConfig({
        query_id:Math.floor(Math.random() * 10000),
        arbiter:ARBITER_ADDRESS,
        beneficiary:BENEFICIARY_ADDRESS,
        owner:DEPLOYER_ADDRESS
      },EscrowCodeCell);
    
    return client.open(contract) as OpenedContract<EscrowTon>;
  }, [client,arbiter,beneficiary]);

  console.log("Escrow from Hook:",escrowContract)
  
  
  return {
    
    address: escrowContract?.address.toString(),
    sendDeploy: async() => {
      return await escrowContract?.sendDeploy(sender,toNano(value));
    },
    sendApprove: async()=>{
        return await escrowContract?.sendApprove(sender,{value:toNano("0.01")})
    }
  };
}