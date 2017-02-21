---
author: yupinglu
comments: true
date: 2010-12-13 12:27:00+00:00
layout: post
slug: ubuntu_install_apache__php__mysql_text_server
title: UBUNTU下安装 APACHE+PHP+MYSQL文本服务器！
wordpress_id: 186
categories:
- Linux
- PHP
tags:
- Ubuntu
---

ubuntu实在是太牛了，很简单的方法就安装完毕web服务器，只需要按顺序执行以下命令即可：

Once again, here’s my updated simple installation of Apache, PHP and MySQL in Ubuntu 8.04 LTS (Hardy Heron) Server.

Install SSH Client and Server (for my remote access)
sudo apt-get install ssh

Install Database Server
sudo apt-get install mysql-server-5.0

Install Apache HTTP Server
sudo apt-get install apache2

Install PHP5 and Apache PHP5 module
sudo apt-get install php5 libapache2-mod-php5

Restart Apache
sudo /etc/init.d/apache2 restart

Optionally, install phpMyAdmin
sudo apt-get install phpmyadmin

Enjoy!

怎么样？简单吧！除去下载的时间，要不了一分钟就可以完成配置，在 Ubuntu 上还需要 APM 包吗？还是记住以下几个命令和位置就行了。

sudo /etc/init.d/apache2 restart （重启 apache）

sudo gedit /etc/php5/apache2/php.ini （配置 php.ini）

sudo gedit /etc/apache2/apache2.conf （配置 apache2.conf）

/var/www/（主目录位置）
