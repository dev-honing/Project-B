# app.py

# MariaDB
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv() # .env 파일에서 환경 변수 로드

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

# 데이터베이스 연결 문자열
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4"

# 데이터베이스 연결
engine = create_engine(DATABASE_URL, echo=True) # 엔진 생성
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, expire_on_commit=False) # 세션 생성

# 모델의 기반 클래스
Base = declarative_base()

app = FastAPI()

# CORS 설정
# 허용할 주소
origins = [
    "http://localhost:3000",  # Next.js 애플리케이션의 주소
    "http://127.0.0.1:3000",  # Next.js 애플리케이션의 주소
]

# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "FastAPI!"}