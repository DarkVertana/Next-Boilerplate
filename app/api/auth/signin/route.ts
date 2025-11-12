import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail, validatePassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    console.log('API: Signin attempt for:', email)

    if (!email || !password) {
      console.log('API: Missing email or password')
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const user = await findUserByEmail(email)
    console.log('API: User found in DB:', user ? { id: user.id, email: user.email } : null)

    if (!user) {
      console.log('API: User not found')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValidPassword = await validatePassword(password, user.password)
    console.log('API: Password validation result:', isValidPassword)

    if (!isValidPassword) {
      console.log('API: Invalid password')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    console.log('API: Authentication successful, setting cookie')
    // For simplicity, we'll use a basic session approach
    // In production, use proper JWT or session management
    const response = NextResponse.json({ message: 'Sign in successful', user: { id: user.id, email: user.email, name: user.name } })

    // Set a simple cookie for session (not secure, just for demo)
    response.cookies.set('user', JSON.stringify({ id: user.id, email: user.email, name: user.name }), {
      secure: false, // Disable secure for localhost development
      sameSite: 'lax', // More permissive than 'strict'
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/', // Ensure cookie is available site-wide
    })

    console.log('API: Cookie set successfully')
    return response
  } catch (error) {
    console.error('API: Sign in error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
