---
author: yupinglu
comments: true
date: 2008-11-15 13:27:00+00:00
layout: post
slug: session_security_issues
title: session安全问题
wordpress_id: 33
categories:
- PHP
tags:
- php
- Session
---

攻击者通过投入很大的精力尝试获得现有用户的有效session ID，有了session id，他们就有可能能够在系统中拥有与此用户相同的能力。
因此，我们主要解决的思路是效验session ID的有效性。

<?php
if(!isset($_SESSION['user_agent']))

{

$_SESSION['user_agent'] = $_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT'];

}/* 如果用户session ID是伪造 */

elseif ($_SESSION['user_agent'] != $_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']) {

session_regenerate_id();

}

?>
