from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
import os

load_dotenv()

db_params = {
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "host": os.getenv("DB_HOST"),
    "database": os.getenv("DB_NAME"),
    "port": os.getenv("DB_PORT")
}
print(db_params)

app = FastAPI(title="Car System API (FastAPI) - Login")

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    error: dict | None
    data: dict | None
    messages: dict | None

@app.post("/api/v1/login", response_model=LoginResponse)
def login_user(login_data: LoginRequest):
    try:
        if len(login_data.password) < 6:
            raise HTTPException(status_code=400, detail="Password must be at least 6 characters long")

        with psycopg2.connect(**db_params, cursor_factory=RealDictCursor) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT id, email, password FROM users WHERE email = %s", (login_data.email,))
                user = cur.fetchone()

                if not user:
                    return {
                        "error": {"message": "Invalid email or password"},
                        "data": None,
                        "messages": None
                    }

                if login_data.password != user["password"]:
                    return {
                        "error": {"message": "Invalid email or password"},
                        "data": None,
                        "messages": None
                    }

                return {
                    "error": None,
                    "data": {"login": "success"},
                    "messages": None
                }

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/health")
def health_check():
    try:
        with psycopg2.connect(**db_params) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT 1")
        return {"status": "OK", "message": "Login service connected to PostgreSQL"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))