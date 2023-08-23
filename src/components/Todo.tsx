import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import {iTodo} from "../model.ts";
import React, {useEffect, useRef, useState} from "react";

interface iProps{
    todo: iTodo
    onComplete: (id: number) => void
    onDelete: (id: number) => void
    selectedTodo: iTodo
    onSelect: (id: number) => void
    onEdit: (e: React.FormEvent<HTMLFormElement>,todo: string) => void
}

export default function Todo({todo, onComplete, onDelete, selectedTodo, onSelect, onEdit}: iProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    const inputRef = useRef<HTMLInputElement>(null)

    function handleEdit(id: number){
        onSelect(id)
        setIsEditing(prev => !prev)
    }

    useEffect(()=>{
        inputRef.current?.focus()
    },[isEditing])

    return(
        <form className="todos__single" onSubmit={(e)=> {
            onEdit(e,editTodo)
            setIsEditing(false)
        }}>
            {isEditing && selectedTodo.id === todo.id ?
                <input type="text" ref={inputRef} value={editTodo} className="todos__single--text" onChange={(e)=> setEditTodo(e.target.value)}/>
                :
                <span className="todos__single--text" style={todo.isCompleted ? {textDecoration: "line-through"} : {textDecoration: "none"}}>{todo.todo}</span>
            }


            <div>
                <span className="icon" onClick={()=> handleEdit(todo.id)}><AiFillEdit/></span>
                <span className="icon" onClick={()=> onDelete(todo.id)}><AiFillDelete/></span>
                <span className="icon" onClick={()=> onComplete(todo.id)}><MdDone/></span>
            </div>
        </form>
    )
}