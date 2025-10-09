### Установка и запуск

- PostgreSQL 18 (https://www.postgresql.org/download/windows/)

- Node.js 16+(https://nodejs.org/en/download)
### +прописать
npm install

### после установки PostgreSQL в cmd пишем :
```bash
C:\Users\User>"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d car_system -f "C:\Users\User\source\repos\ExpressProject1\database_schema.sql"```

(что то типо такого выведет)
```
Пароль пользователя postgres:

CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE INDEX
CREATE INDEX
CREATE INDEX
CREATE INDEX
```

#в cmd пишем :
```bash
C:\Users\User>"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d car_system -f "C:\Users\User\source\repos\ExpressProject1\sample_data.sql"```

(что то типо такого выведет)
Пароль пользователя postgres:

INSERT 0 3
INSERT 0 3
INSERT 0 2
INSERT 0 1



### Создаем .env из .env.example,КОМАНДА: 
cp .env.example .env

ЛИБО

настройки в app.js из этого
```javascript
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'car_system',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 5432,
});```

такое надо прописать
```javascript
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'car_system',
    password: 'Zadolbali11',
    port: 5432,
});```



### Запускаем сервер
node app.js


API
POST /api/auth/login - Вход в систему
POST /api/auth/register - Регистрация
GET /api/users - Список пользователей
GET /api/cars - Каталог автомобилей
GET /api/contracts - Список договоров
GET /api/payments - История платежей
GET /api/health - Проверка работы API

### проверка api: http://localhost:3000/api/health






