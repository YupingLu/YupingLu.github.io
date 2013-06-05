---
author: yupinglu
comments: true
date: 2009-11-23 13:57:00+00:00
layout: post
slug: the_php_output_question_mark_solutions
title: php输出问号的解决方案
wordpress_id: 96
categories:
- PHP
tags:
- php
---

很久没用php写后台了，今天写了个简单的语句竟然输出全是问号，一时摸不着头脑。
经过一定时间的调试，原来是编码的问题，因为我输出数字是正常的，于是在语句头加了句"mysql_query("set names utf8");"就一切都搞定了，哎，以前都记得了，很久没弄php了，这么点细节都给忘了！还有一个方法，就是在文本开头加上header('Content-Type: text/html; charset=utf-8');，就可以了。
