import { JobType } from '@/utils/types'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { MapPin, Briefcase, CalendarDays, RadioTower } from 'lucide-react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import DeleteJobButton from './DeleteJobButton'
import JobInfo from './JobInfo'
import { Badge } from './ui/badge'
import Link from 'next/link'

function JobCard({ job }: { job: JobType }) {
  const date = new Date(job.createdAt).toLocaleDateString()
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 grid grid-cols-2 gap-4">
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <Badge className="w-32 justify-center">
          <JobInfo
            icon={<RadioTower className="h-4 w-4" />}
            text={job.status}
          />
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild>
          <Link href={`/jobs/${job.id}`}>edit</Link>
        </Button>
        <DeleteJobButton id={job.id } />
      </CardFooter>
    </Card>
  )
}

export default JobCard
