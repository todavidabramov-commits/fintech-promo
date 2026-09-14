import config from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import type { User } from '@/payload-types'

export async function getCurrentUser(): Promise<User | null> {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await getHeaders() })
  return (user as User | null) ?? null
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('UNAUTHORIZED')
  }
  return user
}
