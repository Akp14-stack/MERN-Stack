import React from 'react';
import { FaRegTrashAlt, FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';

const TodoList = ({ tasks, handleToggleComplete, handleRemoveTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
          }}
        >
          <span
            onClick={() => handleToggleComplete(task.id)}
            style={{ cursor: 'pointer' }}
          >
            {task.completed ? <FaRegCheckSquare /> : <FaRegSquare />}
          </span>
          {task.text}
          <span
            onClick={() => handleRemoveTask(task.id)}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          >
            <FaRegTrashAlt />
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;