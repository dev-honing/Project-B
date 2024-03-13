// components/FetchFastAPI.tsx

import React, { useEffect, useState } from "react";

interface Data {
  Greet: string;
}

const FetchFastAPI = () => {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    fetch("http://localhost:8000")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (data === null) return <p>Loading...</p>;
  return (
    <p>
      Fetch한 데이터:{" "}
      <span style={{ backgroundColor: "black", color: "white" }}>{data.Greet}</span>
    </p>
  );
};

export default FetchFastAPI;
