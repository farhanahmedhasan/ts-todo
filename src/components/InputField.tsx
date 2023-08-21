import './styles.css'
import React, {useState} from "react";
import {iTodo} from "../model.ts";

interface iProps{
    onAddTodo :  (todo: iTodo) => void
}

export default function InputField({onAddTodo}: iProps) {
    const [todo, setTodo] = useState<string>("")
    function handleSubmit(e: React.FormEvent<EventTarget>) {
        e.preventDefault()
        if (!todo) return

        const newTodo = {id: Date.now(), todo, isCompleted: false}
        onAddTodo(newTodo)
        setTodo("")
    }

  return (
    <form className="input" onSubmit={handleSubmit}>
        <input type="text" className="input__box" placeholder="Enter a text" value={todo} onChange={(e)=> setTodo(e.target.value)}/>
        <button className="input__submit" type="submit">Go</button>
    </form>
  )
}
