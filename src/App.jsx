  import { useState } from "react";
  import TodoForm from "./components/TodoForm";
  import TodoList from "./components/TodoList";
  import './App.css';
  import Toast from "./components/Toast";
import useLocalStorage from "./hooks/useLocalStorage";


  function App() {

    

    const [tasks, setTasks] = useLocalStorage('tasks',[]);


    const [toast, setToastMessage] = useState({
      id:0,
      type:"",
      message:""
    });


    function handleAddTask(taskText) {

      const duplicateExists = tasks.some((task)=> task.text.toLowerCase() === taskText.toLowerCase());

      if(duplicateExists){
        setToastMessage({
          id:Date.now(),
          type:'error',
          message:'Task already exists'
        })
        return;
      }
    
      const taskObj = {
        id: Date.now(),
        text: taskText,
        completed: false
      }

      setTasks([...tasks, taskObj]);
      setToastMessage({
        id:Date.now(),
        type:'success',
        message:'Task Added'
      });

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

      const duplicateExists = tasks.some((task) => task.text.toLowerCase() === trimmedText.toLowerCase() && task.id !== editingTaskId);
      if(duplicateExists){
        setToastMessage({
          id:Date.now(),
          type:'error',
          message:'A task with this name already exists'
        })
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
      setToastMessage({
        id:Date.now(),
        type:'success',
        message:'Task Updated'
      });

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
      setToastMessage({
        id:Date.now(),
        type:'success',
        message:'Task Deleted'
      });
    }


    function handleClearToast(){
        setToastMessage({
          id:0,
          type:"",
          message:""
        });
    }

    return (
      <div className="app">

        {toast.message && (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClearToast={handleClearToast}
          />
        )}

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

