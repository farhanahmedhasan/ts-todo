import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import {iTodo} from "../model.ts";
import React, {useEffect, useRef, useState} from "react";
import {Draggable} from "react-beautiful-dnd";

interface iProps{
    todo: iTodo
    index: number
    onComplete?: (id: number) => void
    onDelete?: (id: number) => void
    selectedTodoId?: number | null
    onSelect?: (id: number) => void
    onEdit?: (e: React.FormEvent<HTMLFormElement>,todo: string) => void
    setCompletedTodo?:  React.Dispatch<React.SetStateAction<iTodo[]>>
}

export default function Todo({todo, onComplete, onDelete, selectedTodoId, onSelect, onEdit, index}: iProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    const inputRef = useRef<HTMLInputElement>(null)

    function handleEdit(id: number){
        onSelect?.(id)
        setIsEditing(prev => !prev)
    }

    useEffect(()=>{
        inputRef.current?.focus()
    },[isEditing])

    return(
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided,snapshot)=> (
                    <form className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} onSubmit={(e)=> {
                        onEdit?.(e,editTodo)
                        setIsEditing(false)
                    }}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {isEditing && selectedTodoId === todo.id ?
                            <input type="text" ref={inputRef} value={editTodo} className="todos__single--text" onChange={(e)=> setEditTodo(e.target.value)}/>
                            :
                            <span className="todos__single--text" style={todo.isCompleted ? {textDecoration: "line-through"} : {textDecoration: "none"}}>{todo.todo}</span>
                        }


                        <div>
                            <span className="icon" onClick={()=> handleEdit(todo.id)}><AiFillEdit/></span>
                            <span className="icon" onClick={()=> onDelete?.(todo.id)}><AiFillDelete/></span>
                            <span className="icon" onClick={()=> onComplete?.(todo.id)}><MdDone/></span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}