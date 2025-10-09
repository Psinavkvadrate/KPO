-- Пользователи
INSERT INTO users (username, password, email, role, full_name) VALUES
('admin', '$2b$10$exampleHash1', 'admin@cars.com', 'Administrator', 'Иванов Иван Иванович'),
('manager1', '$2b$10$exampleHash2', 'manager@cars.com', 'Manager', 'Петров Петр Петрович'),
('client1', '$2b$10$exampleHash3', 'client@mail.com', 'User', 'Сидоров Алексей Владимирович');

-- Клиенты
INSERT INTO clients (full_name, phone, email, user_id) VALUES
('Сидоров Алексей Владимирович', '+79161234567', 'client@mail.com', 3),
('Козлова Мария Сергеевна', '+79167654321', 'maria@mail.com', NULL);

-- Автомобили
INSERT INTO cars (vin, brand, model, year, price, mileage, status, condition, img) VALUES
('ZFA22300005556777', 'Toyota', 'Prado', 2007, 1010500.00, 150000, 'Available', 'good', 'https://via.placeholder.com/300x200?text=Toyota+Prado'),
('WDB9640651J123456', 'Mercedes', 'E-Class', 2018, 2850000.00, 75000, 'Available', 'good', 'https://via.placeholder.com/300x200?text=Mercedes+E-Class'),
('WAUZZZ8K9FA123456', 'Audi', 'A6', 2015, 2200000.00, 120000, 'Rented', 'medium', 'https://via.placeholder.com/300x200?text=Audi+A6');

-- Контракты
INSERT INTO contracts (client_name, client_phone, car_vin, amount, status) VALUES
('Сидоров Алексей Владимирович', '+79161234567', 'WAUZZZ8K9FA123456', 2200000.00, 'Active'),
('Козлова Мария Сергеевна', '+79167654321', 'ZFA22300005556777', 1010500.00, 'Completed');

-- Платежи
INSERT INTO payments (contract_id, amount, method, status) VALUES
(1, 2200000.00, 'Credit Card', 'Completed');