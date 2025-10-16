- main.py
- .env
- requirements.txt
- test_login.py

### установка зависимостей
pip install -r requirements.txt (проверить совпадение пароля в requirements.txt с паролем в PostgreSQL)

### запуск:

uvicorn main:app --reload

### проверка всего: 

http://127.0.0.1:8000/docs или http://127.0.0.1:8000/redoc

### запуск тестов: 

pytest -v
