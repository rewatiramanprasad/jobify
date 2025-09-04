'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  createAndEditJobSchema,
  createAndEditJobType,
  JobStatus,
  JobMode,
} from '@/utils/types'
import { CustomFormField, CustomFormSelect } from './FormComponents'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createJobAction } from '@/utils/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function CreateJobForm() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const form = useForm<createAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  })
  const { mutate, isPending } = useMutation({
    mutationFn: (values: createAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast('something went wrong')
        return
      }
      toast('Job Added')
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      queryClient.invalidateQueries({ queryKey: ['charts'] })
      form.reset()
      router.push('/jobs')
    },
  })

  function onSubmit(values: createAndEditJobType) {
    console.log('working1', values)
    mutate(values)
    console.log('working2')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" bg-muted p-8 rounded "
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">Add Job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          <CustomFormField name="position" control={form.control} />
          <CustomFormField name="company" control={form.control} />
          <CustomFormField name="location" control={form.control} />
          <CustomFormSelect
            name="status"
            control={form.control}
            items={Object.values(JobStatus)}
          />
          <CustomFormSelect
            name="mode"
            control={form.control}
            items={Object.values(JobMode)}
          />

          <Button type="submit" className="self-end capitalize">
            {isPending ? 'loading..' : 'create job'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
