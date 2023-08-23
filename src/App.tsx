import TodoList from "./components/TodoList.tsx";
import InputField from './components/InputField'
import {iTodo} from "./model.ts";
import React, {useState} from "react";
import './App.css'

function App() {
    const [todos, setTodos] = useState<iTodo[]>([])

    const [selectedTodo, setSelectedTodo] = useState<iTodo>({id:Date.now(), todo: "", isCompleted: false})

    function handleAddTodo(todo:iTodo) {
        setTodos([...todos,todo])
    }

    function handleComplete(id: number){
        const UpdatedTodos = todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo)
        setTodos(UpdatedTodos)
    }

    function handleDeleteTodo(id: number){
        const updatedTodos = todos.filter(todo=> todo.id !== id)
        setTodos(updatedTodos)
    }

    function handleSelect(id: number){
        const getTodo = todos.find(todo=> todo.id === id)
        setSelectedTodo(getTodo)
    }

    function handleEdit(e:  React.FormEvent<HTMLFormElement>,todoText:string){
        e.preventDefault()
        const updatedTodo = todos.map(todo=> selectedTodo.id === todo.id ?  {...selectedTodo, todo: todoText} : todo )
        setTodos(updatedTodo)
    }

    return (
        <div className="App">
            <span className='heading'>Taskify</span>
            <InputField onAddTodo={handleAddTodo}/>
            <TodoList todos={todos} onComplete={handleComplete} onDelete={handleDeleteTodo} selectedTodo={selectedTodo} onSelect={handleSelect} onEdit={handleEdit}/>
        </div>
    )
}

export default App
