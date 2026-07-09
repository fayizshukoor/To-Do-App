import TodoItem from "./TodoItem";


function TodoList({tasks, onToggleTask, onDeleteTask}){

    return (
            <ul>
            {tasks.map((task) => <TodoItem key={task.id} task={task} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask}  />)}
            </ul>    
        )
  }

export default TodoList;