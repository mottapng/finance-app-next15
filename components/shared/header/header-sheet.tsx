'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { navLinks } from '@/constants'
import {
  BarChartBig,
  CreditCard,
  Goal,
  Headphones,
  LineChartIcon,
  Menu,
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
    <SheetClose asChild>
      <Link
        href={href}
        className={`flex items-center gap-3 rounded-lg px-4 py-4 w-full text-foreground transition-all ${
          isActive
            ? 'font-bold bg-gradient-to-tl from-primary to-primary/20'
            : 'hover:bg-primary/10'
        }`}
      >
        {IconComponent}
        <span>{label}</span>
      </Link>
    </SheetClose>
  )
}

export const HeaderSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="mr-auto sm:hidden">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <div className="flex py-4 items-center border-b px-4 justify-center xl:justify-normal">
          <SheetClose asChild>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <BarChartBig strokeWidth={2} className="h-10 text-primary" />
              <span className="text-xl">Fiancy.app</span>
            </Link>
          </SheetClose>
        </div>
        <nav className="grid items-start text-base font-medium space-y-2 mt-2">
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
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-full mt-auto gap-3 rounded-lg px-4 py-4 h-auto text-foreground transition-all text-base font-medium"
            >
              <Settings2 size={20} />
              <span className="mr-auto">Settings</span>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-full mt-auto gap-3 rounded-lg px-4 py-4 h-auto text-foreground transition-all text-base font-medium"
            >
              <Headphones size={20} />
              <span className="mr-auto">Help & Support</span>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
