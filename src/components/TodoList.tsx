import {iTodo} from "../model.ts";
import Todo from "./Todo.tsx";
import "./styles.css"

interface iProps{
    todos : iTodo[]
    onComplete: (id: number) => void
}

export default function TodoList({todos, onComplete}: iProps) {
    return(
        <ul className="todos">
            {todos.map(todo => <Todo key={todo.id} todo={todo} onComplete={onComplete}/>)}
        </ul>
    )
}