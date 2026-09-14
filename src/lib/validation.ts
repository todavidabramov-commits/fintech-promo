import * as yup from 'yup'

export type FieldErrors = Record<string, string>

export function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

export function parseAmount(value: string) {
  const digits = digitsOnly(value)
  if (!digits) return null
  const amount = Number(digits)
  return Number.isFinite(amount) ? amount : null
}

function phoneDigits(value: string) {
  return digitsOnly(value)
}

const personNameRegex = /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё\s\-'.]*$/u

const companySchema = yup
  .string()
  .trim()
  .min(2, 'Укажите название организации')
  .max(120, 'Слишком длинное название')
  .required('Укажите название организации')

const personSchema = yup
  .string()
  .trim()
  .min(2, 'Укажите ФИО буквами')
  .max(80, 'Слишком длинное ФИО')
  .matches(personNameRegex, 'Укажите ФИО буквами')
  .required('Укажите ФИО буквами')

const emailSchema = yup
  .string()
  .trim()
  .email('Укажите корректный email')
  .max(120, 'Слишком длинный email')
  .required('Укажите корректный email')

const passwordSchema = yup
  .string()
  .min(8, 'Пароль от 8 до 72 символов')
  .max(72, 'Пароль от 8 до 72 символов')
  .required('Введите пароль')

const phoneRequiredSchema = yup
  .string()
  .trim()
  .required('Телефон в формате +7 (999) 000-00-00')
  .test('phone-ru', 'Телефон в формате +7 (999) 000-00-00', (value) => {
    const digits = phoneDigits(value || '')
    return digits.length === 11 && digits.startsWith('7')
  })

const phoneOptionalSchema = yup
  .string()
  .trim()
  .default('')
  .test('phone-ru-optional', 'Телефон в формате +7 (999) 000-00-00', (value) => {
    const digits = phoneDigits(value || '')
    const rest = digits.replace(/^7/, '')
    if (!rest) return true
    return digits.length === 11 && digits.startsWith('7')
  })

const innOptionalSchema = yup
  .string()
  .trim()
  .default('')
  .test('inn', 'ИНН должен содержать 10 или 12 цифр', (value) => {
    const digits = digitsOnly(value || '')
    if (!digits) return true
    return digits.length === 10 || digits.length === 12
  })

const amountOptionalSchema = yup
  .string()
  .trim()
  .default('')
  .test('amount', 'Сумма от 1 000 до 10 000 000 000 ₽', (value) => {
    if (!value) return true
    const amount = parseAmount(value)
    return amount != null && amount >= 1000 && amount <= 10_000_000_000
  })

export const contactSchema = yup.object({
  company: companySchema,
  person: personSchema,
  phone: phoneRequiredSchema,
  email: emailSchema,
})

export const registerSchema = yup.object({
  company: companySchema,
  name: personSchema,
  inn: innOptionalSchema,
  phone: phoneOptionalSchema,
  email: emailSchema,
  password: passwordSchema,
})

export const loginSchema = yup.object({
  email: emailSchema,
  password: yup.string().required('Введите пароль'),
})

export const applicationSchema = yup.object({
  amount: amountOptionalSchema,
  comment: yup.string().trim().max(500, 'Комментарий не длиннее 500 символов').default(''),
})

export function yupToFieldErrors(error: unknown): FieldErrors {
  if (!(error instanceof yup.ValidationError)) return { form: 'Проверьте корректность заполнения формы' }

  const errors: FieldErrors = {}
  for (const item of error.inner.length ? error.inner : [error]) {
    if (!item.path || errors[item.path]) continue
    errors[item.path] = item.message
  }
  return errors
}

export function validateWithSchema<T extends yup.AnyObjectSchema>(
  schema: T,
  data: unknown,
): { ok: true; data: yup.InferType<T> } | { ok: false; errors: FieldErrors } {
  try {
    const parsed = schema.validateSync(data, { abortEarly: false, stripUnknown: true })
    return { ok: true, data: parsed }
  } catch (error) {
    return { ok: false, errors: yupToFieldErrors(error) }
  }
}

export function validateContact(data: unknown) {
  const result = validateWithSchema(contactSchema, data)
  return result.ok ? {} : result.errors
}

export function validateRegister(data: unknown) {
  const result = validateWithSchema(registerSchema, data)
  return result.ok ? {} : result.errors
}

export function validateLogin(data: unknown) {
  const result = validateWithSchema(loginSchema, data)
  return result.ok ? {} : result.errors
}

export function validateApplication(data: unknown) {
  const result = validateWithSchema(applicationSchema, data)
  return result.ok ? {} : result.errors
}
