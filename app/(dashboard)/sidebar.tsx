'use client'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/assets/logo.svg'
import { NavLink } from '@/utils/links'



function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="py-4 px-8 bg-muted h-full ">
      <Image src={Logo} alt="logo" />
      <div className="flex flex-col gap-y-4 mt-20">
        {NavLink.map((link) => {
          const isActive = link.link === pathname
          const variants = isActive ? 'default' : 'link'
          return (
            <Button
              className="w-full"
              asChild
              variant={variants}
              key={link.link}
            >
              <Link href={link.link} className=" flex gap-x-2 items-center ">
                {link.icon}
                {link.label}
              </Link>
            </Button>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar
