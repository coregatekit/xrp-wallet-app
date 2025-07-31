"use client";
import { useEffect, useState } from "react";
import { Client } from "xrpl";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [client] = useState(new Client("wss://s.altnet.rippletest.net:51233"));

  useEffect(() => {
    client.connect().then(() => {
      setIsConnected(true);
    });
  }, [client]);

  return (
    <main className='flex flex-col items-center justify-center gap-8 my-12'>
      <div className='text-2xl font-bold'>Welcome to XRP Wallet</div>
      <div>
        {isConnected ? (
          <div>XRP Ledger testnet is connected</div>
        ) : (
          <div>Connecting to Testnet XRP Ledger...</div>
        )}
      </div>

      <div className='flex flex-col items-center gap-4'>
        <div className='text-2xl'>Did you already have an account?</div>

        <div className='flex gap-4'>
          <button 
            type="button"
            className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors cursor-pointer'
            onClick={() => {
              // TODO: Implement create account functionality
              console.log('Create account clicked');
            }}
          >
            Create New Account
          </button>
          
          <button 
            type="button"
            className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors cursor-pointer'
            onClick={() => {
              // TODO: Implement recovery account functionality
              console.log('Recovery account clicked');
            }}
          >
            Recover Existing Account
          </button>
        </div>
      </div>
    </main>
  );
}
