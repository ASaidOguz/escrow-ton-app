import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract,toNano,Cell, fromNano } from 'ton-core';
import { EscrowTon, } from '../wrappers/EscrowTon';
import { Buffer } from 'buffer';
import { useTonAddress } from '@tonconnect/ui-react';


export function useEscrowContract(arbiter:string,beneficiary:string,value:string,setResult: React.Dispatch<React.SetStateAction<string>>,job_description:string) {
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
const boc={"hex":"b5ee9c7241021a0100025c000114ff00f4a413f4bcf2c80b010201620f020201200a030201200504000dbb778f001f84480201200706000db725de003f08f00201200908000db3bcfc007e1160000db3ebbc007e10e00201200c0b000db9737f001f84280201200e0d000db734be003f08d0000db7fcbe003f08300202cd1310020148121100bf3c005c0820043232c1540133c5963e8084b2dab2c7e34415761726e696e67204e6f6e2d417262697465722041646472657373202c436f6d7075746174696f6e206665652077696c6c20626520636f6e666973636174656421833c5b25cfec020008d3c005c0820043232c15400f3c5887e8084b2dab2c7e342748656c6c6f2c417262697465722063616e63656c656420746865207472616e73616374696f6e21833c5b260c1bec020020120151400a35f00170208010c8cb055003cf1621fa0212cb6acb1f8d0c92195b1b1bcb18995b99599a58da585c9e48165bdd5c881c185e5b595b9d081a185cc81899595b8818dbdb999a5c9b59590860cf16c98306fb0080201201716004d3b513434c7c07e1874c0407e18b4c0407e18fe90007e193e90007e197e90007e19b50c343e19e002f508a084165a0bc02f3cb82ec831c02497c0f8007434c0c05c6c2497c0f83e900c3c007e11148431c16ce6cc4060840ee6b280287c01780c0c74c7cc0820843a3055a06ea38acc3c007e117c00dc5c3c00723e11f3c5b27e107232c7c4f2c072c07e1133c5be1173c5be11b3c5b3327b553820843303c949aeb8c0a019180008840ff2f00054f001f846f0047071f001c8f847cf16c9f841c8cb1f13cb01cb01f844cf16f845cf16f846cf16ccc9ed54a8ba634f"}
    
    const EscrowCodeCell=Cell.fromBoc(Buffer.from(boc.hex,"hex"))[0]
    console.log("Escrow Cell",EscrowCodeCell)
    const contract = EscrowTon.createFromConfig({
        query_id:Math.floor(Math.random() * 10000),
        approved:0,
        canceled:0,
        arbiter:ARBITER_ADDRESS,
        beneficiary:BENEFICIARY_ADDRESS,
        owner:DEPLOYER_ADDRESS,
        job_description:job_description

      },EscrowCodeCell);
    
    return client.open(contract) as OpenedContract<EscrowTon>;
  }, [client,arbiter,beneficiary,job_description]);
 
  return {
    
    address: escrowContract?.address.toString(),
    sendDeploy: async() => {
      
      return await escrowContract?.sendDeploy(sender,toNano(value));
    }
 
  };
}