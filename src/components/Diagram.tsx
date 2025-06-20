import React from 'react'

interface DiagramProps {
  src: string
  title?: string
  description?: string
  originalSrc?: string
  selectedGateway?: string | null
}

const Diagram: React.FC<DiagramProps> = ({
  src,
  title,
  description,
  originalSrc,
  selectedGateway,
}) => {
  if (!src) {
    console.error('Diagram component requires a valid src string.')
    return null
  }

  // Build data attributes for inspection
  const dataAttributes: Record<string, string> = {}
  if (originalSrc) {
    dataAttributes['data-original-src'] = originalSrc
  }
  if (selectedGateway) {
    dataAttributes['data-selected-gateway'] = selectedGateway
  }
  if (originalSrc && src.startsWith('blob:')) {
    dataAttributes['data-fetched-via'] = 'wayfinder'
  }

  return (
    <div className="flex flex-col items-center">
      <img
        src={src}
        alt={title || 'Diagram'}
        className="h-auto max-w-full"
        {...dataAttributes}
      />
      {(title || description) && (
        <p className="mt-2 text-center text-sm">
          {title && <strong>{title}</strong>}
          {title && description && ': '}
          {description}
        </p>
      )}
    </div>
  )
}

export default Diagram
