import { ChangeEvent, useEffect, useState } from 'react';

import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi';

import { parseEther } from 'ethers/lib/utils.js';

export default function Dapp() {
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [transferAmount, setTransferAmout] = useState<string>("0");
  const addRecentTransaction = useAddRecentTransaction();


  const onRecipientAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReceiverAddress(e.target.value);
  }

  const onTransferAmountChange = ( e: ChangeEvent<HTMLInputElement>) => {
    setTransferAmout(e.target.value);
  }

  const { config, error } = usePrepareSendTransaction({
    request: {
      to: receiverAddress,
      value: parseEther(transferAmount || '0'),
    }
  });

  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction(config)

  const handleSendTransaction = async () => {
    sendTransaction?.();
  }

  useEffect(() => {
    if (isSuccess) {
      addRecentTransaction({
        hash: data?.hash || "",
        description: "Send Transaction",
      });
    }
  }, [data, isSuccess])

  return (
    <div className='bg-slate-900 h-screen flex justify-center items-center'>
      <div className='bg-slate-800 w-3/6 h-min py-12 px-24 rounded-2xl flex flex-col'>
        <h2 className='text-white font-bold text-4xl text-center mb-8'>
          Transfer Example
        </h2>
        <form> 
          <label
            htmlFor='receiver'
            className="text-neutral-300 font-light text-md block mb-2 text-sm font-medium"
          >
            First name
          </label>
          <input
            id='receiver'
            type='text'
            placeholder='Receiver address'
            className='bg-slate-800 px-2 py-1 w-full text-lg outline-0 border-b mb-4 border-slate-600 text-neutral-200 appearance-none'
            onChange={onRecipientAddressChange}
            value={receiverAddress}
          />
          <label
            htmlFor='transferAmount'
            className="text-neutral-300 font-light text-md block mb-2 text-sm font-medium"
          >
            Transfer Amount
          </label>
          <input
            id='transferAmount'
            type="number"
            step="0.1"
            placeholder='0'
            className='bg-slate-800 text-neutral-200 px-2 py-1 w-full text-lg outline-0 border-b mb-4 border-slate-600 appearance-none'
            onChange={onTransferAmountChange}
            value={transferAmount}
          />
        </form>
        { error && (
          <div className='text-red-600'>
            An error occurred preparing the transaction: {error.message}
          </div>
        )}

        <button
          className='font-bold text-white bg-indigo-600 mt-4 self-center px-8 py-4 rounded-full disabled:opacity-75'
          disabled={!sendTransaction || isLoading}
          onClick={handleSendTransaction}
        >
          Confirm Transfer
        </button>
      </div>
    </div>
  )
}
