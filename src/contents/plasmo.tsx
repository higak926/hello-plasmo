import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["$PLASMO_PUBLIC_PLASMO_TOP_URL"]
}

const PlasmoOverlay = () => {
  return <div>Plasmo Contents</div>
}

export default PlasmoOverlay
