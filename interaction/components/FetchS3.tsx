// components/FetchS3.tsx

import { useState, useEffect } from 'react';

interface S3Response {
  Key: string;
  LastModified: string;
  Size: number;
}

const FetchS3 = () => {
  const [data, setData] = useState<S3Response[] | null>(null);

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
        <table>
          <thead>
            <tr>
              <th>파일 이름</th>
              <th>파일 크기</th>
              <th>마지막 수정 날짜</th>
            </tr>
          </thead>
          <tbody>
            {/* 데이터가 존재하는지 확인하고 매핑 */}
            {data.map((object, index) => (
              <tr key={index}>
                <td>{object.Key}</td>
                <td>{object.Size}bytes</td>
                <td>{object.LastModified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default FetchS3;
