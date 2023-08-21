import './styles.css'
import React, {useRef, useState} from "react";
import {iTodo} from "../model.ts";

interface iProps{
    onAddTodo :  (todo: iTodo) => void
}

export default function InputField({onAddTodo}: iProps) {
    const [todo, setTodo] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)
    function handleSubmit(e: React.FormEvent<EventTarget>) {
        e.preventDefault()
        if (!todo) return

        const newTodo = {id: Date.now(), todo, isCompleted: false}
        onAddTodo(newTodo)
        setTodo("")
        inputRef.current?.blur()
    }

  return (
    <form className="input" onSubmit={handleSubmit}>
        <input type="text" className="input__box" placeholder="Enter a text" ref={inputRef} value={todo} onChange={(e)=> setTodo(e.target.value)}/>
        <button className="input__submit" type="submit">Go</button>
    </form>
  )
}
