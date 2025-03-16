'use client'
import { getAllJobAction } from '@/utils/actions'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import JobCard from './JobCard'

function JobList() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const jobStatus = searchParams.get('jobStatus') || 'all'
  const page = Number(searchParams.get('page') || '1')
  const { data, isPending } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getAllJobAction({}),
  })
  const jobs = data?.jobs || []
  if (isPending) return <h2 className="text-xl">Please Wait...</h2>
  if (jobs.length < 1) return <h2 className="text-xl"> No Jobs found...</h2>
  return (
    <>
      <div className="grid md:grid-cols-2  gap-8">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}

export default JobList
