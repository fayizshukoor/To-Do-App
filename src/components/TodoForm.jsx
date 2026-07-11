import { useState } from "react";
import "./TodoForm.css";

function TodoForm({onAddTask, error, onClearError}){

      const [task, setTask] = useState("");

      function handleSubmit(){

        const trimmedTask = task.trim()
        if (!trimmedTask) {
            return;
          }
            onAddTask(trimmedTask)
            setTask("");
      }

      function handleChange(e){
        setTask(e.target.value);
        onClearError()
        
      }
    
    return (
        <div>
          <div className="todo-form">
            <input type="text" value={task} onChange={handleChange} />
            <button onClick={handleSubmit}>Add</button>
          </div>
          {
            error && <p className="error">{error}</p>
          }
        </div>
        
    )
}

export default TodoForm;