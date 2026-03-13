const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
const tomorrow = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);

export const initialTodos = [
  { 
    id: 1, 
    text: 'React Temellerini Öğren', 
    description: 'Component yapısı, useState ve useEffect kancalarını detaylıca incele.',
    completed: true, 
    createdAt: yesterday.toISOString(), 
    completedAt: now.toISOString(),
    dueDate: null
  },
  { 
    id: 2, 
    text: 'Todo Uygulamasını Geliştir', 
    description: 'Modal tasarımı ve detaylı görünüm özelliklerini ekleyerek projeyi profesyonel bir seviyeye taşı.',
    completed: false, 
    createdAt: now.toISOString(), 
    completedAt: null,
    dueDate: nextWeek.toISOString().split('T')[0]
  },
  { 
    id: 3, 
    text: 'Tailwind CSS v4 Keşfet', 
    description: 'Yeni @theme ve @import özelliklerini kullanarak stili güncelle.',
    completed: false, 
    createdAt: now.toISOString(), 
    completedAt: null,
    dueDate: tomorrow.toISOString().split('T')[0]
  },
];
