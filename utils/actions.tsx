'use server'
import { redirect } from 'next/navigation'
import { createAndEditJobSchema, createAndEditJobType, JobType } from './types'
import db from '@/utils/db'
import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'
import prisma from '@/utils/db'
import dayjs from 'dayjs'

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

export async function getSingleJobAction({
  id,
}: {
  id: string
}): Promise<JobType | null> {
  let job: JobType | null = null
  const userId = await authenticateAndRedirect()
  try {
    job = await db.job.findFirst({
      where: {
        id: id,
        clerkId: userId,
      },
    })
  } catch (error) {
    console.error(error)
    job = null
  }
  if (!job) {
    redirect('/jobs')
  }
  return job
}
export async function updateJobAction({
  id,
  values,
}: {
  id: string
  values: createAndEditJobType
}): Promise<JobType | null> {
  let job: JobType | null = null
  const userId = await authenticateAndRedirect()
  try {
    job = await db.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    })
  } catch (error) {
    console.error(error)
    job = null
  }

  return job
}
export async function getStatsAction(): Promise<{
  pending: number
  interview: number
  declined: number
}> {
  const userId = await authenticateAndRedirect()

  try {
    const stats = await db.job.groupBy({
      where: {
        clerkId: userId,
      },
      by: ['status'],
      _count: {
        status: true,
      },
    })
    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status
      return acc
    }, {} as Record<string, number>)

    const defaultStats = {
      pending: 0,
      interview: 0,
      declined: 0,
      ...statsObject,
    }
    return defaultStats
  } catch (error) {
    console.error(error)
    redirect('/jobs')
  }
}

export async function getChartsDataAction(): Promise<
  Array<{ date: string; count: number }>
> {
  const userId = await authenticateAndRedirect()
  const sixMonthsAgo = dayjs().subtract(6, 'month').toDate()
  try {
    const jobs = await prisma.job.findMany({
      where: {
        clerkId: userId,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    let applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YY')

      const existingEntry = acc.find((entry) => entry.date === date)

      if (existingEntry) {
        existingEntry.count += 1
      } else {
        acc.push({ date, count: 1 })
      }

      return acc
    }, [] as Array<{ date: string; count: number }>)

    return applicationsPerMonth
  } catch (error) {
    redirect('/jobs')
  }
}
