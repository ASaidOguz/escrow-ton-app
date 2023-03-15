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
const boc={"hex":"b5ee9c7241021c010002b9000114ff00f4a413f4bcf2c80b010201620f020201200a030201200504000dbb778f001f84480201200706000db725de003f08f00201200908000db3bcfc007e1160000db3ebbc007e10e00201200c0b000db9737f001f84280201200e0d000db734be003f08d0000db7fcbe003f08300202cd1510020120121100bf4f00170208010c8cb055004cf1658fa0212cb6acb1f8d1055d85c9b9a5b99c8139bdb8b505c989a5d195c881059191c995cdcc80b10dbdb5c1d5d185d1a5bdb88199959481dda5b1b0818994818dbdb999a5cd8d85d19590860cf16c973fb008020120141300913c005c0820063232c17e1133c5887e80b2dab2c7e342a4d6573736167652773206f726967696e617465642066726f6d20657363726f7720636f6e747261637421833c5b260103ec020008d3c005c0820043232c15400f3c5887e8084b2dab2c7e342748656c6c6f2c417262697465722063616e63656c656420746865207472616e73616374696f6e21833c5b260c1bec020020120171600a35f00170208010c8cb055003cf1621fa0212cb6acb1f8d0c92195b1b1bcb18995b99599a58da585c9e48165bdd5c881c185e5b595b9d081a185cc81899595b8818dbdb999a5c9b59590860cf16c98306fb0080201201918004d3b513434c7c07e1874c0407e18b4c0407e18fe90007e193e90007e197e90007e19b50c343e19e002f708a084165a0bc02f3cb82ec831c02497c0f8007434c0c05c6c2497c0f83e900c3c007e11148431c16ce6cc4060840ee6b280287c01b80c0c74c7cc0820843a3055a06ea38acc3c007e117c00dc5c3c00723e11f3c5b27e107232c7c4f2c072c07e1133c5be1173c5be11b3c5b3327b55380820843303c949aeb8c0a01b1a001e8210bb620d9cba92f005e0840ff2f0005630f001f846f0047071f001c8f847cf16c9f841c8cb1f13cb01cb01f844cf16f845cf16f846cf16ccc9ed54f9625548"}
    
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