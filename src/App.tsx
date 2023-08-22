import TodoList from "./components/TodoList.tsx";
import InputField from './components/InputField'
import {iTodo} from "./model.ts";
import {useState} from "react";
import './App.css'

function App() {
    const [todos, setTodos] = useState<iTodo[]>([])

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

    return (
        <div className="App">
            <span className='heading'>Taskify</span>
            <InputField onAddTodo={handleAddTodo}/>
            <TodoList todos={todos} onComplete={handleComplete} onDelete={handleDeleteTodo}/>
        </div>
    )
}

export default App
