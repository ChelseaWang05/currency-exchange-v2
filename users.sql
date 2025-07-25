CREATE DATABASE currency;
use currency;

CREATE TABLE user (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    register_time DATETIME NOT NULL
);

INSERT INTO user (name, email, password, register_time) VALUES 
('Alice', 'alice@example.com', 'passAlice123', '2025-07-01 10:20:00'),
('Bob', 'bob@example.com', 'passBob123', '2025-07-01 11:05:00'),
('Charlie', 'charlie@example.com', 'passCharlie123', '2025-07-01 12:30:00'),
('David', 'david@example.com', 'passDavid123', '2025-07-02 09:45:00'),
('Eva', 'eva@example.com', 'passEva123', '2025-07-02 10:15:00'),
('Frank', 'frank@example.com', 'passFrank123', '2025-07-02 11:00:00'),
('Grace', 'grace@example.com', 'passGrace123', '2025-07-03 08:40:00'),
('Henry', 'henry@example.com', 'passHenry123', '2025-07-03 09:55:00'),
('Irene', 'irene@example.com', 'passIrene123', '2025-07-03 10:30:00'),
('Jack', 'jack@example.com', 'passJack123', '2025-07-03 11:45:00'),
('Karen', 'karen@example.com', 'passKaren123', '2025-07-04 08:00:00'),
('Leo', 'leo@example.com', 'passLeo123', '2025-07-04 09:10:00'),
('Mia', 'mia@example.com', 'passMia123', '2025-07-04 10:20:00'),
('Nathan', 'nathan@example.com', 'passNathan123', '2025-07-04 11:25:00'),
('Olivia', 'olivia@example.com', 'passOlivia123', '2025-07-05 12:35:00'),
('Peter', 'peter@example.com', 'passPeter123', '2025-07-05 13:40:00'),
('Quinn', 'quinn@example.com', 'passQuinn123', '2025-07-05 14:45:00'),
('Rachel', 'rachel@example.com', 'passRachel123', '2025-07-05 15:55:00'),
('Sam', 'sam@example.com', 'passSam123', '2025-07-06 09:10:00'),
('Tina', 'tina@example.com', 'passTina123', '2025-07-06 10:20:00');