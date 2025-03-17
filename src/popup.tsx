import { useCallback, useEffect, useRef, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { Search } from "~features/search"
import { Todo } from "~features/todo"

import "~style.css"

const timer = () => {
  const [count, setCount] = useState<number>(0)
  const callback = useCallback(() => {
    sendToBackground({
      name: "timer",
      body: {
        type: "popup",
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

function IndexPopup() {
  timer()
  return (
    <div className="w-[230px] p-4">
      <h2 className="w-full mb-2">
        <div className="text-center text-lg italic text-slate-500">
          Hello Plasmo
        </div>
      </h2>
      <Todo />
      <Search />
    </div>
  )
}

export default IndexPopup
