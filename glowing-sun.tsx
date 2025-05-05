"use client"

import React, { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export const GlowingSun: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const gradientRef = useRef<SVGRadialGradientElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const animate = () => {
      const gradient = gradientRef.current
      if (gradient) {
        const time = Date.now() / 1000
        const scale = 0.8 + Math.sin(time) * 0.2
        gradient.setAttribute('fx', `${50 + Math.sin(time * 0.7) * 10}%`)
        gradient.setAttribute('fy', `${50 + Math.cos(time * 0.7) * 10}%`)
        gradient.setAttribute('r', `${scale * 50}%`)
      }
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  const lightColors = ['#FFD700', '#FF8C00']
  const darkColors = ['#4B0082', '#8A2BE2']

  const colors = theme === 'light' ? lightColors : darkColors

  return (
    <svg viewBox="0 0 200 200" {...props}>
      <defs>
        <radialGradient id="sun-gradient" ref={gradientRef}>
          <stop offset="10%" stopColor={colors[0]} />
          <stop offset="65%" stopColor={colors[1]} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#sun-gradient)">
        <animate
          attributeName="opacity"
          values="0.5;0.7;0.5"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
}

