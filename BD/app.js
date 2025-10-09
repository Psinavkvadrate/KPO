const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

require('dotenv').config();

// Настройка PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'car_system',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 5432,
});

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// ==================== AUTH MODULE ====================
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await pool.query(
            'SELECT id, username, email, role, full_name FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({
            error: null,
            data: { user: result.rows[0] }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, password, email, full_name } = req.body;
        const result = await pool.query(
            'INSERT INTO users (username, password, email, role, full_name) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, role',
            [username, password, email, 'User', full_name]
        );

        res.json({
            error: null,
            data: { user: result.rows[0] }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== USER MANAGEMENT ====================
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, username, email, role, full_name, created_at FROM users'
        );

        res.json({
            error: null,
            data: { users: result.rows }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== CAR MANAGEMENT ====================
app.get('/api/cars', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT vin as "VIN", brand as mark, model, year as "prodYear",
                   price as amount, mileage, status, condition, img, post_date as "postDate"
            FROM cars 
            ORDER BY post_date DESC
        `);

        res.json({
            error: null,
            data: { data: result.rows, messages: null }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== CONTRACT MANAGEMENT ====================
app.get('/api/contracts', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                c.contract_id, 
                c.date, 
                c.client_name,
                c.client_phone,
                c.amount, 
                c.status,
                car.brand as car_brand, 
                car.model as car_model, 
                car.vin as car_vin
            FROM contracts c
            JOIN cars car ON c.car_vin = car.vin
            ORDER BY c.date DESC
        `);

        res.json({
            error: null,
            data: { contracts: result.rows }
        });
    } catch (error) {
        console.error('Contracts error:', error);
        res.status(500).json({
            error: 'Contracts loading failed: ' + error.message,
            data: null
        });
    }
});

// ==================== PAYMENT MANAGEMENT ====================
app.get('/api/payments', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.payment_id, p.amount, p.method, p.status, p.created_at,
                   c.contract_id, cl.full_name as client_name
            FROM payments p
            JOIN contracts c ON p.contract_id = c.contract_id
            JOIN clients cl ON c.client_id = cl.client_id
            ORDER BY p.created_at DESC
        `);

        res.json({
            error: null,
            data: { payments: result.rows }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== жив ли сервер ====================
app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({
            status: 'OK',
            message: 'All modules are working with PostgreSQL',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`🚗 Full Car Rental API running on http://localhost:${port}`);
    console.log('📊 Available endpoints:');
    console.log('   👤 AUTH:    POST /api/auth/login, /api/auth/register');
    console.log('   👥 USERS:   GET /api/users');
    console.log('   🚗 CARS:    GET /api/cars');
    console.log('   📝 CONTRACT: GET /api/contracts');
    console.log('   💰 PAYMENT: GET /api/payments');
    console.log('   ❤️  HEALTH:  GET /api/health');
});