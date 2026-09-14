'use client'

import React, { useState, type ComponentProps } from 'react'
import { IMaskInput } from 'react-imask'

type BaseProps = {
  name: string
  className?: string
  required?: boolean
  placeholder?: string
  autoComplete?: string
  'aria-invalid'?: boolean
}

export function PhoneInput({
  name,
  defaultValue = '',
  onValueChange,
  ...rest
}: BaseProps & {
  defaultValue?: string
  onValueChange?: (masked: string, unmasked: string) => void
}) {
  const [value, setValue] = useState(defaultValue)

  return (
    <IMaskInput
      {...rest}
      inputMode="tel"
      mask="+{7} (000) 000-00-00"
      name={name}
      onAccept={(masked: string, maskRef) => {
        setValue(masked)
        onValueChange?.(masked, maskRef.unmaskedValue)
      }}
      type="tel"
      unmask={false}
      value={value}
    />
  )
}

export function InnInput({
  name,
  defaultValue = '',
  onValueChange,
  ...rest
}: BaseProps & {
  defaultValue?: string
  onValueChange?: (value: string) => void
}) {
  const [value, setValue] = useState(defaultValue)

  return (
    <IMaskInput
      {...rest}
      definitions={{
        '0': /[0-9]/,
      }}
      inputMode="numeric"
      mask={[{ mask: '0000000000' }, { mask: '000000000000' }]}
      name={name}
      onAccept={(next: string) => {
        setValue(next)
        onValueChange?.(next)
      }}
      type="text"
      value={value}
    />
  )
}

export function AmountInput({
  name,
  defaultValue = '',
  onValueChange,
  ...rest
}: BaseProps & {
  defaultValue?: string
  onValueChange?: (value: string, unmasked: string) => void
}) {
  const [value, setValue] = useState(defaultValue)

  return (
    <IMaskInput
      {...rest}
      inputMode="numeric"
      mask={Number}
      max={10_000_000_000}
      min={0}
      name={name}
      onAccept={(masked: string, maskRef) => {
        setValue(masked)
        onValueChange?.(masked, String(maskRef.unmaskedValue ?? ''))
      }}
      scale={0}
      thousandsSeparator=" "
      type="text"
      value={value}
    />
  )
}

type TextInputProps = ComponentProps<'input'> & {
  kind?: 'person' | 'company' | 'text'
}

export function TextInput({ kind = 'text', onChange, ...rest }: TextInputProps) {
  return (
    <input
      {...rest}
      onChange={(event) => {
        let next = event.target.value
        if (kind === 'person') {
          next = next.replace(/[^A-Za-zА-Яа-яЁё\s\-'.]/gu, '').slice(0, 80)
        }
        if (kind === 'company') {
          next = next.replace(/[<>]/g, '').slice(0, 120)
        }
        event.target.value = next
        onChange?.(event)
      }}
      type="text"
    />
  )
}

export function EmailInput(props: ComponentProps<'input'>) {
  return (
    <input
      {...props}
      autoComplete={props.autoComplete ?? 'email'}
      inputMode="email"
      maxLength={120}
      onChange={(event) => {
        event.target.value = event.target.value.replace(/\s/g, '').slice(0, 120)
        props.onChange?.(event)
      }}
      type="email"
    />
  )
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="field-error" role="alert">
      {message}
    </p>
  )
}
