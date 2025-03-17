import EditJobForm from '@/components/EditJobForm'
import { getSingleJobAction } from '@/utils/actions'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import React from 'react'

async function jobDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ['job', id],
    queryFn: () => getSingleJobAction({ id }),
  })

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EditJobForm id={id} />
      </HydrationBoundary>
    </>
  )
}

export default jobDetailsPage
