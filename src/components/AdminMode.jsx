// === AdminMode.jsx ===
import React from 'react'; import TitleEditor from './TitleEditor'; import TitleList from './TitleList';

export default function AdminMode() { return ( <div> <h2>관리자 모드</h2> <TitleEditor /> <TitleList editable={true} /> </div> ); }

// 다음 컴포넌트 파일을 받으시려면 "계속"이라고 입력해주세요.