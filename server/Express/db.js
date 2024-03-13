// server/Express/db.js

const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();

// MySQL 연결 풀 생성
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// 데이터베이스 연결 풀을 Express 애플리케이션에 추가
app.set('dbPool', pool);

// Express 애플리케이션을 실행
const PORT = 3306;
app.listen(PORT, () => {
  console.log(`서버 ON: http://localhost:${PORT}`);
});

// 추가적인 동작이 필요한 경우 이곳에 작성할 수 있습니다.
