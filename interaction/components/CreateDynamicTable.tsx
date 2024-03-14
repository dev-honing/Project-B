// interaction/components/CreateDynamicTable.tsx

import React, { useState } from 'react';

const CreateDynamicTable = () => {
  const [tableName, setTableName] = useState('');
  const [numTables, setNumTables] = useState('');
  const [message, setMessage] = useState('');

  const createTables = async () => {
    try {
      const response = await fetch('http://localhost:3333/createDynamicTables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tableName: tableName,
          numTables: parseInt(numTables)
        })
      });
      const data = await response.text();
      setMessage(data); // 서버로부터 받은 메시지를 상태에 저장하여 표시
    } catch (error) {
      console.error('테이블 생성 오류:', error);
      setMessage('테이블 생성 중 오류가 발생했습니다.'); // 오류 메시지 표시
    }
  };

  return (
    <div>
      <input
        type="text"
        value={tableName}
        onChange={e => setTableName(e.target.value)}
        placeholder="테이블 이름"
      />
      <input
        type="number"
        value={numTables}
        onChange={e => setNumTables(e.target.value)}
        placeholder="생성할 테이블 수"
      />
      <button onClick={createTables}>테이블 생성</button>
      {message && <p>{message}</p>} {/* 메시지가 존재하면 표시 */}
    </div>
  );
};

export default CreateDynamicTable;
