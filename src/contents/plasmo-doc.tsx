import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import "~style.css"

export const config: PlasmoCSConfig = {
  matches: ["$PLASMO_PUBLIC_PLASMO_DOC_URL"]
}

const PlasmoOverlay = () => {
  return <div className="w-lg font-bold">Contents</div>
}

export default PlasmoOverlay
