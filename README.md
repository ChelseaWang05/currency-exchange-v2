# Currency Exchange APP

## Setup DB

```sql
CREATE DATABASE neueda;

USE neueda;

-- DROP TABLE IF EXISTS exchange_rate;
-- DROP TABLE IF EXISTS currency;

CREATE TABLE currency (
id INT AUTO_INCREMENT PRIMARY KEY,
code CHAR(3) NOT NULL,
name VARCHAR(100) NOT NULL,
is_active BOOLEAN DEFAULT FALSE
);

CREATE TABLE exchange_rate (
  id INT AUTO_INCREMENT PRIMARY KEY,
  currency_id INT NOT NULL,
  base INT NOT NULL,
  date INT NOT NULL, 
  rate DOUBLE NOT NULL,
  FOREIGN KEY (currency_id) REFERENCES currency(id),
  FOREIGN KEY (base) REFERENCES currency(id),
  CONSTRAINT uq_rate UNIQUE (currency_id, base, date)
);

INSERT INTO currency (code, name, is_active)
VALUES
('USD', 'US Dollar', TRUE),
('CNY', 'Chinese Yuan', TRUE),
('JPY', 'Japanese Yen', TRUE),
('EUR', 'Euro', TRUE);

INSERT INTO exchange_rate (currency_id, base, date, rate)
VALUES
(1,1,20250701,1.0000),
(2,1,20250701,7.2450),
(3,1,20250701,157.3000),
(4,1,20250701,0.9152),
(1,1,20250702,1.0000),
(2,1,20250702,7.2500),
(3,1,20250702,157.8500),
(4,1,20250702,0.9180)
ON DUPLICATE KEY UPDATE
  rate = VALUES(rate);
```