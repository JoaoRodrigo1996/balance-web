'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSummary } from '@/hooks/useSummary'
import { priceFormatter } from '@/utils/price-formatter'
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'

export function Summary() {
  const summary = useSummary()

  return (
    <section className="flex flex-col justify-between gap-2 md:grid md:grid-cols-3 md:gap-4">
      <Card>
        <CardHeader className="item-center flex flex-row justify-between">
          <CardTitle className="text-sm lg:text-base">INCOME</CardTitle>
          <ArrowUpCircle className="h-4 w-4 text-emerald-400 lg:h-5 lg:w-5" />
        </CardHeader>
        <CardContent className="flex flex-col">
          <span className="font-mono text-lg font-bold lg:text-xl">
            {priceFormatter.format(summary.INCOME)}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            13% more than last month
          </span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="item-center flex flex-row justify-between">
          <CardTitle className="text-sm lg:text-base">OUTCOME</CardTitle>
          <ArrowDownCircle className="h-4 w-4 text-red-400 lg:h-5 lg:w-5" />
        </CardHeader>
        <CardContent className="flex flex-col">
          <span className="font-mono text-lg font-bold lg:text-xl">
            {priceFormatter.format(summary.OUTCOME)}
          </span>
          <span className="text-sm font-medium  text-muted-foreground">
            13% more than last month
          </span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="item-center flex flex-row justify-between">
          <CardTitle className="text-sm lg:text-base">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4  text-zinc-100 lg:h-5 lg:w-5" />
        </CardHeader>
        <CardContent className="flex flex-col">
          <span className="font-mono text-lg font-bold lg:text-xl">
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
