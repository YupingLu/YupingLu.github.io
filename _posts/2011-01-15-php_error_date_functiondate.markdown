---
author: yupinglu
comments: true
date: 2011-01-15 16:18:00+00:00
layout: post
slug: php_error_date_functiondate
title: 'php error: date (function.date)'
wordpress_id: 196
categories:
- PHP
tags:
- php
---

今天用yiic的时候出现如下错：

![](http://farm9.staticflickr.com/8210/8240821852_41f5af466f_c.jpg)

解决办法：

在php.ini进行如下修改latitude and longitude of "Asia/Shanghai" are
date.timezone = "Asia/Shanghai"
date.default_latitude = 31.5167
date.default_longitude = 121.4500

如果要修改为其他的TimeZone，参照此网址[http://www.php.net/manual/en/timezones.php](http://www.php.net/manual/en/timezones.php)

Prior to PHP 5.3.0, the default timezone used by all date/time functions if the TZ environment variable isn't set; this is longer the case as of 5.3.0. The precedence order is described in the [date_default_timezone_get()](http://www.php.net/manual/en/function.date-default-timezone-get.php) page. See [List of Supported Timezones](http://www.php.net/manual/en/timezones.php) for a list of supported timezones.

So, in fact you can just set a new value for date.timezone, then everything will be OK in php!
