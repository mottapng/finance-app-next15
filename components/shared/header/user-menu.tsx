import { signOut } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, UserCircle2 } from 'lucide-react'

interface UserProps {
  name: string
  email: string
  image?: string
}

export const UserMenu = () => {
  const user: UserProps | null = {
    name: 'John Doe',
    email: 'johndoe@email.com',
  }

  function getInitials(name: string) {
    const splitName = name.split(' ')
    if (splitName.length > 1) {
      return (splitName[0][0] + splitName[1][0]).toUpperCase()
    } else {
      return name.slice(0, 2).toUpperCase()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          {user ? (
            <div className="flex items-center space-x-2">
              <Avatar>
                {user.image && <AvatarImage src={user.image} />}
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <h3 className="text-base">{user.name}</h3>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <ChevronDown
                size={18}
                className="text-muted-foreground mt-1 hidden sm:block"
              />
            </div>
          ) : (
            <UserCircle2 size={40} />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <b>My Account</b>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <form
          action={async () => {
            'use server'

            await signOut()
          }}
        >
          <DropdownMenuItem>
            <button type="submit">Sign out</button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
