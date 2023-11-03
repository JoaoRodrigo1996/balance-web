import { TransactionContext } from '@/contexts/transaction-context'
import { useContext, useMemo } from 'react'

export function useSummary() {
  const { transactions } = useContext(TransactionContext)

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'INCOME') {
          acc.INCOME += transaction.amount
          acc.total += transaction.amount
        } else {
          acc.OUTCOME -= transaction.amount
          acc.total -= transaction.amount
        }

        return acc
      },
      {
        total: 0,
        INCOME: 0,
        OUTCOME: 0,
      },
    )
  }, [transactions])

  return summary
}
