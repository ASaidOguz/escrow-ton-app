import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type EscrowTonConfig = { 
                               query_id:number,
                                approved:number,
                                canceled:number,
                               arbiter:Address,
                               beneficiary:Address,
                               owner:Address,
                               job_description:string
                              };

export function escrowTonConfigToCell(config: EscrowTonConfig): Cell {
    return beginCell()
    .storeUint(config.query_id,32)
    .storeUint(config.approved,2)
    .storeUint(config.canceled,2)
    .storeAddress(config.arbiter)
    .storeAddress(config.beneficiary)
    .storeAddress(config.owner)
    .storeStringRefTail(config.job_description)
    .endCell();
}
export const Opcodes = {
    approve: 0xe8c15681,
    cancel:  0xcc0f2526,
};
export class EscrowTon implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new EscrowTon(address);
    }

    static createFromConfig(config: EscrowTonConfig, code: Cell, workchain = 0) {
        const data = escrowTonConfigToCell(config);
        const init = { code, data };
        return new EscrowTon(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body:beginCell().endCell()
        });
    }

    //approve msg from arbiter to contract;
    async sendApprove(
        provider: ContractProvider,
        via: Sender,
        opts: {
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.approve, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeUint(0, 32)
                .endCell(),
        });
    }

    //cancel msg from arbiter to contract;
    async sendCancel(
        provider: ContractProvider,
        via: Sender,
        opts: {
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.cancel, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeUint(0, 32)
                .endCell(),
        });
    }

    //getter for beneficiary;
    async getBeneficiary(provider: ContractProvider) {
        const result = await provider.get('get_beneficiary', []);
        return result.stack.readAddress();
    }

    //getter for arbiter;
    async getArbiter(provider: ContractProvider) {
        const result = await provider.get('get_arbiter', []);
        return result.stack.readAddress();
    }

    //getter for owner;
    async getOwner(provider:ContractProvider){
        const result=await provider.get('get_owner',[])
        return result.stack.readAddress();
    }

    //getter for query_id;
    async getQueryid(provider:ContractProvider){
        const result=await provider.get('get_queryid',[])
        return result.stack.readNumber();
    }
    //getter for Job description
    async getJobDescription(provider:ContractProvider){
        const result=await provider.get('get_jobDescription',[])
        return result.stack.readString();
    }
    //getter for approve state
    async getApproved(provider:ContractProvider){
        const result=await provider.get('get_approved',[])
        return result.stack.readNumber()
    }
    //getter for canceled state
    async getCanceled(provider:ContractProvider){
        const result=await provider.get('get_canceled',[])
        return result.stack.readNumber()
    }
}
