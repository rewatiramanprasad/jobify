'use client'
import { getAllJobAction } from '@/utils/actions'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import JobCard from './JobCard'
import ButtonContainer from './ButtonContainer'
import ComplexButtonContainer from './ComplexButtonContainer'

function JobList() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const jobStatus = searchParams.get('jobStatus') || 'all'
  const page = Number(searchParams.get('page') || '1')
  const { data, isPending } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getAllJobAction({}),
  })
  const count = data?.count || 0
  const totalPages = data?.totalPages || 0
  const jobs = data?.jobs || []
  if (isPending) return <h2 className="text-xl">Please Wait...</h2>
  if (jobs.length < 1) return <h2 className="text-xl"> No Jobs found...</h2>
  return (
    <>
      <div className="flex items-center justify-between  mt-8 mb-8">
        <h2 className="text-xl font-semibold capitalize ">
          {count} jobs found
        </h2>
        {totalPages < 2 ? null : (
          <ComplexButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>
      <div className="grid md:grid-cols-2  gap-8">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}

export default JobList
