---
author: yupinglu
comments: true
date: 2011-01-02 07:39:00+00:00
layout: post
slug: define_vs_const_in_php
title: define vs const in PHP
wordpress_id: 192
categories:
- PHP
tags:
- php
---

Pretty straightforward question: In PHP, do you prefer to do (and why):

define('FOO',1);

OR

const FOO =1;

Also, the code is NOT in a class.

Answer: const can't be used in the global scope. You can only use this from within a class. This should be used when you want to set some kind of constant option or setting that pertains to that class. Or maybe you want to create some kind of enum.

define can be used for the same purpose, but it can only be used in the global scope. It should only be used for global settings that affect the entire application.

An example of good const usage is to get rid of magic numbers. Take a look at [PDO's constants](http://www.php.net/manual/en/pdo.constants.php). When you need to specify a fetch type, you would type PDO::FETCH_ASSOC, for example. If consts were not used, you'd end up typing something like 35 (or whatever FETCH_ASSOC is defined as). This makes no sense to the reader.

An example of good define usage is maybe specifying your application's root path or a library's version number.
