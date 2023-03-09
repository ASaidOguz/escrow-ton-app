import { useTonConnectUI } from '@tonconnect/ui-react';
import { beginCell, Sender, SenderArguments, storeStateInit } from 'ton-core';
import { useState } from 'react';
export function useTonConnect(setResult: React.Dispatch<React.SetStateAction<string>>): { sender: Sender; connected: boolean } {
  const [tonConnectUI] = useTonConnectUI();
  
  
  return {
    sender: {
      send: async (args: SenderArguments) => {
        const transactionPromise =  await tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
              stateInit: args.init
              ? beginCell().storeWritable(storeStateInit(args.init)).endCell().toBoc().toString('base64')
              : undefined},
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        },{
          modals: ['before', 'success', 'error'],
          notifications: ['before', 'success', 'error']
      });
      setResult(JSON.stringify(transactionPromise));
      
      },
    },
    connected: tonConnectUI.connected,
  };
}