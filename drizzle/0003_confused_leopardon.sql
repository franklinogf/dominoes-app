DROP TABLE IF EXISTS `games`

CREATE TABLE `games` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`winner` text NOT NULL,
	`team1` text NOT NULL,
	`team2` text NOT NULL,
	`score1` integer NOT NULL,
	`score2` integer NOT NULL,
	`date` integer NOT NULL
);
