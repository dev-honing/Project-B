# app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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