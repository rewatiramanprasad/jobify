import { CreateJobForm } from '@/components/CreateJobForm'
import React from 'react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

function page() {
  const queryClient = new QueryClient()
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CreateJobForm />
      </HydrationBoundary>
    </div>
  )
}

export default page
