import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import {iTodo} from "../model.ts";

interface iProps{
    todo: iTodo
    onComplete: (id: number) => void
    onDelete: (id: number) => void
}

export default function Todo({todo, onComplete, onDelete}: iProps) {
    return(
        <form className="todos__single">
            <span className="todos__single--text" style={todo.isCompleted ? {textDecoration: "line-through"} : {textDecoration: "none"}}>{todo.todo}</span>

            <div>
                <span className="icon"><AiFillEdit/></span>
                <span className="icon" onClick={()=> onDelete(todo.id)}><AiFillDelete/></span>
                <span className="icon" onClick={()=> onComplete(todo.id)}><MdDone/></span>
            </div>
        </form>
    )
}