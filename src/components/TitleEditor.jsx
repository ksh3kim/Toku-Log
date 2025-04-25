// === TitleEditor.jsx === import React, { useState } from 'react';

export default function TitleEditor() { const [title, setTitle] = useState(''); const [year, setYear] = useState(''); const [type, setType] = useState('미설정'); const [episodes, setEpisodes] = useState(''); const [tags, setTags] = useState('');

const handleAdd = () => { if (!title) return alert('제목을 입력하세요'); const existing = JSON.parse(localStorage.getItem('titles') || '[]'); const newItem = { id: Date.now(), title, year, type, episodes, tags: tags.split(/[#\s]+/).filter(Boolean), watched: false, watchedDate: null, }; localStorage.setItem('titles', JSON.stringify([...existing, newItem])); setTitle(''); setYear(''); setType('미설정'); setEpisodes(''); setTags(''); alert('작품이 등록되었습니다.'); };

return ( <div> <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목" /> <input value={year} onChange={e => setYear(e.target.value)} placeholder="방영년도" /> <select value={type} onChange={e => setType(e.target.value)}> <option value="미설정">미설정</option> <option value="TV">TV 시리즈</option> <option value="영화">영화</option> <option value="웹드라마">웹드라마</option> </select> <input value={episodes} onChange={e => setEpisodes(e.target.value)} placeholder="총 회차" /> <input value={tags} onChange={e => setTags(e.target.value)} placeholder="#태그1 #태그2" /> <button onClick={handleAdd}>작품 등록</button> </div> ); }

// 다음 컴포넌트 파일을 받으시려면 "계속"이라고 입력해주세요.