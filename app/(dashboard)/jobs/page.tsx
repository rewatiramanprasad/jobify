import JobList from '@/components/JobList'
import SearchForm from '@/components/SearchForm'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getAllJobAction } from '@/utils/actions'

function AllJobPage() {
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ['jobs', '', 'all', 1],
    queryFn: () => getAllJobAction({}),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      <JobList />
    </HydrationBoundary>
  )
}

export default AllJobPage
