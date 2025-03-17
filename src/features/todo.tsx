import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

type TodoItem = {
  id: number
  title: string
  done: boolean
}

const todoStorageKey = "plasmo-todo"

export const Todo = () => {
  const storage = new Storage()
  useEffect(() => {
    const init = async () => {
      const todo = (await storage.get(todoStorageKey)) as TodoItem[]
      if (!todo) return
      setTodoList(todo)
    }
    init()
  }, [])

  const [inputTodo, setInputTodo] = useState<string>("")
  const [todoList, setTodoList] = useState<TodoItem[]>([])
  // やること追加
  const addTodo = async (e) => {
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
    await storage.set(todoStorageKey, todoList)
    setTodoList([...todoList, props])
  }

  // やること追加
  const doneTodo = async (e, id) => {
    e.preventDefault()
    const updateList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done
      }
      return todo
    })

    await storage.set(todoStorageKey, updateList)
    setTodoList(updateList)
  }

  // やること削除
  const deleteTodo = async (e, id: number) => {
    e.preventDefault()
    if (!id) return

    const filteredTodo = todoList.filter((item) => item.id !== id)
    await storage.set(todoStorageKey, filteredTodo)
    setTodoList(filteredTodo)
  }

  return (
    <>
      <h3 className="mt-2 font-bold">やることリスト{inputTodo}</h3>
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
            <input
              checked={todo.done}
              type="checkbox"
              onChange={(e) => doneTodo(e, todo.id)}
            />
            <div className={todo.done ? "line-through" : ""}>{todo.title}</div>
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
