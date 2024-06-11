import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export const FeaturedCard = () => {
  return (
    <Card className="bg-gradient-to-br from-primary/30 to-primary flex p-4">
      <h1 className="font-medium text-xl leading-[26px]">
        How to manage your expenses?
      </h1>
      <Badge className="ml-auto mt-auto bg-background" variant="secondary">
        <span className="text-base whitespace-nowrap">Learn More</span>
      </Badge>
    </Card>
  )
}
