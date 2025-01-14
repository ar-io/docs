import React from 'react';

interface DiagramProps {
  src: string;
  title?: string;
  description?: string;
}

const Diagram: React.FC<DiagramProps> = ({ src, title, description }) => {
  if (!src) {
    console.error('Diagram component requires a valid src string.');
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <img src={src} alt={title || 'Diagram'} className="max-w-full h-auto" />
      {(title || description) && (
        <p className="text-center text-sm mt-2">
          {title && <strong>{title}</strong>}
          {title && description && ': '}
          {description}
        </p>
      )}
    </div>
  );
};

export default Diagram;
