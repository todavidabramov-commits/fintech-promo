'use client'

import React, { useId, useState } from 'react'
import Select, { type StylesConfig } from 'react-select'

export type ServiceOption = {
  value: 'guarantee' | 'credit' | 'legal'
  label: string
}

const OPTIONS: ServiceOption[] = [
  { value: 'guarantee', label: 'Банковская гарантия' },
  { value: 'credit', label: 'Кредитование бизнеса' },
  { value: 'legal', label: 'Юридическое сопровождение' },
]

const selectStyles: StylesConfig<ServiceOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: 48,
    borderRadius: 8,
    borderColor: state.isFocused ? '#0c9488' : '#e6eef4',
    boxShadow: 'none',
    backgroundColor: '#fff',
    cursor: 'pointer',
    ':hover': {
      borderColor: state.isFocused ? '#0c9488' : '#d5dee8',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0 14px',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#0e1628',
    fontSize: 15,
    fontWeight: 500,
  }),
  placeholder: (base) => ({
    ...base,
    color: '#5b667a',
    fontSize: 15,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? '#0c9488' : '#5b667a',
    paddingRight: 12,
    ':hover': {
      color: '#0c9488',
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid #e6eef4',
    boxShadow: '0 8px 24px rgba(14, 22, 40, 0.08)',
    zIndex: 20,
  }),
  menuList: (base) => ({
    ...base,
    padding: 6,
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: 8,
    fontSize: 15,
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? '#0c9488'
      : state.isFocused
        ? 'rgba(12, 148, 136, 0.1)'
        : 'transparent',
    color: state.isSelected ? '#fff' : '#0e1628',
    fontWeight: state.isSelected ? 600 : 500,
    ':active': {
      backgroundColor: state.isSelected ? '#0c9488' : 'rgba(12, 148, 136, 0.16)',
    },
  }),
}

type Props = {
  name?: string
  defaultValue?: ServiceOption['value']
}

export function ServiceTypeSelect({ name = 'serviceType', defaultValue = 'guarantee' }: Props) {
  const instanceId = useId()
  const [value, setValue] = useState<ServiceOption | null>(
    OPTIONS.find((option) => option.value === defaultValue) ?? OPTIONS[0],
  )

  return (
    <Select<ServiceOption, false>
      instanceId={instanceId}
      inputId={`${name}-select`}
      isSearchable={false}
      name={name}
      onChange={(option) => setValue(option)}
      options={OPTIONS}
      styles={selectStyles}
      value={value}
    />
  )
}
