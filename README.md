# Remember

## Prerequisites
You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)

## Installation

* `git clone git@github.com:MartinGassner/remember.git` 
* `cd remember
* `npm install`
* `bower install`

## Running



## Create SQL table

```SQL
CREATE TABLE `memories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `text` text,
  `img` binary(1) DEFAULT NULL,
  `sender_id` int(11) unsigned NOT NULL,
  `consumer_id` int(11) unsigned NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `sender` (`sender_id`),
  KEY `consumer` (`consumer_id`),
  CONSTRAINT `consumer` FOREIGN KEY (`consumer_id`) REFERENCES `users` (`id`),
  CONSTRAINT `sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

  
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

```