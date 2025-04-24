import React from 'react';
import TitleEditor from './TitleEditor';
import TitleList from './TitleList';

export default function AdminMode() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">관리자 모드</h1>
      <TitleEditor />
      <hr className="my-4" />
      <TitleList editable={true} />
    </div>
  );
}
