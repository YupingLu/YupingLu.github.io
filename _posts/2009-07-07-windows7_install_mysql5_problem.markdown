---
author: yupinglu
comments: true
date: 2009-07-07 14:31:00+00:00
layout: post
slug: windows7_install_mysql5_problem
title: windows7下安装mysql5的问题
wordpress_id: 85
categories:
- PHP
tags:
- php
- Win7
---

1.去官方下载MYSQL 5.0，下载地址：http://http://dev.mysql.com/downloads/ 下载5.0版本的。

2.修改防火墙的设置，在允许例外里添加新的端口，名字为mysql，开放的端口为TCP 3306。

3.安装MYSQL 5.0，可以自己修改安装路径和组件等。

4.安装完成后，Mysql server instance config wizard应该是启动不了的，下面的工作就是为了解决这个问题的，因为这是配置Mysql的唯一途径。

5.到[http://angusj.com/resourcehacker/](http://angusj.com/resourcehacker/)下载简体中文版（如果你看的懂英文，那就直接下原版的）。

6.解压rh_chinese_big5.zip ，执行 ResHacker.exe

7.打开MySQLInstanceConfig.exe (在安裝 MySQL 的bin 目录中)

8.左侧展开「24」→「1」→「1033」

9. 右侧找到 这行

10.将 level="asAdministrator" 改成 level="requireAdministrator"

11. 重新编译

12.保存后关闭 (如果不能保存，另存在 bin 目录外，然后覆盖回來也可以)

13.这时MySQLInstanceConfig.exe，就可以正常的配置了。
