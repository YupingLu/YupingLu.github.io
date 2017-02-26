---
author: yupinglu
comments: true
date: 2010-04-29 07:38:00+00:00
layout: post
slug: wrong_permissions_on_configuration_file_should_not_be_world_writable
title: Wrong permissions on configuration file, should not be world writable!
wordpress_id: 177
categories:
- PHP
tags:
- php
---

服务器上的phpmyadmin打开后出现下面的提示：

Wrong permissions on configuration file, should not be world writable!

进入phpMyAdmin页面时显示：Wrong permissions on configuration file, should not be world writable
原因：这个不关XAMPP的事了，是phpmyadmin目录权限设置的问题，如果你把phpmyadmin的所有文件chmod 777就会出现这个提示了
解决方法：只要修改文件属性就可以了，phpmyadmin要运行在755权限下，
终端运行sudo chmod -R 755 /opt/lampp/phpmyadmin

原来是phpmyadmin权限为777，要把所有文件的组和其他用户的写权限全部去掉才行，将权限改为755后一切正常。
