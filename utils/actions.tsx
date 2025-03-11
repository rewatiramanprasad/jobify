'use server'
import { redirect } from 'next/navigation'
import { createAndEditJobSchema, createAndEditJobType, JobType } from './types'
import db from '@/utils/db'
import { auth } from '@clerk/nextjs/server'
export async function authenticateAndRedirect(): Promise<string> {
  console.log('hello....')
  const { userId } = await auth()
  console.log(userId)
  if (!userId) {
    redirect('/')
  }
  return userId
}

export async function createJobAction(
  values: createAndEditJobType
): Promise<JobType | null> {
  //   await new Promise((resolve) => setTimeout(resolve, 3000))
  console.log('working 3')
  const userId = await authenticateAndRedirect()
  console.log(userId)
  try {
    createAndEditJobSchema.parse(values)
    console.log('working 4')
    const job: JobType = await db.job.create({
      data: {
        ...values,

        clerkId: userId,
      },
    })
    console.log('working 5')
    return job
  } catch (error) {
    console.log(error)
    return null
  }
}
