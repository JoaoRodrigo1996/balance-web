'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Separator } from './ui/separator'
import { Label } from './ui/label'
import { Input } from './ui/input'

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from './ui/button'
import { TransactionContext } from '@/contexts/transaction-context'
import { useContext } from 'react'
import { useToast } from './ui/use-toast'

const transactionBodySchema = z.object({
  title: z.string(),
  amount: z.coerce.number(),
  type: z.enum(['INCOME', 'OUTCOME']),
})

export type TransactionFormData = z.infer<typeof transactionBodySchema>

export function NewTransactionModal() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionBodySchema),
    defaultValues: {
      type: 'INCOME',
    },
  })

  const { toast } = useToast()

  const { createTransaction } = useContext(TransactionContext)

  async function handleCreateNewTransaction(data: TransactionFormData) {
    try {
      await createTransaction(data)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Não foi possível criar uma nova transação',
        description:
          'Verifique se todos os campos estão preenchido corretamente.',
      })
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>New transaction</DialogTitle>
        <DialogDescription>
          Here you can create a new transaction to manage you finances.
        </DialogDescription>
      </DialogHeader>
      <Separator />

      <form
        onSubmit={handleSubmit(handleCreateNewTransaction)}
        className="space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="title">title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Web development..."
            required
            {...register('title')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="$1.000"
            required
            {...register('amount')}
          />
        </div>
        <Controller
          control={control}
          name="type"
          render={({ field }) => {
            return (
              <RadioGroup
                defaultValue="INCOME"
                className="group flex divide-x-2 rounded-sm border"
                onValueChange={field.onChange}
                value={field.value}
              >
                <div className="flex flex-1 items-center justify-center space-x-2 p-4">
                  <RadioGroupItem
                    value="INCOME"
                    id="income"
                    className="transition-all  data-[state=checked]:border-emerald-400 data-[state=checked]:bg-emerald-500/20 data-[state=checked]:text-emerald-400"
                  />
                  <Label htmlFor="income" className="hover:cursor-pointer">
                    INCOME
                  </Label>
                </div>
                <div className="flex flex-1 items-center justify-center space-x-2 p-4 ">
                  <RadioGroupItem
                    value="OUTCOME"
                    id="outcome"
                    className="transition-all  data-[state=checked]:border-red-400 data-[state=checked]:bg-red-500/20 data-[state=checked]:text-red-400"
                  />
                  <Label htmlFor="outcome" className="hover:cursor-pointer">
                    OUTCOME
                  </Label>
                </div>
              </RadioGroup>
            )
          }}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full disabled:cursor-not-allowed"
        >
          Create
        </Button>
      </form>
    </>
  )
}
