// app/fast/page.tsx
'use client'
import FetchFastAPI from '../../components/FetchFastAPI';

const FastAPIPage = () => {
  return (
    <main>
      <h1>03 REST API Server(FastAPI)</h1>
      <h3>FastAPI 테스트</h3>
      <FetchFastAPI />
    </main>
  );
}

export default FastAPIPage;