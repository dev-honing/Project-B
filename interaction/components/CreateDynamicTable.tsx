// interaction/components/CreateDynamicTable.tsx

import React, { useState } from 'react';

const CreateDynamicTable = () => {
  const [tableName, setTableName] = useState('');

  const createTable = async () => {
    try {
      const response = await fetch(`http://localhost:3333/createDynamicTable/${tableName}`, {
        method: 'POST'
      });
      const data = await response.text();
      alert(data);
    } catch (error) {
      console.error('테이블 생성 오류:', error);
      alert('테이블 생성 중 오류가 발생했습니다.');
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
      <button onClick={createTable}>테이블 생성</button>
    </div>
  );
};

export default CreateDynamicTable;