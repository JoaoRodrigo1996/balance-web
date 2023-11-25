'use client'

import { Plus } from 'lucide-react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { NewTransactionModal } from '@/components/new-transaction-modal'
import { TransactionTable } from '@/components/transaction-table'
import { Summary } from '@/components/summary'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'

export default function SignIn() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
        <Summary />
        <section className="flex flex-col gap-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="ml-auto gap-2">
                <Plus className="h-4 w-4" />
                Novo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <NewTransactionModal />
            </DialogContent>
          </Dialog>
          <TransactionTable />
        </section>
      </main>
    </>
  )
}
