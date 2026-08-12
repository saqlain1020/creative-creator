type Props = {
  className?: string
  color?: string
}

export function SocialIcons({ className = '', color = 'currentColor' }: Props) {
  return (
    <div className={`tpl-social ${className}`.trim()} aria-hidden>
      <span style={{ borderColor: color, color }}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v7h4v-7h3.1l.9-4H13V9c0-.6.4-1 1-1z" />
        </svg>
      </span>
      <span style={{ borderColor: color, color }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </span>
    </div>
  )
}
