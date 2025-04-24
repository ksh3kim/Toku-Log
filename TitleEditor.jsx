import React, { useState } from 'react';

export default function TitleEditor() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('미설정');
  const [episodes, setEpisodes] = useState('');
  const [tags, setTags] = useState('');

  const handleAdd = () => {
    if (!title) return alert('제목을 입력하세요');
    const existing = JSON.parse(localStorage.getItem('titles') || '[]');
    const newItem = {
      id: Date.now(),
      title,
      year,
      type,
      episodes,
      tags: tags.split(/[#\s]+/).filter(Boolean),
      watched: false,
      watchedDate: null,
    };
    localStorage.setItem('titles', JSON.stringify([...existing, newItem]));
    setTitle('');
    setYear('');
    setType('미설정');
    setEpisodes('');
    setTags('');
    alert('작품이 등록되었습니다.');
  };

  return (
    <div className="grid gap-2">
      <input className="border p-2" placeholder="작품 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="border p-2" placeholder="방영년도" value={year} onChange={(e) => setYear(e.target.value)} />
      <select className="border p-2" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="미설정">미설정</option>
        <option value="TV">TV 시리즈</option>
        <option value="영화">영화</option>
        <option value="웹드라마">웹드라마</option>
      </select>
      <input className="border p-2" placeholder="총 회차" value={episodes} onChange={(e) => setEpisodes(e.target.value)} />
      <input className="border p-2" placeholder="#태그1 #태그2" value={tags} onChange={(e) => setTags(e.target.value)} />
      <button className="bg-blue-600 text-white py-2 rounded" onClick={handleAdd}>작품 등록</button>
    </div>
  );
}