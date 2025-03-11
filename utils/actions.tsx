import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { createAndEditJobSchema, createAndEditJobType, JobType } from './types'
import db from '@/utils/db'
export async function authenticateAndRedirect(): Promise<string> {
  const { userId } = auth()
  if (!userId) {
    redirect('/')
  }
  return userId
}

export async function createJobAction(
  values: createAndEditJobType
): Promise<JobType | null> {
  //   await new Promise((resolve) => setTimeout(resolve, 3000))
  const userId = await authenticateAndRedirect()
  try {
    createAndEditJobSchema.parse(values)
    const job: JobType = await db.job.create({
      data: {
        ...values,

        clerkId: userId,
      },
    })
    return job
  } catch (error) {
    console.log(error)
    return null
  }
}

