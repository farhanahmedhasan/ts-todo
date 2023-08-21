import InputField from './components/InputField'
import './App.css'
import {useState} from "react";
import {iTodo} from "./model.ts";

function App() {
    const [todos, setTodos] = useState<iTodo[]>([])

    function handleAddTodo(todo:iTodo) {
        setTodos([...todos,todo])
    }

  return (
    <div className="App">
      <span className='heading'>Taskify</span>
      <InputField onAddTodo={handleAddTodo}/>
    </div>
  )
}

export default App
