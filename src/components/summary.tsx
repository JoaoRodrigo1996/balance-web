'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSummary } from '@/hooks/useSummary'
import { priceFormatter } from '@/utils/price-formatter'
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'

export function Summary() {
  const summary = useSummary()

  return (
    <section className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader className="item-center flex flex-row justify-between">
          <CardTitle>INCOME</CardTitle>
          <ArrowUpCircle className="h-5 w-5 text-emerald-400" />
        </CardHeader>
        <CardContent className="flex flex-col">
          <span className="font-mono text-xl font-bold">
            {priceFormatter.format(summary.INCOME)}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            13% more than last month
          </span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="item-center flex flex-row justify-between">
          <CardTitle>OUTCOME</CardTitle>
          <ArrowDownCircle className="h-5 w-5 text-red-400" />
        </CardHeader>
        <CardContent className="flex flex-col">
          <span className="font-mono text-xl font-bold">
            {priceFormatter.format(summary.OUTCOME)}
          </span>
          <span className="text-sm font-medium  text-muted-foreground">
            13% more than last month
          </span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="item-center flex flex-row justify-between">
          <CardTitle>Total Revenue</CardTitle>
          <DollarSign className="h-5 w-5 text-zinc-100" />
        </CardHeader>
        <CardContent className="flex flex-col">
          <span className="font-mono text-xl font-bold">
            {priceFormatter.format(summary.total)}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            13% more than last month
          </span>
        </CardContent>
      </Card>
    </section>
  )
}
