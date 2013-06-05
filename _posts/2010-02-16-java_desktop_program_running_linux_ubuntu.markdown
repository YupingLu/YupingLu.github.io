---
author: yupinglu
comments: true
date: 2010-02-16 16:03:00+00:00
layout: post
slug: java_desktop_program_running_linux_ubuntu
title: 让Java桌面程序在Linux(Ubuntu)中运行
wordpress_id: 112
categories:
- JAVA
- Linux
tags:
- JAVA
- Ubuntu
---

前提：先安装带jre的jdk（下面链接中的文中介绍）

个人建议到安装最新的Linux版jdk

Swing要简单一些

（一）

随便下个.jar的程序，这里我选取的是 YOYOPlayer 下面是下载地址

[http://www.programfan.com/club/showtxt.asp?id=263906](http://www.programfan.com/club/showtxt.asp?id=263906)

（二）

（1）方法一（指定由jre的jexec打开）：

右键点击YOYOPlayer.jar -> Properties -> Open with -> add -> Use custom command

-> Browser -> 选择由指定的 /usr/lib/jvm/jdk-6u14-linux-i586/jre/lib/jexec  打开即可（注：这里是我装的JDK的JRE的

位置）

![](http://farm9.staticflickr.com/8483/8239804317_bd6767da8b_b.jpg)

对于jar上中文乱码的问题，如果是用netbeans开发的话可采用如下方法解决：



	
  1. 在$JAVA_HOME/jre/lib/fonts目录下创建一名为fallback的目录

	
  2. 将一可显示中文的字体放到fallback目录下,可以到Ubuntu字体目录(/usr/share/fonts)去复制一份或者用ln命令做 一个硬链接到该目录（注：软链接无效）

	
  3. 再运行NetBeans(or NetBean)即可


