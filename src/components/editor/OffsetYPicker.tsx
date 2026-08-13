type Props = {
  label: string
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
}

export function OffsetYPicker({
  label,
  value,
  min = 0,
  max = 480,
  step = 4,
  onChange,
}: Props) {
  return (
    <label className="offset-picker">
      <span>{label}</span>
      <div className="offset-picker__row">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <em className="offset-picker__value">{value}px</em>
      </div>
    </label>
  )
}
