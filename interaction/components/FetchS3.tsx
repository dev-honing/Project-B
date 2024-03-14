// components/FetchS3.tsx

import { useState, useEffect } from 'react';

interface S3Response {
  objects: string[];
}

const FetchS3 = () => {
  const [data, setData] = useState<S3Response | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5555/bhn-s3');
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
      <h1>S3 Storage Bucket 목록 보기</h1>
      {data ? (
        <ul>
          {data.objects.map((object, index) => (
            <li key={index}>{object}</li>
          ))}
        </ul>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default FetchS3;
