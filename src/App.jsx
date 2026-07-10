import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import './App.css';


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


  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  function handleEditTask(task){
    
   setEditingTaskId(task.id);
   setEditText(task.text);
  }

  function handleCancelEdit(){
    setEditingTaskId(null);
    setEditText("");
  }

  function handleSaveEdit(){

    const trimmedText = editText.trim();
    if(editingTaskId === null || !trimmedText){
      return;
    }

    const updatedTasks = tasks.map((task)=>{
      if(task.id === editingTaskId){
        return {
          ...task,
          text : trimmedText
        }
      }

      return task;
    })

    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditText("");
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
    <div className="app">
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
         onEditTask={handleEditTask}
         editingTaskId={editingTaskId}
         editText={editText}
         setEditText={setEditText}
         onCancelEdit={handleCancelEdit}
         onSaveEdit={handleSaveEdit}
         />
      }

    </div>
  )
}

export default App;

