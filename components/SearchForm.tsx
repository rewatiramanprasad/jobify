'use client'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { JobStatus } from '@/utils/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function SearchForm() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const jobStatus = searchParams.get('jobStatus') || 'all'
  const pathname = usePathname()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = new URLSearchParams()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search') as string
    const jobStatus = formData.get('jobStatus') as string
    params.set('search', search)
    params.set('jobStatus', jobStatus)

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <main className=" bg-muted p-8">
      <form className=" grid lg:grid-cols-3 gap-6" onSubmit={handleSubmit}>
        <Input type="text" name="search" defaultValue={search} />

        <Select name="jobStatus" defaultValue={jobStatus}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="all" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {['all', ...Object.values(JobStatus)].map((item) => {
                return (
                  <SelectItem value={item} key={item}>
                    {item}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button>Search</Button>
      </form>
    </main>
  )
}

export default SearchForm
