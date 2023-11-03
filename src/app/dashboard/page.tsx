'use client'

import { Header } from '@/components/header'
import { Summary } from '@/components/summary'
import { TransactionTable } from '@/components/transaction-table'
import { TransactionContext } from '@/contexts/transaction-context'
import { useContext, useEffect } from 'react'

export default function SignIn() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
        <Summary />
        <section className="flex flex-col gap-6">
          <TransactionTable />
        </section>
      </main>
    </>
  )
}
