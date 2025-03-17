import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useCallback, useEffect, useRef, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import "~style.css"

export const config: PlasmoCSConfig = {
  matches: ["$PLASMO_PUBLIC_PLASMO_DOC_URL"]
}

export const getStyle = (): HTMLStyleElement => {
  const baseFontSize = 16

  let updatedCssText = cssText.replaceAll(":root", ":host(plasmo-csui)")
  const remRegex = /([\d.]+)rem/g
  updatedCssText = updatedCssText.replace(remRegex, (match, remValue) => {
    const pixelsValue = parseFloat(remValue) * baseFontSize

    return `${pixelsValue}px`
  })

  const styleElement = document.createElement("style")

  styleElement.textContent = updatedCssText

  return styleElement
}

const timer = () => {
  const [count, setCount] = useState<number>(0)
  const callback = useCallback(() => {
    sendToBackground({
      name: "timer",
      body: {
        type: "plasmoDoc",
        action: "add"
      }
    })
    setCount(count + 1)
  }, [count])
  const callbackRef = useRef(callback)
  useEffect(() => {
    callbackRef.current = callback
  }, [count])
  useEffect(() => {
    const timerId = setInterval(() => {
      callbackRef.current()
    }, 1000)

    return () => clearInterval(timerId)
  }, [])
}

const PlasmoOverlay = () => {
  timer()
  return (
    <>
      <div className="bg-amber-200 w-[200px] p-4 fixed top-[140px] right-[150px]">
        <div className="text-center">Complete 🎉</div>
        <div className="text-sm">Thanks for your time.</div>
      </div>
    </>
  )
}

export default PlasmoOverlay
