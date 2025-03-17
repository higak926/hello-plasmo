import type { PlasmoMessaging } from "@plasmohq/messaging"

let popupTime: number = 0
let plasmoTopTime: number = 0
let plasmoDocTime: number = 0
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const body = req.body
  if (body?.type === "popup" && body?.action === "add") {
    popupTime++
    return
  }
  if (body?.type === "plasmoTop" && body?.action === "add") {
    plasmoTopTime++
    return
  }
  if (body?.type === "plasmoDoc" && body?.action === "add") {
    plasmoDocTime++
    return
  }
  if (body?.action === "reset") {
    popupTime = 0
    plasmoTopTime = 0
    plasmoDocTime = 0
    return
  }

  const message = {
    popupTime: popupTime,
    plasmoTopTime: plasmoTopTime,
    plasmoDocTime: plasmoDocTime
  }

  res.send(message)
}

export default handler
