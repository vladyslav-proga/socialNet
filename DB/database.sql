CREATE TABLE IF NOT EXISTS users
(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL DEFAULT 'USER',
  reg_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts
(
  post_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  media VARCHAR(1000),
  post_content VARCHAR(2100),
  date DATETIME DEFAULT CURRENT_TIMESTAMP
  -- доделать лайки, посты и комменты
);

CREATE TABLE IF NOT EXISTS comments
(
  post_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  content VARCHAR(2100),
  date DATETIME DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS likes
(
  post_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  quantity VARCHAR(5000),
  date DATETIME DEFAULT CURRENT_TIMESTAMP
);