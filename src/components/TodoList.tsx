import {iTodo} from "../model.ts";
import Todo from "./Todo.tsx";
import "./styles.css"

interface iProps{
    todos : iTodo[]
}

export default function TodoList({todos}: iProps) {
    return(
        <ul className="todos">
            {todos.map(todo => <Todo key={todo.id} todo={todo}/>)}
        </ul>
    )
}