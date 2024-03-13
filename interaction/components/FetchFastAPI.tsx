// components/FetchFastAPI.tsx

import React, { useEffect, useState } from "react";

interface Data {
  Hello: string;
}

const FetchFastAPI = () => {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (data === null) return <p>Loading...</p>;
  return <p>{data.Hello}</p>;
};

export default FetchFastAPI;