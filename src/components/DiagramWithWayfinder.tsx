'use client'
import React from 'react'
import Diagram from '@/components/Diagram'

interface DiagramWithWayfinderProps {
  src: string
  title?: string
  description?: string
}

export default function DiagramWithWayfinder({
  src,
  title,
  description,
}: DiagramWithWayfinderProps) {
  // Just pass through the src - wayfinder will handle ar:// URLs
  return <Diagram src={src} title={title} description={description} />
}
