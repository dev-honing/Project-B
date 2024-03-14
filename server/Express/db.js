// server/Express/db.js

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config({ path: '../../.env'});

const app = express();

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000', // Next App
  credentials: true
}));

// MySQL 연결 풀 생성
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// 데이터베이스 연결 풀을 Express 애플리케이션에 추가
app.set('dbPool', pool);

// API 엔드 포인트 생성
// imageMeta 테이블에서 모든 데이터를 가져오는 API 엔드 포인트
app.get('/imageMeta', async (req, res) => {
  const pool = req.app.get('dbPool');
  const [rows, fields] = await pool.query('SELECT * FROM imagemeta');
  res.json(rows);
});

// 동적 테이블 생성을 위한 API 엔드 포인트
app.post('/createDynamicTables', async (req, res) => {
  try {
    const pool = req.app.get('dbPool');
    const { tableName, numTables } = req.body; // 클라이언트에서 전송한 테이블 이름과 생성할 테이블의 수

    if (!tableName || !numTables) {
      // 클라이언트에서 요청한 데이터가 유효하지 않을 경우 에러 처리
      return res.status(400).send('테이블 이름과 생성할 테이블 수를 모두 제공해야 합니다.');
    }

    const tables = Array.from({ length: numTables }, (_, index) => `${tableName}-${index + 1}`);

    const promises = tables.map(async (tableName) => {
      const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      )`;
      await pool.query(sql);
    });

    await Promise.all(promises);

    return res.status(200).send(`${numTables}개의 테이블이 성공적으로 생성되었습니다.`);
  } catch (error) {
    console.error('테이블 생성 오류:', error);
    return res.status(500).send('테이블 생성 중 오류가 발생했습니다.');
  }
});

// Express 애플리케이션을 실행
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`서버 ON: http://localhost:${PORT}`);
});
