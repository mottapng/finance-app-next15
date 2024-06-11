import { BalanceCard } from './balance-card'
import { ExpensesCard } from './expenses-card'
import { FeaturedCard } from './featured-card'
import { Head } from './head'
import { IncomeCard } from './income-card'
import { SavingCard } from './saving-card'
import { SpendingCard } from './spending-card'

export const DataGrid = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Head />
      <div className="grid grid-cols-3 grid-rows-5 gap-4 flex-1 mt-6 max-h-full">
        <BalanceCard />
        <SpendingCard />
        <SavingCard />
        <IncomeCard />
        <ExpensesCard />
        <FeaturedCard />
      </div>
    </div>
  )
}
