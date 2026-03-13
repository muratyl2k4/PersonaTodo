import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onToggle, onUpdate }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-500 italic">No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onDelete={onDelete} 
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;
