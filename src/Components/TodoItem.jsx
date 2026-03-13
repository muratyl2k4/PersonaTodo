import React, { useState } from 'react';
import { Trash2, CheckCircle2, Circle, Edit2, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

const TodoItem = ({ todo, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleUpdate = (e) => {
    e.stopPropagation();
    if (editText.trim() && editText !== todo.text) {
      onUpdate(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setEditText(todo.text);
    setIsEditing(false);
  };

  const getDaysLeft = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dueDate);
    target.setHours(0, 0, 0, 0);
    
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysLeft(todo.dueDate);

  return (
    <div 
      className={`glass-card group flex flex-col p-4 rounded-xl cursor-pointer ${todo.completed ? 'opacity-60' : ''}`}
      onClick={() => !isEditing && setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center gap-3">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggle(todo.id);
          }}
          className={`transition-colors flex-shrink-0 ${todo.completed ? 'text-green-400' : 'text-slate-500 hover:text-primary-400'}`}
        >
          {todo.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
                className="bg-slate-700/50 border border-primary-500/30 text-slate-100 rounded-md py-1 px-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button onClick={handleUpdate} className="text-green-400 hover:text-green-300">
                <Check size={18} />
              </button>
              <button onClick={handleCancel} className="text-red-400 hover:text-red-300">
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <p className={`text-sm truncate font-bold ${todo.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                {todo.text}
              </p>
              <div className="flex items-center gap-2">
                {daysLeft !== null && !todo.completed && (
                  <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    daysLeft < 0 ? 'bg-red-500/20 text-red-400' : 
                    daysLeft <= 2 ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 
                    'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                  }`}>
                    {daysLeft < 0 ? 'Gecikti' : daysLeft === 0 ? 'Bugün' : `${daysLeft}g`}
                  </span>
                )}
                {isExpanded ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
              </div>
            </div>
          )}
        </div>
      </div>

      {isExpanded && !isEditing && (
        <div className="mt-4 pt-4 border-t border-slate-700/30 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {todo.description ? (
            <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-primary-500/30 pl-3">
              {todo.description}
            </p>
          ) : (
            <p className="text-[10px] text-slate-600 italic">Açıklama belirtilmedi.</p>
          )}
          
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-[9px] text-slate-500 font-medium">
              Eklendi: {new Date(todo.createdAt).toLocaleString()}
            </span>
            {todo.dueDate && (
              <span className="text-[9px] text-primary-400/80 font-medium">
                Bitiş: {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
            {todo.completed && todo.completedAt && (
              <span className="text-[9px] text-green-500/70 font-bold">
                Tamamlandı: {new Date(todo.completedAt).toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo.id);
              }}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
