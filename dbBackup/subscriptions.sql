-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2021 at 08:06 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mhg2`
--

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `subcrPK` int(11) NOT NULL,
  `cmpnyFK` int(11) NOT NULL,
  `dateStart` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateEnd` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subcrDetails` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`subcrPK`, `cmpnyFK`, `dateStart`, `dateEnd`, `subcrDetails`) VALUES
(2, 2, '1151997T', 'Suruhanjaya Syarikat Malaysia', '{\"address\":\"5th Floor Block S45, Universiti Teknologi Malaysia 81300 Johor Bahru, Johor\",\r\n\"phone\":\"+6019 776 5075\",\r\n\"email\":\"admin@holisticslab.my\",\r\n\"statussyarikat\":\"Bumiputra\",\r\n\"jenisindustri\":\"Industri Sederhana\",\r\n\"jenisperniagaan\":\" \",\r\n\"hasiljualan\":\" \"}');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
