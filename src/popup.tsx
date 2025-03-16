import { CountButton } from "~features/count-button"
import { Search } from "~features/search"
import { Todo } from "~features/todo"

import "~style.css"

function IndexPopup() {
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
