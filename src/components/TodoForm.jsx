import { useState } from "react";
import "./TodoForm.css";

function TodoForm({onAddTask}){

      const [task, setTask] = useState("");

      function handleSubmit(){

        const trimmedTask = task.trim()
        if (!trimmedTask) {
            return;
          }
            onAddTask(trimmedTask)
            setTask("");
      }
    
    return (
        <div className="todo-form">
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={handleSubmit}>Add</button>
        </div>
    )
}

export default TodoForm;