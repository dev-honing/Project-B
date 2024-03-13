// components/FetchS3.tsx

import { useState, useEffect } from 'react';

interface S3Response {
  message: string;
}

const FetchS3 = () => {
  const [data, setData] = useState<S3Response | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/bhn-s3');
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching S3 data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>S3 Storage 연결 상태</h1>
      {data ? (
        <p>{data.message}</p>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default FetchS3;
