### ��������� � ������

- PostgreSQL 18 (https://www.postgresql.org/download/windows/)

- Node.js 16+(https://nodejs.org/en/download)
## +���������
npm install

### ����� ��������� PostgreSQL � cmd ����� (��� �� ���� ������ �������)
C:\Users\User>"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d car_system -f "C:\Users\User\source\repos\ExpressProject1\database_schema.sql"
������ ������������ postgres:

CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE INDEX
CREATE INDEX
CREATE INDEX
CREATE INDEX

C:\Users\User>"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d car_system -f "C:\Users\User\source\repos\ExpressProject1\sample_data.sql"
������ ������������ postgres:

INSERT 0 3
INSERT 0 3
INSERT 0 2
INSERT 0 1


### ������� .env �� .env.example,�������: 
cp .env.example .env

����
 ��������� � app.js �� �����

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'car_system',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 5432,
});

����� ���� ���������

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'car_system',
    password: 'Zadolbali11',
    port: 5432,
});



### ��������� ������
node app.js


API
POST /api/auth/login - ���� � �������
POST /api/auth/register - �����������
GET /api/users - ������ �������������
GET /api/cars - ������� �����������
GET /api/contracts - ������ ���������
GET /api/payments - ������� ��������
GET /api/health - �������� ������ API

### �������� api: http://localhost:3000/api/health