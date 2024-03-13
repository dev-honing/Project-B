# app.py

# MariaDB
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from datetime import datetime
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base

# FastAPI
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

# Pydantic
from pydantic import BaseModel

# S3
import boto3

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

# 테이블 정의
class ImageMeta(Base):
    __tablename__ = "imageMeta" # 테이블 이름
    id = Column(Integer, primary_key=True, index=True) # id
    filename = Column(String(255), index=True) # 파일명
    created_at = Column(DateTime, default=datetime.now) # 생성일시
    filesize = Column(Integer) # 파일 크기
    filetype = Column(String(255)) # 파일 타입

# 테이블 생성
Base.metadata.create_all(bind=engine)

# Pydantic 모델 정의
class ImageMetaIn(BaseModel):
    id: int
    filename: str
    created_at: datetime
    filesize: int
    filetype: str
    
# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
# FastAPI 애플리케이션 생성
app = FastAPI()

# # 이미지 메타 데이터 생성
# @app.post("/imageMeta/", response_model=ImageMetaIn)
# def create_imagemeta(imagemeta: ImageMetaIn, db: Session = Depends(get_db)):
#     db_imagemeta = ImageMeta(**imagemeta.dict())
#     db.add(db_imagemeta)
#     db.commit()
#     db.refresh(db_imagemeta)
#     return db_imagemeta

# # 예제 데이터 추가
# @app.on_event("startup")
# async def startup_event():
#     db = SessionLocal()
#     for i in range(1, 6):
#         db_imagemeta = ImageMeta(filename=f"file{i}.jpg", filesize=i*1000, filetype="image/jpeg")
#         db.add(db_imagemeta)
#     db.commit()

# Pydantic 모델 정의
class ImageMetaOut(BaseModel):
    id: int
    filename: str
    created_at: datetime
    filesize: int
    filetype: str

# 이미지 메타 데이터 조회
@app.get("/imageMeta/{image_id}", response_model=ImageMetaOut)
def read_imagemeta(image_id: int, db: Session = Depends(get_db)):
    db_imagemeta = db.query(ImageMeta).filter(ImageMeta.id == image_id).first()
    if db_imagemeta is None:
        raise HTTPException(status_code=404, detail="ImageMeta not found")
    return db_imagemeta

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


# S3 클라이언트 생성
s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION_NAME")
)

# S3 Storage 연결
@app.get("/bhn-s3")
def s3_connection():
    try:
        # S3 버킷에 대한 리스트 객체 가져오기
        response = s3_client.list_objects_v2(Bucket=S3_BUCKET_NAME)
        return {"message": "S3 스토리지 연결 성공"}
    except Exception as e:
        return {"error": str(e)}
