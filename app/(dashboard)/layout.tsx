import { Header } from '@/components/shared/header'
import { Sidebar } from '@/components/shared/sidebar'

type Props = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <main className="flex bg-secondary">
      <Sidebar />

      <div className="flex h-screen flex-1 flex-col">
        <Header />
        <section className="h-full">{children}</section>
      </div>
    </main>
  )
}

export default DashboardLayout
