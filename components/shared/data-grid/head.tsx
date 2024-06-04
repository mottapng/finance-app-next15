import { Button } from '@/components/ui/button'
import { ArrowDownToLine, Plus, Upload } from 'lucide-react'

export const Head = () => {
  return (
    <div className="grid grid-cols-3 items-center md:col-span-3 gap-4">
      <div className="col-span-2 flex gap-4 justify-between items-end">
        <div>
          <h1 className="text-5xl font-medium">Hi John✌️</h1>
          <p className="text-lg text-muted-foreground">
            Here&apos;s what&apos;s happening with your money today
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-secondary-foreground xl:hidden"
        >
          <Upload size={18} className="text-secondary-foreground" />
        </Button>
      </div>
      <div className="mt-auto flex gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-secondary-foreground hidden xl:flex"
        >
          <Upload size={18} className="text-secondary-foreground" />
        </Button>
        <Button
          variant="secondary"
          className="flex-grow gap-2 text-base hidden lg:flex"
        >
          <ArrowDownToLine size={16} />
          <span className="mr-1">Withdraw</span>
        </Button>
        <Button className="flex-grow flex gap-2 text-base">
          <Plus size={16} />
          <span className="mr-1 hidden lg:block">Deposit</span>
          <span className="mr-1 lg:hidden">Transaction</span>
        </Button>
      </div>
    </div>
  )
}
