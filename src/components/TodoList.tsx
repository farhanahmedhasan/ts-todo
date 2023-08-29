import {iTodo} from "../model.ts";
import Todo from "./Todo.tsx";
import "./styles.css"
import React from "react";
import {Droppable} from "react-beautiful-dnd";

interface iProps{
    todos : iTodo[]
    onComplete: (id: number) => void
    onDelete: (id: number) => void
    onSelect: (id: number) => void
    onEdit: (e: React.FormEvent<HTMLFormElement>,todo: string) => void
    selectedTodoId: number | null
    completedTodo: iTodo[]
    setCompletedTodo:  React.Dispatch<React.SetStateAction<iTodo[]>>
}

export default function TodoList({todos, onComplete, onDelete, onSelect, onEdit, completedTodo, setCompletedTodo, selectedTodoId}: iProps) {
    return(
        <div className="container">
            <Droppable droppableId="TodosList">
                {
                    (provided,snapshot)=> (
                        <div className={`todos ${snapshot.isDraggingOver ? "drag-active": ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos__heading">Active Tasks</span>
                            {todos.map((todo, index) => <Todo key={todo.id} index={index} todo={todo} onComplete={onComplete} onDelete={onDelete} selectedTodoId={selectedTodoId} onSelect={onSelect} onEdit={onEdit}/>)}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>

            <Droppable droppableId="TodosRemove">
                {
                    (provided,snapshot)=> (
                        <div className={`todos remove ${snapshot.isDraggingOver ? "drag-complete": ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos__heading">Completed Tasks</span>
                                {completedTodo.map((todo, index) => <Todo key={todo.id} index={index} todo={todo} setCompletedTodo={setCompletedTodo}/>)}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    )
}