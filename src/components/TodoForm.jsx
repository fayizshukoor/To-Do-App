import { useState } from "react";
import "./TodoForm.css";

function TodoForm({onAddTask}){

      const [task, setTask] = useState("");

      function handleSubmit(event){

        event.preventDefault();

        const trimmedTask = task.trim()
        if (!trimmedTask) {
            return;
          }
            onAddTask(trimmedTask)
            setTask("");
      }

      function handleChange(e){
        setTask(e.target.value);
        
      }
    
    return (
        <div>
          <form className="todo-form" onSubmit={handleSubmit}>
            <input type="text" maxLength={50} value={task} onChange={handleChange} />
            <button type="submit" disabled={task.trim().length===0}>Add</button>
          </form>
          <p>{task.length}/50</p>
        </div>
        
    )
}

export default TodoForm;