'use client'

import { useContext } from 'react'
import { User } from 'lucide-react'

import { ModeToggle } from './mode-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from './ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { AuthContext } from '@/contexts/auth-context'

export function Header() {
  const { signOut, client } = useContext(AuthContext)

  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between border-b px-6 py-3">
      <h1 className="text-2xl font-bold uppercase">Balance</h1>
      <div className="flex items-center gap-6">
        <ModeToggle />

        <Separator orientation="vertical" className="h-6" />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{client?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
