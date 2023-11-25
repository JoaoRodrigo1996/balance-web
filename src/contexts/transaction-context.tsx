'use client'

import { api } from '@/lib/axios'
import { ReactNode, createContext, useCallback, useState } from 'react'

interface Transaction {
  id: string
  title: string
  amount: number
  type: 'INCOME' | 'OUTCOME'
  createdAt: string
}

interface CreateTransactionInput {
  title: string
  amount: number
  type: 'INCOME' | 'OUTCOME'
}

interface TransactionContext {
  transactions: Transaction[]
  isLoading: boolean
  createTransaction: (data: CreateTransactionInput) => void
  fetchTransactions: (query?: number) => Promise<void>
}

interface TransactionContextProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContext)

export function TransactionContextProvider({
  children,
}: TransactionContextProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTransactions = useCallback(async (query?: number) => {
    setIsLoading(true)
    const response = await api.get('/transactions', {
      params: { page: query },
    })

    setTransactions(response.data.transactions)
    setIsLoading(false)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { title, amount, type } = data

      const response = await api.post('/transactions', {
        title,
        amount,
        type,
      })

      setTransactions((state) => [response.data, ...state])
      fetchTransactions()
    },
    [fetchTransactions],
  )

  return (
    <TransactionContext.Provider
      value={{ transactions, isLoading, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
