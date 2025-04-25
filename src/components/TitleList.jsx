// === TitleList.jsx === import React, { useEffect, useState } from 'react';

export default function TitleList({ editable }) { const [titles, setTitles] = useState([]);

useEffect(() => { const stored = JSON.parse(localStorage.getItem('titles') || '[]'); setTitles(stored); }, []);

const toggleWatch = (id) => { const updated = titles.map(item => item.id === id ? { ...item, watched: !item.watched, watchedDate: !item.watched ? new Date().toISOString().split('T')[0] : null } : item); setTitles(updated); localStorage.setItem('titles', JSON.stringify(updated)); };

const handleEdit = (id) => { if (!editable) return; const item = titles.find(t => t.id === id); const title = prompt('제목', item.title); if (!title) return; const updated = titles.map(t => t.id === id ? { ...t, title } : t); setTitles(updated); localStorage.setItem('titles', JSON.stringify(updated)); };

return ( <div> {titles.map(item => ( <div key={item.id}> <input type="checkbox" checked={item.watched} onChange={() => toggleWatch(item.id)} /> {item.title} ({item.year}) [{item.type}] {item.tags.join(', ')} {item.watched && (시청일: ${item.watchedDate})} {editable && <button onClick={() => handleEdit(item.id)}>수정</button>} </div> ))} </div> ); }

// 다음 컴포넌트 파일을 받으시려면 "계속"이라고 입력해주세요.