import React, { useState, useEffect } from 'react';

const MASTER_CODE = '894752';

export default function AdminGate({ onAuthSuccess }) {
  const [inputCode, setInputCode] = useState('');
  const [hintVisible, setHintVisible] = useState(false);
  const [showMasterInput, setShowMasterInput] = useState(false);
  const [masterInput, setMasterInput] = useState('');
  const [allowReset, setAllowReset] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const storedPassword = localStorage.getItem('admin_pw');
  const storedHint = localStorage.getItem('admin_hint');

  const handleLogin = () => {
    if (inputCode === storedPassword || inputCode === MASTER_CODE) {
      localStorage.setItem('admin_verified', 'true');
      onAuthSuccess();
    } else {
      setAttempts(prev => prev + 1);
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleSetPassword = () => {
    if (inputCode.length < 4 || inputCode.length > 10) {
      alert('비밀번호는 4~10자리 숫자여야 합니다.');
      return;
    }
    const hint = prompt('비밀번호 힌트를 입력하세요 (예: 내가 좋아하는 음식)');
    localStorage.setItem('admin_pw', inputCode);
    localStorage.setItem('admin_hint', hint);
    localStorage.setItem('admin_verified', 'true');
    onAuthSuccess();
  };

  const handleMasterCodeCheck = () => {
    if (masterInput === MASTER_CODE) {
      setAllowReset(true);
      alert('마스터 코드 인증 완료. 비밀번호 초기화가 가능합니다.');
    } else {
      alert('마스터 코드가 틀렸습니다.');
    }
  };

  const resetPassword = () => {
    if (!allowReset) return;
    if (window.confirm('정말로 관리자 비밀번호를 초기화하시겠습니까?')) {
      localStorage.removeItem('admin_pw');
      localStorage.removeItem('admin_hint');
      localStorage.removeItem('admin_verified');
      alert('초기화 완료. 비밀번호를 다시 설정해주세요.');
      setAllowReset(false);
      setShowMasterInput(false);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-3 max-w-sm mx-auto mt-10">
      {storedPassword ? <>
        <h2 className="text-xl font-bold">관리자 모드 진입</h2>
        <input
          className="border p-2"
          type="password"
          placeholder="비밀번호 입력"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}>확인</button>
          <button className="text-sm underline" onClick={() => setHintVisible(!hintVisible)}>힌트 보기</button>
        </div>
        {hintVisible && <p className="text-sm text-gray-500">힌트: {storedHint || '없음'}</p>}

        {attempts >= 3 && !allowReset && !showMasterInput && (
          <button className="text-sm text-blue-600 underline" onClick={() => setShowMasterInput(true)}>
            비밀번호를 잊으셨나요?
          </button>
        )}

        {showMasterInput && !allowReset && (
          <div className="flex flex-col gap-2">
            <input
              className="border p-2"
              type="password"
              placeholder="마스터 코드 입력"
              value={masterInput}
              onChange={(e) => setMasterInput(e.target.value)}
            />
            <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={handleMasterCodeCheck}>확인</button>
          </div>
        )}

        {allowReset && (
          <button className="text-red-600 text-sm underline mt-2" onClick={resetPassword}>비밀번호 초기화</button>
        )}
      </> : <>
        <h2 className="text-xl font-bold">최초 관리자 비밀번호 설정</h2>
        <input
          className="border p-2"
          type="password"
          placeholder="비밀번호 입력 (4~10자리)"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSetPassword}>설정</button>
      </>}
    </div>
  );
}
