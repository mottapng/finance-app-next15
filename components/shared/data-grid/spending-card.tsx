import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, Ham, ShoppingBag } from 'lucide-react'

export const SpendingCard = () => {
  return (
    <Card className="row-span-2 flex flex-col">
      <CardHeader>
        <CardTitle>Most Spending</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 flex-1">
        <div className="bg-secondary rounded-md flex-1 p-2 flex flex-col">
          <div className="rounded-full bg-primary mr-auto p-2">
            <Ham size={16} className="text-background/90" />
          </div>
          <p className="text-xs font-medium mt-2">Food and Beverages</p>
          <h2 className="text-xl">
            $4,200<span className="text-muted-foreground">.00</span>
          </h2>
          <Badge
            className="bg-background mt-auto ml-auto hover:bg-background/70"
            variant="secondary"
          >
            <span className="text-xs font-medium whitespace-nowrap flex">
              30 Transactions
              <ArrowUpRight size={14} className="ml-1 my-auto" />
            </span>
          </Badge>
        </div>
        <div className="bg-secondary rounded-md flex-1 p-2 flex flex-col">
          <div className="rounded-full bg-primary mr-auto p-2">
            <ShoppingBag size={16} className="text-background/90" />
          </div>
          <p className="text-xs font-medium mt-2">Shopping</p>
          <h2 className="text-xl">
            $2,600<span className="text-muted-foreground">.00</span>
          </h2>
          <Badge
            className="bg-background mt-auto ml-auto hover:bg-background/70"
            variant="secondary"
          >
            <span className="text-xs font-medium whitespace-nowrap flex">
              26 Transactions
              <ArrowUpRight size={14} className="ml-1 my-auto" />
            </span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
