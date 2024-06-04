import { Button } from '@/components/ui/button'
import { ArrowDownToLine, Plus, Upload } from 'lucide-react'

export const Head = () => {
  return (
    <div className="grid grid-cols-3 items-center md:col-span-3 gap-4">
      <div className="col-span-2">
        <h1 className="text-6xl font-medium">Hi John✌️</h1>
        <p className="text-lg text-muted-foreground">
          Here&apos;s what&apos;s happening with your money today
        </p>
      </div>
      <div className="mt-auto flex gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-secondary-foreground"
        >
          <Upload size={18} className="text-secondary-foreground" />
        </Button>
        <Button variant="secondary" className="flex-grow flex gap-2 text-lg">
          <ArrowDownToLine size={20} />
          <span className="mr-1">Withdraw</span>
        </Button>
        <Button className="flex-grow flex gap-2 text-lg">
          <Plus size={20} />
          <span className="mr-1">Deposit</span>
        </Button>
      </div>
    </div>
  )
}
