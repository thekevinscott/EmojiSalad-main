-- MySQL dump 10.13  Distrib 5.6.22, for osx10.10 (x86_64)
--
-- Host: emojinaryfriend.cfiretgvvbvv.us-east-1.rds.amazonaws.com    Database: emojinaryfriend
-- ------------------------------------------------------
-- Server version	5.6.23-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clues`
--

DROP TABLE IF EXISTS `clues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clues` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `phrase_id` int(11) DEFAULT NULL,
  `clue` varchar(255) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `game_participants`
--

DROP TABLE IF EXISTS `game_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_participants` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `game_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `one_user_per_game` (`user_id`,`game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `game_phrases`
--

DROP TABLE IF EXISTS `game_phrases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_phrases` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `game_id` int(11) DEFAULT NULL,
  `phrase_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `game_states`
--

DROP TABLE IF EXISTS `game_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_states` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `games` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `state_id` int(11) NOT NULL DEFAULT '1',
  `guesses` int(11) DEFAULT NULL,
  `clues_allowed` int(11) DEFAULT NULL,
  `random` tinyint(1) NOT NULL DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `guesses`
--

DROP TABLE IF EXISTS `guesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guesses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `round_id` int(11) DEFAULT NULL,
  `guess` text,
  `correct` tinyint(1) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `incomingMessages`
--

DROP TABLE IF EXISTS `incomingMessages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `incomingMessages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `response` text COLLATE utf8mb4_unicode_ci,
  `created` timestamp(6) NOT NULL,
  `platform_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `invites`
--

DROP TABLE IF EXISTS `invites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invites` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `invited_id` int(11) DEFAULT NULL,
  `inviter_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `unique-invites` (`invited_id`,`inviter_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(187) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `comments` text COLLATE utf8mb4_unicode_ci,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `outgoingMessages`
--

DROP TABLE IF EXISTS `outgoingMessages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `outgoingMessages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `message_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `options` text COLLATE utf8mb4_unicode_ci,
  `message` text COLLATE utf8mb4_unicode_ci,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `platform_id` int(11) DEFAULT NULL,
  `created` timestamp(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `phrases`
--

DROP TABLE IF EXISTS `phrases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phrases` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `phrase` varchar(255) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `platforms`
--

DROP TABLE IF EXISTS `platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `platforms` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `platform` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `player_order`
--

DROP TABLE IF EXISTS `player_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player_order` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `game_id` int(11) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`game_id`),
  UNIQUE KEY `order` (`order`,`game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `round_clues`
--

DROP TABLE IF EXISTS `round_clues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `round_clues` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `round_id` int(11) DEFAULT NULL,
  `clue_id` int(11) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `round_states`
--

DROP TABLE IF EXISTS `round_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `round_states` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rounds`
--

DROP TABLE IF EXISTS `rounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rounds` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `game_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `submitter_id` int(11) DEFAULT NULL,
  `phrase_id` int(11) DEFAULT NULL,
  `winner_id` int(11) DEFAULT NULL,
  `guesses` int(11) DEFAULT NULL,
  `clues_allowed` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_attribute_keys`
--

DROP TABLE IF EXISTS `user_attribute_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_attribute_keys` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_attributes`
--

DROP TABLE IF EXISTS `user_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_attributes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `attribute_id` int(11) DEFAULT NULL,
  `attribute` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`attribute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_entries`
--

DROP TABLE IF EXISTS `user_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_entries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_states`
--

DROP TABLE IF EXISTS `user_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_states` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) DEFAULT NULL,
  `state_id` int(2) DEFAULT '1',
  `platform_id` int(11) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=418 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-09-10 14:32:30
-- MySQL dump 10.13  Distrib 5.6.22, for osx10.10 (x86_64)
--
-- Host: emojinaryfriend.cfiretgvvbvv.us-east-1.rds.amazonaws.com    Database: emojinaryfriend
-- ------------------------------------------------------
-- Server version	5.6.23-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (15,'thekevinscott','$6$PZfnzPZnEeLaBQ==$axM5X2Ndzc29xQMEDFvePMigauhmTzydzTdErlX9Rs8LEfh902UnfRBo3qaSEs0QjIIqHxBjpI7Zg1uwIiYNf0','$6$PZfnzPZnEeLaBQ==','2015-08-15 10:49:46'),(16,'schloo','$6$YTtpkndBlh/HSQ==$Ka6XF4N5j/6GTGjDsiBWkSw1/6/F/0/OJ9VqN.s4wnsIVAG660aJxDUZa.lq.mkHuCXco.mK.I.yFFnPgMclo0','$6$YTtpkndBlh/HSQ==','2015-08-15 10:50:46'),(17,'local-thekevinscott','$6Qxn4ZthX/eU','$6$U85tzu0gI41Y3g==','2015-08-15 10:53:21'),(18,'ari','$6$rf1L8iPOwD3tIg==$GcGvVnuNJPJCqcjbrvipAI1wYJoJp6jAetMudTSz9fLTVVpOpkyalysq.C3R5as0mINBxPXzpGC5dauGJZdnn/','$6$rf1L8iPOwD3tIg==','2015-08-15 10:54:07'),(19,'localari','$6qC9nDkIeT0M','$6$Ohr+LOmBs5J7Rg==','2015-08-18 00:25:40');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clues`
--

DROP TABLE IF EXISTS `clues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clues` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `phrase_id` int(11) DEFAULT NULL,
  `clue` varchar(255) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clues`
--

LOCK TABLES `clues` WRITE;
/*!40000 ALTER TABLE `clues` DISABLE KEYS */;
INSERT INTO `clues` VALUES (1,1,'MOVIE','2015-09-04 14:46:41'),(2,1,'CLEVER GIRL','2015-09-04 14:46:56'),(3,1,'DINOSAURS','2015-09-04 14:47:00'),(4,2,'MOVIE','2015-09-04 14:47:05'),(5,2,'CLARICE','2015-09-04 14:47:09'),(6,2,'FAVA BEANS','2015-09-04 14:47:13'),(7,3,'SONG','2015-09-04 14:47:20'),(8,3,'CYNDI LAUPER','2015-09-04 14:47:28'),(9,4,'RESTAURANT','2015-09-04 14:47:35');
/*!40000 ALTER TABLE `clues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_phrases`
--

DROP TABLE IF EXISTS `game_phrases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_phrases` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `game_id` int(11) DEFAULT NULL,
  `phrase_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_phrases`
--

LOCK TABLES `game_phrases` WRITE;
/*!40000 ALTER TABLE `game_phrases` DISABLE KEYS */;
INSERT INTO `game_phrases` VALUES (1,1,1,'2015-08-27 02:19:14'),(2,2,2,'2015-08-27 02:20:16'),(3,55,1,'2015-09-01 03:42:12'),(4,55,2,'2015-09-01 03:45:10'),(5,55,3,'2015-09-01 03:46:50'),(6,55,4,'2015-09-01 03:49:30'),(7,56,1,'2015-09-01 03:51:39'),(8,56,2,'2015-09-01 03:52:21'),(9,56,3,'2015-09-01 04:01:08'),(10,57,1,'2015-09-01 15:24:52'),(11,57,2,'2015-09-01 15:49:41'),(12,57,3,'2015-09-01 16:12:30'),(13,58,1,'2015-09-02 20:11:18'),(14,59,1,'2015-09-05 16:17:52'),(15,60,1,'2015-09-05 16:39:55');
/*!40000 ALTER TABLE `game_phrases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_states`
--

DROP TABLE IF EXISTS `game_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_states` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_states`
--

LOCK TABLES `game_states` WRITE;
/*!40000 ALTER TABLE `game_states` DISABLE KEYS */;
INSERT INTO `game_states` VALUES (1,'pending'),(3,'ready-to-play'),(4,'playing');
/*!40000 ALTER TABLE `game_states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(187) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `comments` text COLLATE utf8mb4_unicode_ci,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'intro','? Hey! I’m Emojibot! I run a game called Emojifun!! - think Pictionary, but with emojis. Want to play? Text YES to start playing. Text FUCK OFF and I won’t bother you anymore.',NULL,'2015-08-15 15:19:42'),(2,'intro_2','? I’m glad you said yes! First off, what should I call you?',NULL,'2015-08-15 23:35:18'),(6,'intro_3','? Nice to meet you, %1$s! Now we need to add some friends to play with. Text INVITE followed by a friend’s 10-digit phone number to invite them to the game.\n(e.g. ‘INVITE 555-555-5555’)',NULL,'2015-08-16 00:10:23'),(7,'invite','? Hi, I’m Emojibot! %1$s has invited you to play Emojifun - think Pictionary, but with emojis. Want to play? Text YES to start playing. Text FUCK OFF and I won’t bother you anymore.',NULL,'2015-08-16 10:17:39'),(8,'intro_4','? %1$s has been invited. Now we just have to wait for slowpoke there to accept.',NULL,'2015-08-16 10:18:06'),(9,'invite_error','%1$s',NULL,'2015-08-16 10:24:50'),(10,'intro_error','Error %1$s',NULL,'2015-08-16 11:47:31'),(11,'already_invited','We already invited %1$s; slow yo\' roll',NULL,'2015-08-16 12:07:32'),(12,'not_yet_onboarded_error','Please CORRECTLY finish the onboarding process: %1$s','This is for when a user has begun onboarding, but has not yet completed (like giving a nickname or responding affirmatively with yes) and tries to invite someone','2015-08-16 14:35:23'),(13,'invite_2','? I’m glad you said yes! First off, what should I call you?',NULL,'2015-08-16 15:54:23'),(14,'accepted-invited','? %1$s has accepted your invitation and joined the game! Game on!',NULL,'2015-08-16 16:00:14'),(15,'wait-to-invite','I understand you\'re excited to invite users to your game; I am too! But hold yo\' ride, first tell me your name.','If we\'re expecting a nickname but they ask to invite someone, tell them to slow their ride','2015-08-17 16:51:57'),(16,'wtf','come again? I didn\'t quite catch that',NULL,'2015-08-17 17:39:42'),(17,'error-1','You entered an invalid number: %1$s','This is for when a number is invalid format','2015-08-17 18:56:46'),(18,'error-2','Slow yo\' roll, the phone %1$s has already been invited.','This is for when a user has already invited another user','2015-08-17 18:57:08'),(19,'error-3','The number %1$s asked us not to contact us again. So we won\'t. If you want to reach out to them personally, you can.','User is on the do not call list.','2015-08-17 18:57:44'),(20,'error-4','You must provide a user with valid identifying info',NULL,'2015-08-17 19:13:39'),(21,'error-5','There was an unknown error registering the phone number',NULL,'2015-08-17 19:13:55'),(22,'error-6','The number %1$s is unverified. Trial accounts cannot send messages to unverified numbers; verify +17243836654 at twilio.com/user/account/phone-numbers/verified, or purchase a Twilio number to send messages to unverified numbers.','This is what Twilio says when a number is unverified','2015-08-17 20:08:51'),(23,'accepted-inviter','Nice to meet you, %1$s! %2$s is going to start us off. When he texts a series of emojis, you have to guess what his phrase is.',NULL,'2015-08-17 20:58:02'),(24,'error-7','You must provide a valid user',NULL,'2015-08-21 12:58:10'),(25,'error-8','You entered a blank number. Try sending something like: INVITE 555-555-5555',NULL,'2015-08-21 18:29:19'),(26,'game-start','? You’ll start us off, %1$s! Your phrase is: %2$s\n\nReply using emojis only. Your goal is to get the other players to guess your phrase. Text HELP if you get stuck, and PASS if you give up. (PASS will cost you 1 point).',NULL,'2015-08-26 14:09:48'),(27,'error-9','That\'s not valid emoji! >:(',NULL,'2015-08-26 15:09:53'),(29,'game-submission-sent','? Cool, I sent your emoji phrase to the group. Let’s see what these losers come up with.',NULL,'2015-08-26 16:02:15'),(30,'says','%1$s says: %2$s',NULL,'2015-08-26 16:03:46'),(31,'guessing-instructions','? Text HELP if you get stuck, and PASS if you give up. (PASS will cost you 1 point).',NULL,'2015-08-26 16:04:32'),(32,'correct-guess','??KAPOW %1$s GOT IT RIGHT!??',NULL,'2015-08-26 17:30:08'),(33,'game-next-round','? Now it’s %1$s’s turn. When he replies, you have to guess what his phrase is.',NULL,'2015-08-27 02:04:03'),(34,'game-next-round-suggestion','? It’s your turn, %1$s. Your phrase is: %2$s\n\nReply using emojis only. Your goal is to get the other players to guess your phrase. Text HELP if you get stuck, and PASS if you give up. (PASS will cost you 1 point).',NULL,'2015-08-27 02:05:16'),(35,'incorrect-guess','? THAT IS THE WRONG GUESS',NULL,'2015-08-30 01:45:22'),(36,'join-game','`EMOJI %1$s has joined the game! Game on!',NULL,'2015-08-30 21:20:04'),(37,'accepted-invited-next-round','? %1$s has accepted your invitation and will join at the next round!',NULL,'2015-08-30 23:00:05'),(38,'join-game-next-round','`EMOJI %1$s will join the game at the next round!',NULL,'2015-08-30 23:00:27'),(39,'accepted-inviter-next-round','Nice to meet you, %1$s! A game is progress but you\'ll join at the next round.',NULL,'2015-08-30 23:02:09'),(40,'error-10','You must provide a phone number',NULL,'2015-09-02 14:36:56'),(41,'error-11','You must provide a message',NULL,'2015-09-02 14:37:09'),(42,'incorrect-out-of-guesses','That is the wrong guess, AND you\'re out of guesses. Sucks to be you... why don\'t you sit and think about what you\'ve done.',NULL,'2015-09-04 02:02:19'),(43,'out-of-guesses','I refuse to dignify that with an answer; YOU\'RE OUT OF GUESSES, %1$s. Don\'t make me come over there...',NULL,'2015-09-04 02:31:03'),(44,'round-over','Welp, that\'s it. You all lose. None of you got it correct.',NULL,'2015-09-04 02:57:58'),(45,'submitter-dont-guess','%1$s, that\'s called *cheating* and you\'ve just ruined the round for everyone. Good job.',NULL,'2015-09-04 13:32:40'),(46,'clue','%1$s asked for a clue! All right then, your clue is: %2$s',NULL,'2015-09-04 18:14:24'),(47,'no-clue-for-submitter','Dude, you\'re not even playing! You can\'t ask for a clue.',NULL,'2015-09-04 19:05:19'),(48,'no-more-clues-allowed','Sorry, you only get %1$s per round.',NULL,'2015-09-04 19:16:49'),(49,'no-more-clues-available','Sorry, I don\'t have any more clues in my records for this round. You\'re on your own!',NULL,'2015-09-04 19:26:36');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phrases`
--

DROP TABLE IF EXISTS `phrases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phrases` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `phrase` varchar(255) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phrases`
--

LOCK TABLES `phrases` WRITE;
/*!40000 ALTER TABLE `phrases` DISABLE KEYS */;
INSERT INTO `phrases` VALUES (1,'JURASSIC PARK',16,'2015-08-27 02:12:55'),(2,'SILENCE OF THE LAMBS',16,'2015-08-27 02:13:01'),(3,'TIME AFTER TIME',16,'2015-08-27 02:29:38'),(4,'BUFFALO WILD WINGS',16,'2015-08-31 00:41:12'),(5,'SAFARI',16,'2015-09-01 03:49:54'),(6,'THE GIVING TREE',16,'2015-09-01 03:49:57'),(7,'MONEY TALKS',16,'2015-09-01 03:50:02'),(11,'Catch Me If You Can',16,'2015-09-10 18:29:35'),(12,'Back to the Future',16,'2015-09-10 18:29:42'),(13,'Willy Wonka and the Chocolate Factory',16,'2015-09-10 18:29:47'),(14,'101 Dalmatians',16,'2015-09-10 18:29:53'),(15,'Beauty and the Beast',16,'2015-09-10 18:29:57'),(16,'Pirates of the Caribbean',16,'2015-09-10 18:30:03'),(17,'The Truman Show',16,'2015-09-10 18:30:07'),(18,'Monty Python and the Holy Grail',16,'2015-09-10 18:30:16'),(19,'Fight Club',16,'2015-09-10 18:30:20'),(20,'A Bugs Life',16,'2015-09-10 18:30:25'),(21,'James Bond',16,'2015-09-10 18:30:28'),(22,'Indiana Jones',16,'2015-09-10 18:30:42'),(23,'The Little Mermaid',16,'2015-09-10 18:30:47'),(24,'The Lord of the Rings',16,'2015-09-10 18:30:52'),(25,'The Godfather',16,'2015-09-10 18:30:58'),(26,'Apollo 13',16,'2015-09-10 18:31:02'),(27,'Sherlock Holmes',16,'2015-09-10 18:31:16'),(28,'Spider Man',16,'2015-09-10 18:31:20'),(29,'Neil Armstrong',16,'2015-09-10 18:31:27'),(30,'Satan',16,'2015-09-10 18:31:34'),(31,'Thomas Edison',16,'2015-09-10 18:31:36'),(32,'Yoda',16,'2015-09-10 18:31:40'),(33,'Popeye',16,'2015-09-10 18:31:44'),(34,'Easter Bunny',16,'2015-09-10 18:31:49');
/*!40000 ALTER TABLE `phrases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platforms`
--

DROP TABLE IF EXISTS `platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `platforms` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `platform` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platforms`
--

LOCK TABLES `platforms` WRITE;
/*!40000 ALTER TABLE `platforms` DISABLE KEYS */;
INSERT INTO `platforms` VALUES (1,'twilio'),(2,'messenger');
/*!40000 ALTER TABLE `platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `round_states`
--

DROP TABLE IF EXISTS `round_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `round_states` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `round_states`
--

LOCK TABLES `round_states` WRITE;
/*!40000 ALTER TABLE `round_states` DISABLE KEYS */;
INSERT INTO `round_states` VALUES (1,'pending'),(2,'waiting-for-submission'),(3,'won'),(4,'playing');
/*!40000 ALTER TABLE `round_states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_attribute_keys`
--

DROP TABLE IF EXISTS `user_attribute_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_attribute_keys` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_attribute_keys`
--

LOCK TABLES `user_attribute_keys` WRITE;
/*!40000 ALTER TABLE `user_attribute_keys` DISABLE KEYS */;
INSERT INTO `user_attribute_keys` VALUES (3,'number'),(4,'messenger-name'),(6,'nickname');
/*!40000 ALTER TABLE `user_attribute_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_entries`
--

DROP TABLE IF EXISTS `user_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_entries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_entries`
--

LOCK TABLES `user_entries` WRITE;
/*!40000 ALTER TABLE `user_entries` DISABLE KEYS */;
INSERT INTO `user_entries` VALUES (1,'text'),(2,'web'),(3,'text_invite'),(4,'IM');
/*!40000 ALTER TABLE `user_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_states`
--

DROP TABLE IF EXISTS `user_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_states` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_states`
--

LOCK TABLES `user_states` WRITE;
/*!40000 ALTER TABLE `user_states` DISABLE KEYS */;
INSERT INTO `user_states` VALUES (5,'waiting-for-confirmation'),(6,'waiting-for-nickname'),(7,'do-not-contact'),(8,'waiting-for-invites'),(9,'waiting'),(10,'ready-for-game'),(11,'waiting-for-round'),(12,'waiting-for-submission'),(13,'guessing'),(14,'playing'),(15,'uncreated'),(16,'submitted'),(17,'bench');
/*!40000 ALTER TABLE `user_states` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-09-10 14:32:47
