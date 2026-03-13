import React, { useState, useEffect } from 'react';
import TodoForm from '../Components/TodoForm';
import TodoList from '../Components/TodoList';
import { initialTodos } from '../Interfaces/todo-mock';
import Modal from '../Components/Modal';
import { Plus } from 'lucide-react';

const TodoPage = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('persona-todo-tasks');
    return saved ? JSON.parse(saved) : initialTodos;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('persona-todo-tasks', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, description, dueDate) => {
    const newTodo = {
      id: Date.now(),
      text: title, // Keeping 'text' as the main title for compatibility
      description: description || '',
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      dueDate: dueDate || null,
    };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? new Date().toISOString() : null
          }
          : todo
      )
    );
  };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400 mb-2">
            Persona ToDo
          </h1>
          <p className="text-slate-400 font-medium">Elevate your productivity</p>
        </div>

        <div className="glass rounded-3xl p-6 shadow-2xl space-y-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 px-6 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary-500/20 active:scale-95 group"
          >
            <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            New Task
          </button>

          <div className="pt-4 border-t border-slate-700/50">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-lg font-bold text-slate-200">Tasks</h2>
              <span className="px-3 py-1 bg-primary-500/10 text-primary-400 text-xs font-bold rounded-full border border-primary-500/20">
                {todos.length} Active
              </span>
            </div>

            <TodoList
              todos={todos}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
      >
        <TodoForm
          onAdd={addTodo}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default TodoPage;
