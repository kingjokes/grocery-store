-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2022 at 04:01 PM
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
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `discount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image`, `discount`) VALUES
(1, 'Green Lime', 135.78, 'Limes are sour, round, and bright green citrus fruits.\r\n\r\nThey’re nutritional powerhouses — high in vitamin C, antioxidants, and other nutrients.\r\n\r\nThere are many species of limes, including the Key lime (Citrus aurantifolia), Persian lime (Citrus latifolia), desert lime (Citrus glauca), and makrut lime (Citrus hystrix).\r\n\r\nEach of these species has unique characteristics. For instance, the Key lime is smaller, more acidic, and more aromatic than the more common Persian type.\r\n\r\nIn the United States, Persian limes are the most commonly available type.\r\n\r\nBecause limes are loaded with nutrients, they may help boost immunity, reduce heart disease risk factors, prevent kidney stones, aid iron absorption, and promote healthy skin.\r\n\r\nThis article provides an overview of the nutritional benefits of limes, as well as their uses and potential side effects.', 'lime.png', 10),
(2, 'Red Pepper', 100.1, 'Red pepper—also called bell pepper, red bell pepper, capsicum, or sweet pepper—has a mildly sweet yet earthy taste. These peppers are fully mature versions of the more bitter green bell peppers. \r\n\r\nThe red pepper is a variety of Capsicum annuum, a family that also includes cultivars like jalapeño, cayenne pepper, chili pepper, and a few other hot peppers. While you\'ll see other types of peppers that are red in color, only the red bell pepper is colloquially known as \"red pepper.\" \r\n\r\nCapsicum annuum is native to Central and South America, and it likely began its domestication in central Mexico about 7,500 years ago. Over time, several varieties took shape and continue today as cultivars. Bell peppers were one of those varieties and were actively cultivated before Spanish exploration in the 1400s.\r\n\r\nRed peppers, now grown around the world, remain popular for the way their sweet flavors liven up many dishes.', 'MiniPeppers.png', 2),
(3, 'Fresh Strawberry', 98.7, 'The strawberry (Fragaria ananassa) originated in Europe in the 18th century.\r\n\r\nIt is a hybrid of two wild strawberry species from North America and Chile.\r\n\r\nStrawberries are bright red, juicy, and sweet.\r\n\r\nThey’re an excellent source of vitamin C and manganese and also contain decent amounts of folate (vitamin B9) and potassium.\r\n\r\nStrawberries are very rich in antioxidants and plant compounds, which may have benefits for heart health and blood sugar control (1Trusted Source, 2Trusted Source).\r\n\r\nUsually consumed raw and fresh, these berries can also be used in a variety of jams, jellies, and desserts.\r\n\r\nThis article tells you everything you need to know about strawberries.\r\n\r\n', 'strawberry.png', 3),
(4, 'Red Apple', 134.85, 'I\'ve been trying to eat healthier lately and I have to be honest: When it comes to apples, I just buy whatever\'s on sale. But the truth is, different apples taste differently and are good for different uses. What\'s more, there’s some unique history to the names of different kinds of apples. Herein, an apple primer:\r\nApples contain healthful nutrients regardless of their color. However, red apples have more anthocyanin, which may provide heart-healthy and cholesterol-lowering benefits. For instance, Red Delicious apples contain nearly five times as much anthocyanins as Granny Smiths', 'apple.png', 6),
(5, 'Orange', 99, 'orange, any of several species of small trees or shrubs of the genus Citrus of the family Rutaceae and their nearly round fruits, which have leathery and oily rinds and edible, juicy inner flesh. A number of species and varieties of orange are economically important, namely the China orange, also called the sweet, or common, orange (Citrus ×sinensis); the mandarin orange (C. reticulata), some varieties of which are called tangerines; and the sour, or Seville, orange (C. ×aurantium), which is less extensively grown. Common varieties of the sweet orange include the Jaffa, from Israel, the seedless navel, and the Maltese, or blood, orange.', 'Orange.png', 4),
(6, 'Fresh Lemon', 120, 'The lemon (Citrus limon) is a species of small evergreen tree in the flowering plant family Rutaceae, native to Asia, primarily Northeast India (Assam), Northern Myanmar or China.[2]\r\n\r\nThe tree\'s ellipsoidal yellow fruit is used for culinary and non-culinary purposes throughout the world, primarily for its juice, which has both culinary and cleaning uses.[2] The pulp and rind are also used in cooking and baking. The juice of the lemon is about 5% to 6% citric acid, with a pH of around 2.2, giving it a sour taste. The distinctive sour taste of lemon juice makes it a key ingredient in drinks and foods such as lemonade and lemon meringue pie.', 'Lemon.png', 9);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `status`) VALUES
(1, 'Nasim Finley', 'roqik@mailinator.com', '$2b$10$Y1EELxM4mfg2GOvB0aNXKun9nQS4hU/WGleOApBYx8.AKiY/G6.C6', 1),
(3, 'Sylvester Espinoza', 'ddd@mailinator.com', '$2b$10$nMQHmMp9gTGum4fpYXLLe.ycScp4ZPQIHSH.OkLF372dWdI2WRSP.', 1),
(8, 'Paul Jokotagba', 'pauljokotagba@gmail.com', '$2b$10$DBY9vfqnZxLJu44nZtbh9uWMUT7V5fb1LMnrqDxNnLv9mqw4UWvMK', 1),
(9, 'Rama Sandoval', 'zapu@mailinator.com', '$2b$10$SHPWenEHFDQgcoeldxnLUOj9bHO5AqoJp6Hxz5uJGWEvTDQ6j4gQu', 1),
(10, 'Ade ola', 'baratoinc112@gmail.com', '$2b$10$fjal8morBYCTMHSfK0CuJOE4tHLWcxvAvIdLzYXS/iizQBjNk9I/.', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
