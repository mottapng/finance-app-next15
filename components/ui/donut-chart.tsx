'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'

interface CustomProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  indicatorClassName?: string
}

const DonutChart = React.forwardRef<SVGSVGElement, CustomProgressProps>(
  (
    { value, size = 100, strokeWidth = 10, className, indicatorClassName },
    ref,
  ) => {
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (value / 100) * circumference

    return (
      <div
        className={cn('relative flex items-center justify-center', className)}
        style={{ width: size, height: size }}
      >
        <svg
          ref={ref}
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <circle
            className="text-secondary"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className={cn('text-primary', indicatorClassName)}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{ transition: 'stroke-dashoffset 0.35s' }}
          />
        </svg>
        {value !== 0 && (
          <span className="absolute text-sm font-medium">{value}%</span>
        )}
      </div>
    )
  },
)

DonutChart.displayName = 'DonutChart'

export { DonutChart }
