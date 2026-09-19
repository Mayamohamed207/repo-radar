import { useEffect, useRef, useState } from 'react'

export function useAnimatedNumber(value: number, durationMs = 300): number {
  const [displayValue, setDisplayValue] = useState(value)
  const startValueRef = useRef(value)
  const frameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const startValue = startValueRef.current
    const startTime = performance.now()

    if (startValue === value) return

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3) 
      const current = startValue + (value - startValue) * eased

      setDisplayValue(Math.round(current))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        startValueRef.current = value
      }
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [value, durationMs])

  return displayValue
}