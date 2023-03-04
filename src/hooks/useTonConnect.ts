import { useTonConnectUI } from '@tonconnect/ui-react';
import { beginCell, Sender, SenderArguments, storeStateInit } from 'ton-core';

export function useTonConnect(): { sender: Sender; connected: boolean } {
  const [tonConnectUI] = useTonConnectUI();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
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
        });
      },
    },
    connected: tonConnectUI.connected,
  };
}