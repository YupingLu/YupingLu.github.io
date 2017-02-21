---
author: yupinglu
comments: true
date: 2011-02-02 15:11:20+00:00
layout: post
slug: installing-pear-and-phpunit-on-windows-7
title: Installing PEAR and PHPUnit on Windows 7
wordpress_id: 39
categories:
- PHP
tags:
- Pear
- PHPUnit
---

System: Windows 7; PHP Version: 5.3.5; Mysql Version: 5.5.8; Apache Version: 2.2.17

**Installing pear**

After you have downloaded and installed PHP, you have to manually execute the batch file located in e.g. c:phpgo-pear.bat. The setup will ask you some questions and afterwards the PEAR Package Manager will be installed in the path, which you have specified during installation.

Finally you have to add that installation path to your PATH environment. Either do this manually (Start > Control Panel > System > Environment) or run (double-click) the newly generated PEAR_ENV.reg that's now found in the PHP source directory.

After that you can access the PEAR Package Manager by running the command pear in a Windows Command Prompt.

However I met a error while installing pear:


> phar "C:Program Files (x86)phpPEARgo-pear.phar" does not have a signature
PHP Warning: require_once(phar://go-pear.phar/index.php): failed to open stream: phar error: invalid url or non-existent phar "phar://go-pear.phar/index.php" in C:Program Files (x86)phpPEARgo-pear.phar on line 1236.


Instead of using the outdated http://pear.php.net/go-pear , use http://pear.php.net/go-pear.phar. Download and update local go-pear.phar file and everything runs well.

**Installing PHPUnit**
After some wrong trials, I follow the official guidance on [http://www.phpunit.de/manual/3.5/en/phpunit-book.html#installation](http://www.phpunit.de/manual/3.5/en/phpunit-book.html#installation).

**pear channel-discover pear.phpunit.de**
**pear channel-discover components.ez.no**
**pear channel-discover pear.symfony-project.com**
This has to be done only once. Now the PEAR Installer can be used to install packages from the PHPUnit channel:

**pear install phpunit/PHPUnit**

After the installation you can find the PHPUnit source files inside your local PEAR directory.
