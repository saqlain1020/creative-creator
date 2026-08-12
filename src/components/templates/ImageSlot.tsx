type ImageSlotProps = {
  src: string | null
  alt: string
  className?: string
  label?: string
}

export function ImageSlot({
  src,
  alt,
  className = '',
  label = 'Upload product image',
}: ImageSlotProps) {
  if (src) {
    return <img src={src} alt={alt} className={className} draggable={false} />
  }

  return (
    <div className={`image-placeholder ${className}`.trim()} aria-label={label}>
      <span>{label}</span>
    </div>
  )
}
