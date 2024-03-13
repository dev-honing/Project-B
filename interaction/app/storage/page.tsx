// app/storage/page.tsx
'use client'
import FetchS3 from '../../components/FetchS3';

const StoragePage = () => {
  return (
    <main>
      <h1>06 Storage Server</h1>
      <h3>저장소 테스트</h3>
      <FetchS3 />
    </main>
  );
};

export default StoragePage;