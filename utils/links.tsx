import { AreaChart, Layers, AppWindow } from 'lucide-react'
interface NavLink {
  label: string
  link: string
  icon: React.ReactNode
}

export const NavLink: NavLink[] = [
  { label: 'Add Job', link: '/add-job', icon: <Layers /> },
  { label: 'Jobs', link: '/jobs', icon: <AppWindow /> },
  { label: 'stats', link: '/stats', icon: <AreaChart /> },
]
