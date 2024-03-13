# app.py

# FastAPI
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# FastAPI 애플리케이션 생성
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
    return {"Greet": "Hello, FastAPI!"}

