USE ff_player_db;

DROP TABLE replacements; 
 
DROP TABLE players;

CREATE TABLE players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_id VARCHAR(5) NOT NULL UNIQUE,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  team VARCHAR(4),
  fantasy_position_1 VARCHAR(3),
  fantasy_position_2 VARCHAR(3),
  number TINYINT,
  injury_status VARCHAR(20),
  rotowire_id VARCHAR(45),
  rotoworld_id VARCHAR(45),
  sportradar_id VARCHAR(45),
  stats_id VARCHAR(45),
  yahoo_id VARCHAR(45),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE replacements (
	id INT AUTO_INCREMENT PRIMARY KEY,
    starter_id INT,
    replacement_id INT,
    position VARCHAR(3),
    week TINYINT,
    user_id VARCHAR(20),
    CONSTRAINT fk_starter
	FOREIGN KEY (starter_id)
	REFERENCES players(id)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	CONSTRAINT fk_replacement
	FOREIGN KEY (replacement_id)
	REFERENCES players(id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);
