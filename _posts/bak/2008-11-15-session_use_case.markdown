---
author: yupinglu
comments: true
date: 2008-11-15 13:38:00+00:00
layout: post
slug: session_use_case
title: session使用实例
wordpress_id: 34
categories:
- PHP
tags:
- php
- Session
---

<?php

/**

* 效验session的合法性

* */

function sessionVerify()

{

if(!isset($_SESSION['user_agent']))

{

$_SESSION['user_agent'] = MD5($_SERVER['REMOTE_ADDR'] .$_SERVE['HTTP_USER_AGENT']);

}

/* 如果用户session ID是伪造,则重新分配session ID */

elseif ($_SESSION['user_agent']!=MD5($_SERVER['REMOTE_ADDR'] .$_SERVER'HTTP_USER_AGENT']))

{

session_regenerate_id();

}

}

/**

* 销毁session

* 三步完美实现,不可漏

* */

function sessionDestroy()

{

session_destroy();

setcookie(session_name(),'',time()-3600);

$_SESSION = array();

}

?>

注明：
session 出现头信息已经发出的原因与cookie一样。在php5中，所有php session的注册表配置选项都是编程时可配置的，一般情况下，我们是不用修改其配置的。要了解php的session注册表配置选项，请参考手册的Session会话处理函数处。
