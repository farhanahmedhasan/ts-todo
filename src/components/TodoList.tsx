import {iTodo} from "../model.ts";
import Todo from "./Todo.tsx";
import "./styles.css"
import React from "react";

interface iProps{
    todos : iTodo[]
    onComplete: (id: number) => void
    onDelete: (id: number) => void
    selectedTodoId: number | null
    onSelect: (id: number) => void
    onEdit: (e: React.FormEvent<HTMLFormElement>,todo: string) => void
}

export default function TodoList({todos, onComplete, onDelete, onSelect, onEdit, selectedTodoId}: iProps) {
    return(
        <div className="container">
            <div className="todos">
                <span className="todos__heading">Active Tasks</span>
                    {todos.map(todo => <Todo key={todo.id} todo={todo} onComplete={onComplete} onDelete={onDelete} selectedTodoId={selectedTodoId} onSelect={onSelect} onEdit={onEdit}/>)}
            </div>

            <div className="todos remove">
                <span className="todos__heading">Completed Tasks</span>
                    {todos.map(todo => <Todo key={todo.id} todo={todo} onComplete={onComplete} onDelete={onDelete} selectedTodoId={selectedTodoId} onSelect={onSelect} onEdit={onEdit}/>)}
            </div>
        </div>
    )
}