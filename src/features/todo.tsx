import { useState } from "react"

type TodoItem = {
  id: number
  title: string
  done: boolean
}

export const Todo = () => {
  const [inputTodo, setInputTodo] = useState<string>("")
  const [todoList, setTodoList] = useState<TodoItem[]>([])
  // TODO追加
  const addTodo = (e) => {
    e.preventDefault()
    if (!inputTodo) return
    const maxId = todoList.length
      ? Math.max(...todoList.map((item) => item.id))
      : 0
    const props: TodoItem = {
      id: maxId + 1,
      title: inputTodo,
      done: false
    }
    setTodoList([...todoList, props])
  }

  // TODO削除
  const deleteTodo = (e, id: number) => {
    e.preventDefault()
    if (!id) return
    console.log(
      todoList.filter((item) => item.id != id),
      "check"
    )

    setTodoList([...todoList.filter((item) => item.id !== id)])
  }

  return (
    <>
      <h3 className="mt-2">やることリスト</h3>
      <div className="flex gap-2 my-1">
        <input
          className="pl-2 border border-slate-200 rounded-md"
          placeholder="Type here..."
          type="text"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button
          className="bg-green-500 hover:bg-green-700 px-2 text-white rounded-md"
          onClick={(e) => addTodo(e)}>
          add
        </button>
      </div>
      {todoList.map((todo) => (
        <div key={todo.id} className="flex justify-between my-1">
          <div className="flex gap-2">
            <input disabled={todo.done} type="checkbox" />
            <div>{todo.title}</div>
          </div>
          <button
            className="justify-end bg-red-500 hover:bg-red-700 px-2 text-white rounded-sm"
            onClick={(e) => deleteTodo(e, todo.id)}>
            delete
          </button>
        </div>
      ))}
    </>
  )
}
