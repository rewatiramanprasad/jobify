'use client'
import React from 'react'
import { Form } from './ui/form'
import { CustomFormField, CustomFormSelect } from './FormComponents'
import {
  createAndEditJobType,
  createAndEditJobSchema,
  JobMode,
  JobStatus,
} from '@/utils/types'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getSingleJobAction, updateJobAction } from '@/utils/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function EditJobForm({ id }: { id: string }) {
  const router = useRouter()
  const queryClient = new QueryClient()
  const { data } = useQuery({
    queryKey: ['job', id],
    queryFn: () => getSingleJobAction({ id }),
  })
  console.log(id);
  
  console.log(data);
  
  const form = useForm<createAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || '',
      company: data?.company || '',
      location: data?.company || '',
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  })
  const { mutate, isPending } = useMutation({
    mutationFn: (values: createAndEditJobType) =>
      updateJobAction({ id, values }),
    onSuccess: (data) => {
      if (!data) {
        toast('There was a error')
        return
      }
      queryClient.invalidateQueries({ queryKey: ['job'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      queryClient.invalidateQueries({ queryKey: ['job', id] })
      router.push('/jobs')
    },
  })

  function onSubmitHandler(values: createAndEditJobType) {
    mutate(values)
  }
  return (
    <Form {...form}>
      <form
        className="bg-muted p-8 rounded"
        onSubmit={form.handleSubmit(onSubmitHandler)}
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">edit job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-center">
          <CustomFormField name="position" control={form.control} />
          <CustomFormField name="company" control={form.control} />
          <CustomFormField name="location" control={form.control} />
          <CustomFormSelect
            name="status"
            items={Object.values(JobStatus)}
            control={form.control}
          />
          <CustomFormSelect
            name="mode"
            items={Object.values(JobMode)}
            control={form.control}
          />
          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}
          >
            {isPending ? 'updating... ' : 'Edit'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditJobForm
