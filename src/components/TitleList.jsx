import React, { useEffect, useState, useRef } from 'react';

export default function TitleList({ editable }) {
  const [titles, setTitles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [filterWatched, setFilterWatched] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('titles') || '[]');
    setTitles(stored);
  }, []);

  useEffect(() => {
    let base = [...titles];
    if (filterWatched !== null) {
      base = base.filter(t => t.watched === filterWatched);
    }
    if (search.trim()) {
      base = base.filter(t =>
        t.title.includes(search) || t.tags.some(tag => tag.includes(search))
      );
    }
    setFiltered(base);
  }, [titles, search, filterWatched]);

  const toggleWatch = (id) => {
    const updated = titles.map(item => item.id === id ? {
      ...item,
      watched: !item.watched,
      watchedDate: !item.watched ? new Date().toISOString().split('T')[0] : null
    } : item);
    setTitles(updated);
    localStorage.setItem('titles', JSON.stringify(updated));
  };

  const handleEdit = (id) => {
    if (!editable) return;
    const item = titles.find(t => t.id === id);
    const title = prompt('제목', item.title);
    const year = prompt('방영년도', item.year);
    const type = prompt('분류 (TV/영화/웹드라마)', item.type);
    const episodes = prompt('총 회차', item.episodes);
    const tags = prompt('태그 (공백/해시로 구분)', item.tags.join(' '));
    if (!title) return;
    const updated = titles.map(t => t.id === id ? {
      ...t,
      title, year, type, episodes, tags: tags.split(/[#\\s]+/).filter(Boolean)
    } : t);
    setTitles(updated);
    localStorage.setItem('titles', JSON.stringify(updated));
  };

  const openWiki = (title) => {
    const link = `https://namu.wiki/w/${encodeURIComponent(title)}`;
    window.open(link, '_blank');
  };

  const handleResetAll = () => {
    if (!window.confirm('전체 시청 체크를 해제하시겠습니까?')) return;
    const updated = titles.map(t => ({ ...t, watched: false, watchedDate: null }));
    setTitles(updated);
    localStorage.setItem('titles', JSON.stringify(updated));
  };

  const handleBackup = () => {
    const isAdmin = localStorage.getItem('admin_verified') === 'true';
    const data = isAdmin ? titles : titles.filter(t => t.watched);
    const txt = data.map(t => {
      return `[${t.type}] ${t.title} (${t.year}) - ${t.episodes || '?'}부작 - #${t.tags.join(' #')}${t.watched ? ` - 시청일: ${t.watchedDate}` : ''}`;
    }).join('\\n');
    const blob = new Blob([txt], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `watchlist_backup_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  const handleRestore = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const lines = reader.result.split('\\n');
      const restored = lines.map((line, i) => {
        const [head, ...rest] = line.split(' - ');
        const [typePart, titlePart] = head.split('] ');
        const type = typePart.replace('[', '');
        const [title, year] = titlePart.split(' (');
        const cleanYear = year?.replace(')', '').trim();
        const episodes = rest[0]?.replace('부작', '').trim();
        const tags = (rest[1] || '').split('#').filter(Boolean).map(s => s.trim());
        const watchedDate = (rest.find(r => r.includes('시청일')) || '').split(': ')[1] || null;
        return {
          id: Date.now() + i,
          title: title.trim(),
          year: cleanYear,
          type,
          episodes,
          tags,
          watched: !!watchedDate,
          watchedDate
        };
      });
      const combined = [...titles, ...restored];
      setTitles(combined);
      localStorage.setItem('titles', JSON.stringify(combined));
      alert('복원 완료!');
    };
    reader.readAsText(file);
  };

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <input
          className="border p-2 flex-1"
          placeholder="검색 (제목/태그)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={`text-sm border rounded px-2 py-1 ${filterWatched === null ? 'bg-gray-200' : ''}`} onClick={() => setFilterWatched(null)}>전체</button>
        <button className={`text-sm border rounded px-2 py-1 ${filterWatched === true ? 'bg-green-200' : ''}`} onClick={() => setFilterWatched(true)}>시청</button>
        <button className={`text-sm border rounded px-2 py-1 ${filterWatched === false ? 'bg-yellow-200' : ''}`} onClick={() => setFilterWatched(false)}>미시청</button>
        <button className="text-xs text-red-600 underline ml-auto" onClick={handleResetAll}>전체 해제</button>
      </div>

      {filtered.map(item => (
        <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded shadow">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.watched}
              onChange={() => toggleWatch(item.id)}
            />
            <div>
              <div className="font-semibold">
                {item.title} <span className="text-sm text-gray-500">({item.year})</span>
                <span className="ml-2 text-xs bg-gray-200 px-2 rounded">{item.type}</span>
              </div>
              {item.tags.length > 0 && (
                <div className="text-sm text-gray-600"># {item.tags.join(' #')}</div>
              )}
              {item.watched && (
                <div className="text-xs text-blue-600">시청일: {item.watchedDate}</div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="text-blue-600 text-sm underline" onClick={() => openWiki(item.title)}>
              나무위키
            </button>
            {editable && (
              <button className="text-sm text-gray-600 underline" onClick={() => handleEdit(item.id)}>수정</button>
            )}
          </div>
        </div>
      ))}

      <div className="flex gap-4 mt-6 items-center">
        <button className="bg-gray-200 px-4 py-2 rounded" onClick={handleBackup}>백업 (.txt)</button>
        <input
          type="file"
          accept=".txt"
          ref={fileInputRef}
          onChange={handleRestore}
          style={{ display: 'none' }}
        />
        <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => fileInputRef.current.click()}>복원 (.txt)</button>
      </div>
    </div>
  );
}
