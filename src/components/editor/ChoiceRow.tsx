type ChoiceOption<T extends string> = {
  label: string
  value: T
}

type Props<T extends string> = {
  label: string
  value: T
  options: ChoiceOption<T>[]
  onChange: (value: T) => void
}

export function ChoiceRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: Props<T>) {
  return (
    <div className="choice-set">
      <span>{label}</span>
      <div
        className="choice-set__row"
        style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
      >
        {options.map((option) => {
          const active = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              className={`tone-toggle__btn${active ? ' is-active' : ''}`}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
