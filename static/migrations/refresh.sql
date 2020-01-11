CREATE TABLE IF NOT EXISTS exchanges
  (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    label VARCHAR(50) NOT NULL UNIQUE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE IF NOT EXISTS products
  (
    id INT NOT NULL AUTO_INCREMENT,
    pair VARCHAR(20) NOT NULL,
    base VARCHAR(12) NOT NULL,
    quote VARCHAR(12) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE IF NOT EXISTS product_exchange
  (
    id INT NOT NULL AUTO_INCREMENT,
    trading BOOLEAN DEFAULT true,
    margin BOOLEAN DEFAULT false,
    iceberg BOOLEAN,
    oco BOOLEAN,
    spot_trading BOOLEAN,
    base_min DECIMAL(22, 11),
    base_max DECIMAL(22, 11),
    quote_min DECIMAL(22, 11),
    quote_max DECIMAL(22, 11),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exchange_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (exchange_id) REFERENCES exchanges (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS klines
  (
    id INT NOT NULL AUTO_INCREMENT,
    server_time TIMESTAMP NOT NULL,
    low DECIMAL(22, 11),
    high DECIMAL(22, 11),
    open DECIMAL(22, 11),
    close DECIMAL(22, 11),
    amount DECIMAL(22, 11),
    volume DECIMAL(22, 11),
    period INT(10),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exchange_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (exchange_id) REFERENCES exchanges (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS trades
  (
    id INT NOT NULL AUTO_INCREMENT,
    server_time TIMESTAMP NOT NULL,
    sequence BIGINT(12),
    price DECIMAL(22, 11),
    size DECIMAL(22, 11),
    quote_size DECIMAL(22, 11),
    side VARCHAR(10),
    best_match BOOLEAN,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exchange_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (exchange_id) REFERENCES exchanges (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS tickers
  (
    id INT NOT NULL AUTO_INCREMENT,
    server_time TIMESTAMP NOT NULL,
    sequence BIGINT(12) NOT NULL,
    price DECIMAL(22, 11),
    size DECIMAL(22, 11),
    bid DECIMAL(22, 11),
    ask DECIMAL(22, 11),
    volume DECIMAL(22, 11),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exchange_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (exchange_id) REFERENCES exchanges (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );
