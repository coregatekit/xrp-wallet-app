"use client";
import { useEffect, useState } from "react";
import { Client, type Wallet } from "xrpl";
import AccountInfo from "./components/AccountInfo";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [isGettingAccount, setIsGettingAccount] = useState(false);
  const [account, setAcount] = useState<Wallet | null>(null);
  const [client] = useState(new Client("wss://s.altnet.rippletest.net:51233"));

  useEffect(() => {
    client.connect().then(() => {
      setIsConnected(true);
    });
  }, [client]);

  const handleCreateAccount = async () => {
    setIsGettingAccount(true);
    try {
      const wallet = (await client.fundWallet()).wallet;
      setAcount(wallet);
    } catch (error) {
      console.error("Error creating account:", error);
    } finally {
      setIsGettingAccount(false);
    }
  };

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

      {isConnected &&
        (account ? (
          <AccountInfo account={account} />
        ) : isGettingAccount ? (
          <div>Getting account...</div>
        ) : (
          <div className='flex flex-col items-center gap-4'>
            <div className='text-2xl'>Did you already have an account?</div>

            <div className='flex gap-4'>
              <button
                type='button'
                className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors cursor-pointer'
                onClick={handleCreateAccount}
              >
                Create New Account
              </button>

              <button
                type='button'
                className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors cursor-pointer'
                onClick={() => {
                  // TODO: Implement recovery account functionality
                  console.log("Recovery account clicked");
                }}
              >
                Recover Existing Account
              </button>
            </div>
          </div>
        ))}
    </main>
  );
}
