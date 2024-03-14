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
app.get('/imageMeta', async (req, res) => {
  const pool = req.app.get('dbPool');
  const [rows, fields] = await pool.query('SELECT * FROM imagemeta');
  res.json(rows);
});

// Express 애플리케이션을 실행
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`서버 ON: http://localhost:${PORT}`);
});
