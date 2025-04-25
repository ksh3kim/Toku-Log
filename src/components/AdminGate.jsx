// === AdminGate.jsx === import React, { useState, useEffect } from 'react';

const MASTER_CODE = '894752';

export default function AdminGate({ onAuthSuccess }) { const [inputCode, setInputCode] = useState(''); const [hintVisible, setHintVisible] = useState(false); const [storedHint, setStoredHint] = useState(localStorage.getItem('admin_hint')); const storedPassword = localStorage.getItem('admin_pw');

const handleLogin = () => { if (inputCode === storedPassword || inputCode === MASTER_CODE) { localStorage.setItem('admin_verified', 'true'); onAuthSuccess(); } else { alert('비밀번호가 틀렸습니다.'); } };

const handleSetPassword = () => { if (inputCode.length < 4 || inputCode.length > 10) { alert('비밀번호는 4~10자리 숫자여야 합니다.'); return; } const hint = prompt('비밀번호 힌트를 입력하세요'); localStorage.setItem('admin_pw', inputCode); localStorage.setItem('admin_hint', hint); localStorage.setItem('admin_verified', 'true'); setStoredHint(hint); onAuthSuccess(); };

return ( <div> {storedPassword ? ( <> <input value={inputCode} onChange={e => setInputCode(e.target.value)} placeholder="비밀번호 입력" type="password" /> <button onClick={handleLogin}>로그인</button> <button onClick={() => setHintVisible(true)}>힌트 보기</button> {hintVisible && <div>힌트: {storedHint}</div>} </> ) : ( <> <input value={inputCode} onChange={e => setInputCode(e.target.value)} placeholder="비밀번호 설정 (4~10자리)" type="password" /> <button onClick={handleSetPassword}>설정</button> </> )} </div> ); }

// 다음 컴포넌트 파일을 받으시려면 "계속"이라고 입력해주세요.