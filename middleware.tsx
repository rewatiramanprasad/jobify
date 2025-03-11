import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/add-job', '/jobs(.*)', '/stats'])

export default clerkMiddleware(async(auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
