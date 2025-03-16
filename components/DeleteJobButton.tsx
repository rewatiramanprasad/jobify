import React from 'react'
import { Button } from './ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteJobAction } from '@/utils/actions'
import { toast } from 'sonner'

function DeleteJobButton({ id }: { id: string }) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction({ id }),
    onSuccess: (data) => {
      if (!data) {
        toast('there was an error')
        return
      }
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      queryClient.invalidateQueries({ queryKey: ['charts'] })
      toast('job removed')
    },
  })

  return (
    <Button
      onClick={() => {
        mutate(id)
      }}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </Button>
  )
}

export default DeleteJobButton
