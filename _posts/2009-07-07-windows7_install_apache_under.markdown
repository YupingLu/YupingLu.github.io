---
author: yupinglu
comments: true
date: 2009-07-07 14:05:00+00:00
layout: post
slug: windows7_install_apache_under
title: windows7下安装Apache的问题
wordpress_id: 84
categories:
- PHP
tags:
- php
- Win7
---

首先，是80端口被占用的问题，修改一下迅雷的80端口一般就可以了，要是还是有问题，可查看一下其他进程是否占用80端口，停止进程或修改一下端口就可以了。

但是，仍然无法安装Apache2服务。解决的办法是：

开始后, 同意协议,一路next.到了填写Server Information这一步,在Network、server name中填写localhost，当然填写其它的也没什么影响；底下的选项就选择默认的第一个，next。安装类型，选择custom,安装功能默认;安装地址，我选择的是D:apache2,next,确认后，Install开始安装。在vista下，安装结束时，会出现错误，主要是无法注册服务。忽略错误，完成安装。

开始菜单-所有程序--附件--命令提示符，或在开始中搜索cmd，右击以管理员身份运行，到apache安装目录的bin子目录下，执行httpd -k install 命令，把apache安装为windows服务，然后执行httpd -k start 启动apache。

PS：

1、执行中,可能会出现"(os   10048)通常每个套接字地址只允许使用一次。could   not   bind   to   address   0.0.0.0:80   ,   not   listening   sockets   available,shutting   down   unable   to   open   logs,Note   the   errors   or   message   above......" 原因是apache使用的80端口被占用致启动失败,解决方法:修改httpd.conf文件中Listen 80,把默认的80端口改为其它值,如8080,然后通过命令来启动apache即可。）

2、启动时，可能会出现“windows找不到指定路径，无法启动服务”问题，原因：可能是安装过apache后卸载，服务未被删除．解决方法：从注册表中删除此项服务（开始--运行--cmd.exe--sc delete 服务名称），重新安装apache．
