"use client"

import { useEffect, useCallback, useRef } from "react"

interface UseExitIntentOptions {
  threshold?: number
  onExitIntent: () => void
}

export function useExitIntent({ threshold = 0, onExitIntent }: UseExitIntentOptions) {
  const triggered = useRef(false)

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (triggered.current) return
      if (e.clientY <= threshold) {
        triggered.current = true
        onExitIntent()
      }
    },
    [threshold, onExitIntent]
  )

  useEffect(() => {
    const shown = sessionStorage.getItem("exit-intent-shown")
    if (shown) {
      triggered.current = true
      return
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [handleMouseLeave])
}
