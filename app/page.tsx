'use client';
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
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <div>Welcome to XRP Wallet</div>
        <div>
          {isConnected ? (
            <div>
              XRP Ledger is connected
            </div>
          ) : (
            <div>
              Connecting to XRP Ledger...
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
