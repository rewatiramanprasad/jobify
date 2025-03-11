import React from 'react'
import { ThemeToggle } from './ThemeToggle'
import { UserButton } from '@clerk/nextjs'
import LinkDropdown from './LinkDropdown'

function NavBar() {
  return (
    <nav className="bg-muted py-8 sm:px-16 sm:flex-row-reverse lg:px-24 px-4 flex justify-between items-center">
      <LinkDropdown />
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  )
}

export default NavBar
