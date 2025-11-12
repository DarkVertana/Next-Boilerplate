'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface User {
  id: number
  email: string
  name?: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      console.log('Dashboard: Checking auth...')
      console.log('Dashboard: All cookies:', document.cookie)

      const cookies = document.cookie.split(';').map(c => c.trim())
      console.log('Dashboard: Parsed cookies:', cookies)

      const userCookie = cookies.find(cookie => cookie.startsWith('user='))
      console.log('Dashboard: User cookie found:', userCookie)

      if (userCookie) {
        try {
          const cookieValue = userCookie.split('=')[1]
          console.log('Dashboard: Cookie value:', cookieValue)
          const userData = JSON.parse(decodeURIComponent(cookieValue))
          console.log('Dashboard: Parsed user data:', userData)
          setUser(userData)
        } catch (error) {
          console.error('Dashboard: Error parsing user cookie:', error)
          router.push('/login')
        }
      } else {
        console.log('Dashboard: No user cookie found, redirecting to login')
        router.push('/login')
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div>
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Welcome back{user.name ? `, ${user.name}` : ''}!
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Great to see you again. Here's your dashboard overview.
            </p>
          </div>
        </div>

        <div className="w-full max-w-2xl space-y-8">
          {/* User Profile Section */}
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Email</p>
                <p className="text-lg font-medium text-black dark:text-zinc-50">{user.email}</p>
              </div>
              {user.name && (
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Name</p>
                  <p className="text-lg font-medium text-black dark:text-zinc-50">{user.name}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">User ID</p>
                <p className="text-lg font-medium text-black dark:text-zinc-50">#{user.id}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Account Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center justify-center h-12 px-4 border border-zinc-300 dark:border-zinc-600 rounded-lg text-black dark:text-zinc-50 font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
                Update Profile
              </button>
              <button className="flex items-center justify-center h-12 px-4 border border-zinc-300 dark:border-zinc-600 rounded-lg text-black dark:text-zinc-50 font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
                Change Password
              </button>
              <button className="flex items-center justify-center h-12 px-4 border border-zinc-300 dark:border-zinc-600 rounded-lg text-black dark:text-zinc-50 font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
                View Settings
              </button>
              <button className="flex items-center justify-center h-12 px-4 border border-zinc-300 dark:border-zinc-600 rounded-lg text-black dark:text-zinc-50 font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
                Help & Support
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">Account Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">1</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Login Sessions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">0</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">0</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Achievements</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <button
            onClick={handleLogout}
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
          >
            Logout
          </button>
          <a
            href="/"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 text-white transition-colors hover:bg-blue-700 md:w-[158px]"
          >
            Back to Home
          </a>
        </div>
      </main>
    </div>
  )
}
