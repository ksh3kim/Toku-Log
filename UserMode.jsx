import React from 'react';
import TitleList from './TitleList';

export default function UserMode() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">사용자 모드</h1>
      <TitleList editable={false} />
    </div>
  );
}