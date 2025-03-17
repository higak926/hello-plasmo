import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useCallback, useEffect, useRef, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import "~style.css"

export const config: PlasmoCSConfig = {
  matches: ["$PLASMO_PUBLIC_PLASMO_TOP_URL"]
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

const PlasmoOverlay = () => {
  const [count, setCount] = useState<number>(3)
  const callback = useCallback(() => {
    sendToBackground({
      name: "timer",
      body: {
        type: "plasmoTop",
        action: "add"
      }
    })
    if (!count) {
      window.location.href = "https://docs.plasmo.com/"
      return
    }
    setCount(count - 1)
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

  return (
    <>
      <div className="bg-amber-200 w-[200px] p-4 fixed top-[140px] left-[50px]">
        <div>Plasmoを探索</div>
        <div>3秒後に移動します</div>

        {count ? count : "here we go !"}
      </div>
    </>
  )
}

export default PlasmoOverlay
