// components/FetchTables.tsx

import React, { useEffect, useState } from 'react';

interface ImageMeta {
  id: number;
  filename: string;
  created_at: string;
  filesize: number;
  filetype: string;
}

const FetchTables = () => {
  const [data, setData] = useState<ImageMeta[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/imageMeta')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Image Meta Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Filename</th>
            <th>Created At</th>
            <th>Filesize</th>
            <th>Filetype</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.filename}</td>
              <td>{item.created_at}</td>
              <td>{item.filesize}</td>
              <td>{item.filetype}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchTables;
