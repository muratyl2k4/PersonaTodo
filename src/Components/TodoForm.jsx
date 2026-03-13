import React, { useState } from 'react';

const TodoForm = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, description, dueDate);
    onClose();
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-300">Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          autoFocus
          className="w-full bg-slate-800/50 border border-slate-700 text-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder:text-slate-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-300">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add some details..."
          rows={3}
          className="w-full bg-slate-800/50 border border-slate-700 text-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder:text-slate-500 resize-none"
        />
      </div>
      
      <div className="space-y-1.5 flex flex-col">
        <label className="text-sm font-semibold text-slate-300">Deadline</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="bg-slate-800/50 border border-slate-700 text-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all cursor-pointer"
        />
      </div>

      <div className="pt-2 flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-xl transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-500/20"
        >
          Create Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
