// app/database/page.tsx
'use client'
import FetchTables from '../../components/FetchTables';
import CreateDynamicTable from '../../components/CreateDynamicTable';

const DatabasePage = () => {
  return (
    <main>
      <h1>04 DataBase Server</h1>
      <h3>데이터베이스 테스트</h3>
      {/* <FetchTables /> */}
      <CreateDynamicTable />
    </main>
  );
};

export default DatabasePage;