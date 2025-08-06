import { useState } from "react";
import type { Wallet } from "xrpl";

type AccountInfoProps = {
  account: Wallet;
  balance: number;
  onSendTransaction: (destination: string, amount: string, destinationTag?: string) => Promise<string>;
  onCheckOtherAddressBalance: () => Promise<void>;
};

export default function AccountInfo({
  account,
  balance,
  onSendTransaction,
  onCheckOtherAddressBalance,
}: AccountInfoProps) {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [destinationTag, setDestinationTag] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setTxHash(null);

    if (!destinationAddress || !amount) {
      alert("Please fill in all fields");
      return;
    }

    if (Number.parseFloat(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    if (Number.parseFloat(amount) > balance) {
      alert("Insufficient balance");
      return;
    }

    setIsSubmitting(true);

    try {
      const txHash = await onSendTransaction(destinationAddress, amount, destinationTag);
      // Reset form after successful transaction
      setDestinationAddress("");
      setAmount("");
      setDestinationTag("");
      setTxHash(txHash);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col items-center p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold'>Account Information</h2>
      <div className='mt-4'>
        <p>
          <strong>Address:</strong> {account.address}
        </p>
        <p>
          <strong>Seed:</strong> {account.seed}
        </p>
        <p className={`text-4xl${balance > 0 ? " text-green-600" : " text-red-600"}`}>
          <strong>Balance: {balance} XRP</strong>
        </p>
      </div>

      <div className='mt-4'>
        <button
          type='button'
          onClick={onCheckOtherAddressBalance}
          className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed'
        >
          Check other address balance
        </button>
      </div>

      {txHash && (
        <div className='mt-4 text-green-600'>
          <p>
            Transaction successful! Hash:{" "}
            <a
              href={`https://testnet.xrpl.org/transactions/${txHash}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {txHash}
            </a>
          </p>
        </div>
      )}

      <div className='mt-6 w-full max-w-md'>
        <h3 className='text-lg font-semibold mb-4'>Send XRP</h3>
        <form onSubmit={handleSendTransaction} className='flex flex-col gap-4'>
          <div>
            <label
              htmlFor='destination'
              className='block text-sm font-medium mb-1'
            >
              Destination Address
            </label>
            <input
              id='destination'
              type='text'
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
              placeholder='Enter destination XRP address'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label htmlFor='amount' className='block text-sm font-medium mb-1'>
              Amount (XRP)
            </label>
            <input
              id='amount'
              type='number'
              step='0.000001'
              min='0.000001'
              max={balance}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder='Enter amount to send'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label htmlFor='memo' className='block text-sm font-medium mb-1'>
              Memo (Optional)
            </label>
            <input
              id='destinationTag'
              value={destinationTag}
              onChange={(e) => setDestinationTag(e.target.value)}
              placeholder='Enter optional destination tag for this transaction'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical'
            />
          </div>

          <button
            type='submit'
            disabled={isSubmitting || !destinationAddress || !amount}
            className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed'
          >
            {isSubmitting ? "Sending..." : "Send XRP"}
          </button>
        </form>
      </div>
    </div>
  );
}
