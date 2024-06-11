'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export const IncomeCard = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(59), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="row-span-2 flex flex-col gap-2">
      <CardHeader className="flex-row gap-2 justify-between">
        <div>
          <CardTitle>Income</CardTitle>
          <div className="flex mt-1">
            <h1 className="text-4xl">
              $2,950<span className="text-muted-foreground">.00</span>
            </h1>
            <Badge className="mb-auto px-[6px] py-[1px] font-medium text-destructive bg-destructive/30 hover:bg-destructive/50 mt-1 ml-2">
              -12%
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-secondary hover:bg-secondary/90"
        >
          <ArrowUpRight size={18} className="text-secondary-foreground" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex h-full flex-col gap-1">
          <b className="mt-auto text-xs text-muted-foreground">
            Target <span className="text-primary">$5,000</span>
          </b>
          <Progress
            value={progress}
            className="h-full rounded-lg"
            indicatorClassName="bg-gradient-to-br from-background/20 to-primary rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  )
}
