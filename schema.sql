CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    episode VARCHAR (60) NOT NULL,
    nameFight VARCHAR (30) NOT NULL,
    nameSoundtrack VARCHAR(30),
    fightVideo TEXT
);