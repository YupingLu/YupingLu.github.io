---
author: yupinglu
comments: true
date: 2011-01-03 05:19:00+00:00
layout: post
slug: turn_how_to_solve_the_problem_of_google_talk_can_not_connect_windows7_under_ipv6_caused
title: 如何解决windows7下使用IPv6而导致的Google Talk无法连接的问题
wordpress_id: 193
categories:
- IT
tags:
- IPv6
---

修改windows7系统盘中的hosts文件，通常在

C:WindowsSystem32driversetc

之下，该文件中可以设置很多关于各大网站的IPv6地址，网上到处都可以下载。

但是设置之后，可能便会导致Google Talk在连接的时候，出现“无法连接服务器”的问题提示。通常的解决方案是修改防火墙配置，使得Google Talk成为置信程序，从而不被拦截，但是这往往还是不能解决问题，即使修改了服务器代理，仍然不能解决问题。

这里提供的解决方案是，用文本编辑器打开hosts文件(即你已经下载下来的IPv6的hosts文件)，用“#”注释掉如下的内容：

2404:6800:8005::68 www.google.com #主页

#GTalk 聊天

2404:6800:8005::62 talk.google.com

2404:6800:8005::62 talkx.l.google.com

2404:6800:8005::62 default.talk.google.com

2404:6800:8005::62 talkgadget.google.com

2404:6800:8005::62 rtmp0.google.com

2404:6800:8005::62 users.talk.google.com

特别是主页2404:6800:8005::68 www.google.com，可能存在多出，记得全部都注视掉，这样便可解决问题。

原因也很简单，Google Talk默认的是寻找IPv4的服务器地址，而设置的IPv6地址，可能会使其找不到服务器的所在。
