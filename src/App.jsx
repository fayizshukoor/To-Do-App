import { useEffect } from "react";
import { useState } from "react";


function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(()=>{
      const savedTasks = localStorage.getItem('tasks');
      if(savedTasks){
        const parsedTasks = JSON.parse(savedTasks);
        return parsedTasks;
      }

      return [];
    
  });

  useEffect(()=>{
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks',serializedTasks);
  },[tasks])

  function handleAddTask() {

    if (!task.trim()) {
      return;
    }
    const taskObj = {
      id: Date.now(),
      text: task.trim(),
      completed: false
    }

    setTasks([...tasks, taskObj]);
    setTask("");

  }

  function handleToggleTask(id) {
    const updatedTasks = tasks.map((task)=>{
        if(task.id === id){
          return {
            ...task,
            completed: !task.completed
          }
        }

        return task;
    });

    setTasks(updatedTasks);
  }

  function handleDeleteTask(id){
    const remainingTasks = tasks.filter((task)=> task.id !== id);

    setTasks(remainingTasks);
  }

  return (
    <>
      <h1>To-do App</h1>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={handleAddTask}>Add</button>
      <h3>Tasks</h3>

      {
        tasks.length === 0 ? <p>No tasks yet..</p> :


          <ul>

            {

              tasks.map((task) => <li key={task.id}>
                <input type="checkbox" onChange={() => handleToggleTask(task.id)} checked={task.completed} />
                <span style={{textDecoration : task.completed ? 'line-through':'none'}}>{task.text}</span>
                <button onClick={()=> handleDeleteTask(task.id)}>Delete</button>
              </li>)
            }
          </ul>
      }

    </>
  )
}

export default App;

