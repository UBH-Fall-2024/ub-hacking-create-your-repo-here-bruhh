-- Create a table for users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,  -- Hashed password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('professor', 'student') DEFAULT 'student'
);

-- Create a table for parking spots
CREATE TABLE parking_spots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    spot_id INT NOT NULL,
    status ENUM('available', 'parked') DEFAULT 'available',
    location VARCHAR(255)
);