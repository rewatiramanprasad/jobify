'use server'
import { redirect } from 'next/navigation'
import { createAndEditJobSchema, createAndEditJobType, JobType } from './types'
import db from '@/utils/db'
import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'
export async function authenticateAndRedirect(): Promise<string> {
  const { userId } = await auth()
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

type getAllJobActionTypes = {
  search?: string
  jobStatus?: string
  page?: number
  limit?: number
}

export async function getAllJobAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: getAllJobActionTypes): Promise<{
  jobs: JobType[]
  count: number
  page: number
  totalPages: number
}> {
  const userId = await authenticateAndRedirect()
  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    }
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      }
    }

    if (jobStatus && jobStatus !== 'all') {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      }
    }
    const skip = (page - 1) * limit

    const jobs = await db.job.findMany({
      skip: skip,
      take: limit,
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    })
    const count: number = await db.job.count({ where: whereClause })
    const totalPages = Math.ceil(count / limit)
    return { jobs: jobs, count: count, page, totalPages: totalPages }
  } catch (error) {
    console.error(error)
    return { jobs: [], count: 0, page: 1, totalPages: 0 }
  }
}

export async function deleteJobAction({
  id,
}: {
  id: string
}): Promise<JobType | null> {
  const userId = await authenticateAndRedirect()

  try {
    const response = await db.job.delete({
      where: {
        id: id,
        clerkId: userId,
      },
    })
    return response
  } catch (error) {
    console.error(error)
    return null
  }
}
