import React, {useReducer, useState} from "react";
import TodoList from "./components/TodoList.tsx";
import InputField from './components/InputField'
import {iTodo} from "./model.ts";
import './App.css'
import {DragDropContext, DropResult} from "react-beautiful-dnd";

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
    const [completedTodo, setCompletedTodo] = useState<iTodo[]>([])

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

    function handleDragEnd(result : DropResult){
        const {source, destination} = result

        if((!destination) || (destination.droppableId === source.droppableId && destination.index == source.index)) return

        let add
        const active = state
        const complete = completedTodo

        if(source.droppableId === "TodosList"){
            add = active[source.index]
            active.splice(source.index, 1)
        } else {
            add = complete[source.index]
            complete.splice(source.index, 1)
        }

        if(destination.droppableId === "TodosList"){
            active.splice(destination.index, 0, add)
        } else {
            complete.splice(destination.index, 0, add)
        }
    }

    return (
        <div className="App">
            <span className='heading'>Taskify</span>
            <InputField onAddTodo={handleAddTodo}/>
            <DragDropContext onDragEnd={handleDragEnd}>
                <TodoList
                    todos={state}
                    onComplete={handleComplete}
                    onDelete={handleDeleteTodo}
                    onSelect={handleSelect}
                    onEdit={handleEdit}
                    selectedTodoId={selectedTodoId}
                    completedTodo={completedTodo}
                    setCompletedTodo={setCompletedTodo}
                />
            </DragDropContext>
        </div>
    )
}

export default App
