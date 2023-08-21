import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import {iTodo} from "../model.ts";

interface iProps{
    todo: iTodo
}

export default function Todo({todo}: iProps) {
    return(
        <form className="todos__single">
            <span className="todos__single--text">{todo.todo}</span>

            <div>
                <span className="icon"><AiFillEdit/></span>
                <span className="icon"><AiFillDelete/></span>
                <span className="icon"><MdDone/></span>
            </div>
        </form>
    )
}