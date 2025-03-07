import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { AlignLeft } from 'lucide-react'
import Link from 'next/link'
import { NavLink } from '@/utils/links'

function LinkDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <Button size={'icon'} variant={'outline'}>
          <AlignLeft />
          <span className="sr-only">Toggle Link</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 lg:hidden"
        align="start"
        sideOffset={25}
      >
        <DropdownMenuGroup>
          {NavLink.map((link) => {
            return (
              <DropdownMenuItem key={link.link}>
                <Link href={link.link} className="flex items-center gap-x-2">
                  {link.icon} <span className="capitalize">{link.label}</span>
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinkDropdown
