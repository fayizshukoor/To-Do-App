import TodoItem from "./TodoItem";
import "./TodoList.css";


function TodoList({tasks, onToggleTask, onDeleteTask, onEditTask, editingTaskId, editText, setEditText, onCancelEdit, onSaveEdit}){

    return (
            <ul className="todo-list">
            {tasks.map((task) => <TodoItem 
                                    key={task.id} 
                                    task={task} 
                                    onToggleTask={onToggleTask}
                                    onDeleteTask={onDeleteTask} 
                                    onEditTask={onEditTask} 
                                    editingTaskId={editingTaskId}
                                    editText={editText}
                                    setEditText={setEditText}
                                    onCancelEdit={onCancelEdit}
                                    onSaveEdit={onSaveEdit} />)}
            </ul>    
        )
  }

export default TodoList;