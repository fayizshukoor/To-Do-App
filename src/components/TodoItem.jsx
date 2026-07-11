import "./TodoItem.css";

function TodoItem({task, onToggleTask, onDeleteTask, onEditTask, editingTaskId, editText, setEditText, onCancelEdit, onSaveEdit}){
    return (
            <li className="todo-item">
                <input type="checkbox" onChange={() => onToggleTask(task.id)} checked={task.completed} />
                {
                editingTaskId === task.id 
                ? (
                    <>
                    <input type="text" value={editText} onChange={(e)=> setEditText(e.target.value)}/> 
                    <button onClick={onSaveEdit}>Save</button>
                    <button onClick={onCancelEdit}>Cancel</button>
                    </>
                )
                : (
                    <>
                    <span style={{textDecoration : task.completed ? 'line-through':'none'}}>{task.text}</span>
                    <button onClick={()=>onEditTask(task)} disabled={task.completed}>Edit</button> 
                    <button onClick={()=> onDeleteTask(task.id)}>Delete</button>                    
                    </>
                    
                )
                
                }
            </li>
    )
}

export default TodoItem;