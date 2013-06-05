---
author: yupinglu
comments: true
date: 2008-09-14 07:24:00+00:00
layout: post
slug: session_and_cookie
title: session and cookie
wordpress_id: 157
categories:
- PHP
tags:
- Session
---

一、sesion 是一个常用的方法，在不同的编程语言中的用法不一样。
下面就把如何在php中用session和大家分享一下。
page1:session.php
<?php
session_start();
session_register("username");
$_SESSION[''username'']=''user'';
?>
这个页面是给session变量附值，与数据库结结合方法也是一样的。
我们可以根据需要设置session的属性。
page2:session1.php
<?php session_start();
echo $_SESSION[''username''];
?>
这个页面主要是输出session的值，但是我们要注意。session_start();
一定要在每次使用之前打开。
好了，这是使用session的一般方法。希望对你有用。

二、Cookies的使用。
例子 1. setcookie() 发送例子 $value = ''something from somewhere'';
setcookie("TestCookie", $value);
setcookie("TestCookie", $value,time()+3600); /* expire in 1 hour */
setcookie("TestCookie", $value,time()+3600, "/~rasmus/", ".utoronto.ca", 1);
注意 cookie 中值的部分在发送的时候会被自动用 urlencode 编码并在接收到的时候被自动解码并把值赋给与自己同名的 cookie 变量。如果不想这样并且在使用 PHP 5 的话，可以用 setrawcookie() 来代替。下面这个简单的例子可以得到刚才所设定的 cookie 的值：
<?php
// 输出单独的 cookie
echo $_COOKIE["TestCookie"];
echo $HTTP_COOKIE_VARS["TestCookie"];
// 另一个调试的方法就是输出所有的 cookie
print_r($_COOKIE);
?>
要删除 cookie 需要确保它的失效期是在过去，才能触发浏览器的删除机制。下面的例子说明了如何删除刚才设置的 cookie：
例子 2. setcookie() 删除例子 // 将过期时间设为一小时前
setcookie("TestCookie", "", time() - 3600);
setcookie("TestCookie", "", time() - 3600, "/~rasmus/", ".utoronto.ca", 1);
也可以通过在 cookie 名称中使用数组符号来设定数组 cookie，可以设定多个 cookie 作为数组单元，在脚本提取 cookie 时所有的值都放在一个数组种： 例子 3. setcookie() 中使用数组的例子 <?php
// 设定 cookie
setcookie("cookie[three]", "cookiethree");
setcookie("cookie[two]", "cookietwo");
setcookie("cookie[one]", "cookieone");
// 刷新页面后，显示出来
if (isset($_COOKIE[''cookie''])) {
