import React, { useEffect, useState } from 'react';

const defaultSettings = {
  fontFamily: 'system-ui',
  fontSize: '16px',
  language: 'ko',
};

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user_settings') || 'null');
    if (stored) setSettings(stored);
  }, []);

  const handleChange = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem('user_settings', JSON.stringify(updated));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">설정</h2>

      <label className="block mb-2 font-semibold">글꼴</label>
      <select
        className="border p-2 mb-4 w-full"
        value={settings.fontFamily}
        onChange={(e) => handleChange('fontFamily', e.target.value)}>
        <option value="system-ui">기본 (system-ui)</option>
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Noto Sans KR">Noto Sans KR</option>
      </select>

      <label className="block mb-2 font-semibold">글자 크기</label>
      <select
        className="border p-2 mb-4 w-full"
        value={settings.fontSize}
        onChange={(e) => handleChange('fontSize', e.target.value)}>
        <option value="14px">작게</option>
        <option value="16px">기본</option>
        <option value="18px">크게</option>
        <option value="20px">아주 크게</option>
      </select>

      <label className="block mb-2 font-semibold">언어</label>
      <select
        className="border p-2 mb-4 w-full"
        value={settings.language}
        onChange={(e) => handleChange('language', e.target.value)}>
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}