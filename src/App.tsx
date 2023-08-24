import React, {useReducer, useState} from "react";
import TodoList from "./components/TodoList.tsx";
import InputField from './components/InputField'
import {iTodo} from "./model.ts";
import './App.css'

type Actions =
    | {type: "add", payload: string}
    | {type: "remove", payload: number}
    | {type: "done", payload: number}
    | {type: "update", payload: {todoText: string, selectedTodoId: number | null}}

function TodoReducer(state: iTodo[], action: Actions){
    switch (action.type){
        case "add":
            return [
                ...state,
                {id: Date.now(), todo: action.payload, isCompleted: false}
            ]

        case "remove":
            return state.filter(todo=> todo.id !== action.payload)

        case "done":
            return state.map(todo => todo.id === action.payload ? {...todo, isCompleted: !todo.isCompleted} : todo)

        case "update":
            return state.map(todo=> action.payload.selectedTodoId === todo.id ?  {...todo, todo: action.payload.todoText} : todo )
    }
}


function App() {
    const [state,dispatch] = useReducer(TodoReducer,[])
    const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null)

    function handleAddTodo(todo:string) {
        dispatch({type:"add", payload: todo})
    }

    function handleComplete(id: number){
        dispatch({type:"done", payload: id})
    }

    function handleDeleteTodo(id: number){
        dispatch({type: "remove", payload: id})
    }

    function handleSelect(id: number){
        setSelectedTodoId(id)
    }

    function handleEdit(e:  React.FormEvent<HTMLFormElement>,todoText:string){
        e.preventDefault()
        dispatch({type: "update", payload: {todoText, selectedTodoId}})
    }

    return (
        <div className="App">
            <span className='heading'>Taskify</span>
            <InputField onAddTodo={handleAddTodo}/>
            <TodoList todos={state} onComplete={handleComplete} onDelete={handleDeleteTodo} selectedTodoId={selectedTodoId} onSelect={handleSelect} onEdit={handleEdit}/>
        </div>
    )
}

export default App
