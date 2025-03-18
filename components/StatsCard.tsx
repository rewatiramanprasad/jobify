import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'

function StatsCard({ title, value }: { title: string; value: number }) {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription className="text-4xl font-extrabold text-primary mt-[0px\!important]">
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default StatsCard
