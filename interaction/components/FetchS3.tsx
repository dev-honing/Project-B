// components/FetchS3.tsx

import { useState, useEffect } from "react";

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
        const response = await fetch("http://localhost:5555/bhn-s3");
        const responseData: S3Response[] = await response.json();
        // 데이터 변환: 한국 시간으로 변환하고 분 단위까지만 표시
        const formattedData = responseData.map((item) => ({
          ...item,
          LastModified: new Date(item.LastModified).toLocaleString("ko-KR", {
            hour12: false,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching S3 data:", error);
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
              <th>편집 일시</th>
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
