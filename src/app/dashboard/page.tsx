'use client'

import { Header } from '@/components/header'
import { Summary } from '@/components/summary'
import { TransactionTable } from '@/components/transaction-table'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { NewTransactionModal } from '@/components/new-transaction-modal'

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
