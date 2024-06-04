import { HeaderSheet } from './header-sheet'
import { ThemeMenu } from './theme-menu'
import { UserMenu } from './user-menu'

export const Header = () => {
  return (
    <div className="bg-background">
      <div className="container px-6 sm:px-14 flex items-center w-full py-4">
        <HeaderSheet />

        <div className="flex ml-auto">
          <ThemeMenu />
          <UserMenu />
        </div>
      </div>
    </div>
  )
}
