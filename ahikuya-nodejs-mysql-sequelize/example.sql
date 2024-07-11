--
-- Table structure for table `students`
--
 
-- 기존 students 테이블 삭제
 DROP TABLE `students`;
 
-- students 테이블 생성 
CREATE TABLE `students` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `age` INT(20) DEFAULT NULL,
  `address` VARCHAR(200) DEFAULT NULL,
  `profile` TEXT(200) DEFAULT NULL,
  `school_id` INT(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
 
--
-- Dumping data for table `students`
--

INSERT INTO `students` VALUES (1,'정약용',40,'인천 서구 청라', '개발자입니다.', 1);
INSERT INTO `students` VALUES (2,'강감찬',60,'서울 마포구 상암동','IT 기획자입니다.', 2);
INSERT INTO `students` VALUES (3,'이순신',55,'전남 강진군 강진읍', '디자이너입니다.', 3);
INSERT INTO `students` VALUES (4,'이순',60,'전남 강진군 강진읍2', '개발자입니다.', 5);

SELECT * FROM students;
 
--
-- Table structure for table `school`
--
 
DROP TABLE school;

CREATE TABLE `school` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `description` text,
  `address` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
 
--
-- Dumping data for table `school`
--
 
INSERT INTO `school` VALUES (1,'연세대학교','독수리대학교입니다.','서울 중구');
INSERT INTO `school` VALUES (2,'고려대학교','호랑이대학교입니다.','서울 서대문구');
INSERT INTO `school` VALUES (3,'서울대학교','국립대학교입니다.','서울 관악구');