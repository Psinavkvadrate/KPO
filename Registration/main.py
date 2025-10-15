from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
import os

# .env
load_dotenv()

# коннект к бд
db_params = {
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "host": os.getenv("DB_HOST"),
    "database": os.getenv("DB_NAME"),
    "port": os.getenv("DB_PORT")
}


app = FastAPI(title="Car System API (FastAPI)")

# модель для запроса
class RegisterRequest(BaseModel):
    username: str
    password: str
    email: EmailStr
    full_name: str | None = None


# модель для ответа
class RegisterResponse(BaseModel):
    id: int
    username: str
    email: str
    role: str


@app.post("/api/auth/register", response_model=RegisterResponse)
def register_user(user: RegisterRequest):
    try:
        with psycopg2.connect(**db_params, cursor_factory=RealDictCursor) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT * FROM users WHERE username = %s OR email = %s",
                    (user.username, user.email)
                )
                if cur.fetchone():
                    raise HTTPException(status_code=400, detail="User with this username or email already exists")

                cur.execute(
                    """
                    INSERT INTO users (username, password, email, role, full_name)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id, username, email, role
                    """,
                    (user.username, user.password, user.email, 'User', user.full_name)
                )
                new_user = cur.fetchone()
                conn.commit()
                return new_user

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/health")
def health_check():
    try:
        with psycopg2.connect(**db_params) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT 1")
        return {
            "status": "OK",
            "message": "All modules are working with PostgreSQL",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
