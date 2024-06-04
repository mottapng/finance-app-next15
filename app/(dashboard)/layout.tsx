import { Header } from '@/components/shared/header'
import { Sidebar } from '@/components/shared/sidebar'

type Props = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <main className="flex bg-secondary">
      <Sidebar />

      <div className="flex h-screen flex-1 flex-col pb-6 max-md:pb-14">
        <Header />
        <section>{children}</section>
      </div>
    </main>
  )
}

export default DashboardLayout
