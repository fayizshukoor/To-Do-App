function TodoItem({task, onToggleTask, onDeleteTask}){
    return (
            <li>
                <input type="checkbox" onChange={() => onToggleTask(task.id)} checked={task.completed} />
                <span style={{textDecoration : task.completed ? 'line-through':'none'}}>{task.text}</span>
                <button onClick={()=> onDeleteTask(task.id)}>Delete</button>
            </li>
    )
}

export default TodoItem;