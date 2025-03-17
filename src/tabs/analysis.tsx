import { useCallback, useEffect, useRef, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import "~style.css"

export type Times = {
  popupTime: number
  plasmoTopTime: number
  plasmoDocTime: number
}

function Analysis() {
  const [count, setCount] = useState(0)
  const [times, setTimes] = useState<Times>({
    popupTime: 0,
    plasmoTopTime: 0,
    plasmoDocTime: 0
  })
  const callback = useCallback(async () => {
    const res = (await sendToBackground({
      name: "timer",
      body: {
        type: "analysis",
        action: "get"
      }
    })) as Times
    setTimes(res)

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

  const resetTimer = () => {
    sendToBackground({
      name: "timer",
      body: {
        action: "reset"
      }
    })
  }

  return (
    <>
      <div className="p-2">
        <h2 className="font-bold">Hello Plasmo Analysis</h2>
        <div className="p-2">
          <div>popup滞在時間: {times.popupTime}</div>
          <div>Plasmo Topページ滞在時間: {times.plasmoTopTime}</div>
          <div>Plasmo Docページ滞在時間: {times.plasmoDocTime}</div>
          <button
            className="mt-2 justify-end bg-red-500 hover:bg-red-700 px-2 text-white rounded-sm"
            onClick={() => resetTimer()}>
            タイマーリセット
          </button>
        </div>
      </div>
    </>
  )
}

export default Analysis
