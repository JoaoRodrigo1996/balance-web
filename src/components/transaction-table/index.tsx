import { useContext, useEffect, useState } from 'react'
import { CircleOff, Loader, Loader2, Plus, Trash } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '../ui/button'
import { TransactionContext } from '@/contexts/transaction-context'
import { NewTransactionModal } from '../new-transaction-modal'
import { dateFormatter } from '@/utils/date-formatter'
import { priceFormatter } from '@/utils/price-formatter'
import { Pagination } from '../pagination'

export function TransactionTable() {
  const [page, setPage] = useState(1)
  const { transactions, fetchTransactions, isLoading } =
    useContext(TransactionContext)

  useEffect(() => {
    fetchTransactions(page)
  }, [fetchTransactions, page])

  return (
    <div className="flex flex-col gap-4">
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

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created at</TableHead>
          </TableRow>
        </TableHeader>
        {transactions.map((transaction) => {
          return (
            <TableBody key={transaction.id}>
              <TableRow>
                <TableCell className="font-medium">-</TableCell>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>
                  {priceFormatter.format(transaction.amount)}
                </TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{dateFormatter(transaction.createdAt)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          )
        })}
      </Table>

      {isLoading ? (
        <div className="mt-8 flex flex-col items-center justify-end gap-2">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        transactions.length === 0 && (
          <div className="mt-8 flex flex-col items-center justify-end gap-2">
            <CircleOff />
            <span>Você ainda tem transações registradas</span>
          </div>
        )
      )}

      {transactions.length > 0 && (
        <Pagination
          totalCountOfRegisters={transactions.length}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
