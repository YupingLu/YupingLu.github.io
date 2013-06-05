---
author: yupinglu
comments: true
date: 2008-11-15 13:23:00+00:00
layout: post
slug: delete_session
title: 删除session
wordpress_id: 32
categories:
- PHP
tags:
- php
- Session
---

要三步实现。

<?php

session_destroy(); // 第一步: 删除服务器端session文件,这使用

setcookie(session_name(),'',time()-3600); // 第二步: 删除实际的session:

$_SESSION = array(); // 第三步: 删除$_SESSION全局变量数组

?>
