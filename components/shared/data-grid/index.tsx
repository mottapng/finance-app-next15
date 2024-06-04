import { BalanceCard } from './balance-card'
import { Head } from './head'

export const DataGrid = () => {
  return (
    <div className="w-full">
      <Head />
      <div className="grid grid-cols-3 gap-4">
        <BalanceCard />
      </div>
    </div>
  )
}
