'use client'

import { Button } from '@/components/ui/button'
import { navLinks } from '@/constants'
import {
  BarChartBig,
  CreditCard,
  Goal,
  Headphones,
  LineChartIcon,
  Settings2,
  ShoppingBag,
  UsersRound,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type IconKey = 'Chart' | 'Card' | 'ShoppingBag' | 'Users' | 'Goal'

interface NavLinkProps {
  href: string
  icon: IconKey
  label: string
}

const iconMap: Record<IconKey, JSX.Element> = {
  Chart: <LineChartIcon size={20} />,
  Card: <CreditCard size={20} />,
  ShoppingBag: <ShoppingBag size={20} />,
  Users: <UsersRound size={20} />,
  Goal: <Goal size={20} />,
}

const NavLink = ({ href, icon, label }: NavLinkProps) => {
  const pathname = usePathname()

  const isActive =
    (pathname.includes(href) && href.length > 1) || pathname === href

  const IconComponent = iconMap[icon]

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-4 py-4 w-full text-foreground transition-all ${
        isActive
          ? 'font-bold bg-gradient-to-tl from-primary to-primary/20'
          : 'hover:bg-primary/10'
      }`}
    >
      {IconComponent}
      <span className="hidden xl:block">{label}</span>
    </Link>
  )
}

export const Sidebar = () => {
  return (
    <div className="border-r bg-background hidden sm:block xl:w-1/6 max-w-60">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex py-4 items-center border-b px-4 justify-center xl:justify-normal">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BarChartBig strokeWidth={2} className="h-10 text-primary" />
            <span className="text-xl hidden xl:block">Fiancy.app</span>
          </Link>
        </div>
        <div className="flex-1 px-4 h-full flex flex-col my-2">
          <nav className="grid items-start text-base font-medium space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                icon={link.icon as IconKey}
                label={link.label}
              />
            ))}
          </nav>
          <div className="mt-auto h-fit">
            <Button
              variant="ghost"
              size="icon"
              className="w-full mt-auto gap-3 rounded-lg xl:px-4 py-4 h-auto text-foreground transition-all text-base font-medium"
            >
              <Settings2 size={20} />
              <span className="mr-auto hidden xl:block">Settings</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-full mt-auto gap-3 rounded-lg xl:px-4 py-4 h-auto text-foreground transition-all text-base font-medium"
            >
              <Headphones size={20} />
              <span className="mr-auto hidden xl:block">Help & Support</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
