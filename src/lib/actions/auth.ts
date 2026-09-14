'use server'

import config from '@payload-config'
import { login, logout } from '@payloadcms/next/auth'
import { revalidatePath } from 'next/cache'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import {
  applicationSchema,
  digitsOnly,
  loginSchema,
  parseAmount,
  registerSchema,
  validateWithSchema,
} from '@/lib/validation'

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim()
}

export type AuthState = {
  error?: string
  success?: string
}

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const result = validateWithSchema(loginSchema, {
    email: str(formData, 'email'),
    password: str(formData, 'password'),
  })

  if (!result.ok) {
    return { error: Object.values(result.errors)[0] || 'Проверьте корректность заполнения формы' }
  }

  try {
    await login({
      collection: 'users',
      config,
      email: result.data.email,
      password: result.data.password,
    })
  } catch {
    return { error: 'Неверный email или пароль' }
  }

  redirect('/cabinet')
}

export async function registerAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const result = validateWithSchema(registerSchema, {
    email: str(formData, 'email'),
    password: str(formData, 'password'),
    name: str(formData, 'name'),
    company: str(formData, 'company'),
    phone: str(formData, 'phone'),
    inn: str(formData, 'inn'),
  })

  if (!result.ok) {
    return { error: Object.values(result.errors)[0] || 'Проверьте корректность заполнения формы' }
  }

  const { email, password, name, company, phone, inn } = result.data
  const innDigits = digitsOnly(inn || '')

  const payload = await getPayload({ config })

  try {
    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name,
        company,
        phone: phone || undefined,
        inn: innDigits || undefined,
        role: 'client',
      },
    })
  } catch {
    return { error: 'Не удалось создать аккаунт. Возможно, такой email уже зарегистрирован.' }
  }

  try {
    await login({
      collection: 'users',
      config,
      email,
      password,
    })
  } catch {
    return { error: 'Аккаунт создан, но вход не удался. Попробуйте войти вручную.' }
  }

  redirect('/cabinet')
}

export async function logoutAction() {
  await logout({ config })
  redirect('/vhod')
}

export async function createApplicationAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const serviceType = str(formData, 'serviceType') as 'guarantee' | 'credit' | 'legal'
  const amountRaw = str(formData, 'amount')
  const comment = str(formData, 'comment')

  if (!serviceType || !['guarantee', 'credit', 'legal'].includes(serviceType)) {
    return { error: 'Выберите продукт' }
  }

  const result = validateWithSchema(applicationSchema, {
    amount: amountRaw,
    comment,
  })

  if (!result.ok) {
    return { error: Object.values(result.errors)[0] || 'Проверьте корректность заполнения формы' }
  }

  const amount = result.data.amount ? parseAmount(result.data.amount) : undefined

  const titles: Record<typeof serviceType, string> = {
    guarantee: 'Заявка на банковскую гарантию',
    credit: 'Заявка на кредитование бизнеса',
    legal: 'Заявка на юридическое сопровождение',
  }

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await getHeaders() })

  if (!user) {
    return { error: 'Требуется авторизация' }
  }

  try {
    await payload.create({
      collection: 'applications',
      data: {
        title: titles[serviceType],
        serviceType,
        status: 'review',
        amount: amount ?? undefined,
        comment: result.data.comment || undefined,
        client: user.id,
      },
      user,
      overrideAccess: false,
    })
  } catch {
    return { error: 'Не удалось отправить заявку' }
  }

  revalidatePath('/cabinet')
  return { success: 'Заявка отправлена на рассмотрение' }
}
