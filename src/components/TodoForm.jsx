import { useState } from "react";

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
        <>
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={handleSubmit}>Add</button>
        </>
    )
}

export default TodoForm;