import React from 'react'
import type { Wallet } from 'xrpl'

type AccountInfoProps = {
  account: Wallet
}

export default function AccountInfo({ account }: AccountInfoProps) {
  return (
    <div className='flex flex-col items-center p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold'>Account Information</h2>
      <div className='mt-4'>
        <p><strong>Address:</strong> {account.address}</p>
        <p><strong>Seed:</strong> {account.seed}</p>
      </div>
    </div>
  )
}
