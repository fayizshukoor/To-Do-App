import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";


function App() {
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

  function handleAddTask(taskText) {

   
    const taskObj = {
      id: Date.now(),
      text: taskText,
      completed: false
    }

    setTasks([...tasks, taskObj]);

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
      <TodoForm
      onAddTask={handleAddTask}
      />
      <h3>Tasks</h3>

      {
        tasks.length === 0 ? <p>No tasks yet..</p> :


         <TodoList
         tasks={tasks}
         onToggleTask={handleToggleTask}
         onDeleteTask={handleDeleteTask}
         />
      }

    </>
  )
}

export default App;

