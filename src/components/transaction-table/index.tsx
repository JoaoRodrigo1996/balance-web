import { useContext, useEffect, useRef, useState } from 'react'
import { CircleOff, Loader2, Trash } from 'lucide-react'
import autoAnimate from '@formkit/auto-animate'

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
import { dateFormatter } from '@/utils/date-formatter'
import { priceFormatter } from '@/utils/price-formatter'
import { Pagination } from '../pagination'

export function TransactionTable() {
  const [page, setPage] = useState(1)
  const { transactions, fetchTransactions, isLoading } =
    useContext(TransactionContext)

  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  useEffect(() => {
    fetchTransactions(page)
  }, [fetchTransactions, page])

  return (
    <div className="flex flex-col gap-4" ref={parent}>
      <Table className="border">
        <TableHeader>
          <TableRow>
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
                <TableCell>{transaction.title}</TableCell>
                <TableCell>
                  {priceFormatter.format(transaction.amount)}
                </TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{dateFormatter(transaction.createdAt)}</TableCell>
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
