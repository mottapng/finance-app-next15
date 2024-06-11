'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { theme } from '@/constants/theme'
import { useMeasure } from '@uidotdev/usehooks'
import { useTheme } from 'next-themes'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'

const data = [
  {
    date: '01/01',
    average: 400,
    today: 240,
  },
  {
    date: '02/01',
    average: 300,
    today: 139,
  },
  {
    date: '03/01',
    average: 200,
    today: 980,
  },
  {
    date: '04/01',
    average: 278,
    today: 390,
  },
  {
    date: '05/01',
    average: 189,
    today: 480,
  },
  {
    date: '06/01',
    average: 239,
    today: 380,
  },
  {
    date: '07/01',
    average: 349,
    today: 430,
  },
]

export const BalanceCard = () => {
  const [ref, { width, height }] = useMeasure()
  const { theme: mode } = useTheme()

  return (
    <Card className="col-span-3 lg:col-span-2 row-span-3 flex flex-col">
      <CardHeader className="flex-row gap-2 justify-between">
        <div>
          <CardTitle>Balance</CardTitle>
          <div className="flex mt-1">
            <h1 className="text-5xl">
              $52,890<span className="text-muted-foreground">.00</span>
            </h1>
            <Badge className="mb-auto px-[6px] py-[1px] font-medium text-primary bg-primary/30 hover:bg-primary/50 mt-1 ml-2">
              +24%
            </Badge>
          </div>
        </div>
        <Select defaultValue="last-6-months">
          <SelectTrigger className="w-fit h-fit gap-2 py-1 px-2 pl-3 text-xs rounded-2xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem className="text-xs" value="last-7-days">
                Last 7 days
              </SelectItem>
              <SelectItem className="text-xs" value="last-30-days">
                Last 30 days
              </SelectItem>
              <SelectItem className="text-xs" value="last-3-months">
                Last 3 months
              </SelectItem>
              <SelectItem className="text-xs" value="last-6-months">
                Last 6 months
              </SelectItem>
              <SelectItem className="text-xs" value="last-1-year">
                Last 1 year
              </SelectItem>
              <SelectItem className="text-xs" value="all-time">
                All time
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1">
        <div ref={ref} className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} width={width || 0} height={height || 0}>
              <CartesianGrid
                vertical={false}
                strokeWidth={2}
                style={
                  {
                    stroke: 'var(--theme-secondary)',
                    '--theme-secondary': `hsl(${
                      theme?.cssVars[mode === 'dark' ? 'dark' : 'light']
                        .secondary
                    })`,
                  } as React.CSSProperties
                }
              />
              <XAxis
                dataKey="date"
                tick={{ fill: 'black' }}
                label={{
                  offset: 0,
                  position: 'insideBottomRight',
                  value: 'Date',
                }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Average
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Today
                            </span>
                            <span className="font-bold">
                              {payload[1].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return null
                }}
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="average"
                activeDot={{
                  r: 6,
                  style: { fill: 'var(--primary)', opacity: 0.25 },
                }}
                style={
                  {
                    stroke: 'var(--theme-primary)',
                    '--theme-primary': `hsl(${
                      theme?.cssVars[mode === 'dark' ? 'dark' : 'light']
                        .destructive
                    })`,
                  } as React.CSSProperties
                }
              />
              <Line
                type="monotone"
                dataKey="today"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: 'var(--primary)', opacity: 0.25 },
                }}
                style={
                  {
                    stroke: 'var(--theme-primary)',
                    '--theme-primary': `hsl(${
                      theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary
                    })`,
                  } as React.CSSProperties
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
