import { SIZE_TOKEN_OPTIONS, resolveSizeToken } from '../../data/fieldTune'
import type { SizeToken } from '../../types'
import { ChoiceRow } from './ChoiceRow'

type Props = {
  label: string
  value: string | undefined
  onChange: (value: SizeToken) => void
}

export function SizePicker({ label, value, onChange }: Props) {
  return (
    <ChoiceRow
      label={label}
      value={resolveSizeToken(value)}
      options={SIZE_TOKEN_OPTIONS}
      onChange={onChange}
    />
  )
}
