'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DonutChart } from '@/components/ui/donut-chart'
import { useMeasure } from '@uidotdev/usehooks'
import { CircleFadingPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
]

export const SavingCard = () => {
  const [ref, { width, height }] = useMeasure()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(75), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="row-span-2 flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Saving</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-full flex gap-2 justify-between">
          <div className="flex flex-col mt-1">
            <h1 className="text-4xl">
              $2,950<span className="text-muted-foreground">.00</span>
            </h1>
            <span className="ml-auto text-primary">/$8000</span>
            <Button className="mr-auto mt-auto pl-3" variant="outline">
              <CircleFadingPlus size={16} className="mr-2" />
              New Goal
            </Button>
          </div>
          <div ref={ref} className="max-h-44 mt-auto h-full">
            <DonutChart
              value={progress}
              size={(height || 0) - 10}
              strokeWidth={(height || 0) / 5}
              className="ml-auto mt-auto"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
