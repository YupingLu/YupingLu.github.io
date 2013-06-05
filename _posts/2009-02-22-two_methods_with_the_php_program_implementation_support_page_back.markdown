---
author: yupinglu
comments: true
date: 2009-02-22 12:21:00+00:00
layout: post
slug: two_methods_with_the_php_program_implementation_support_page_back
title: 用PHP程序实现支持页面后退的两种方法
wordpress_id: 166
categories:
- PHP
tags:
- php
---

在开发过程中，往往因为表单出错而返回页面的时候填写的信息都不见了，为了支持页面
回跳，可以通过两种方法实现。

第一，使用Header方法设置消息头Cache-control
引用:
header('Cache-control: private, must-revalidate'); //支持页面回跳
第二，使用session_cache_limiter方法
引用:
//注意要写在session_start方法之前
session_cache_limiter('private, must-revalidate');
补充：
Cache-Control消息头域说明
Cache-Control指定请求和响应遵循的缓存机制。在请求消息或响应消息中设置Cache-Control
并不会修改另一个消息处理过程中的缓存处理过程。请求时的缓存指令包括no-cache、no-store
、max-age、max-stale、min-fresh、only-if-cached，响应消息中的指令包括public、private
、no-cache、no-store、no-transform、must-revalidate、proxy-revalidate、max-age。各个
消息中的指令含义如下：

Public指示响应可被任何缓存区缓存。

Private指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅
仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效。

no-cache指示请求或响应消息不能缓存

no-store用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不
使用缓存。

max-age指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应。

min-fresh指示客户机可以接收响应时间小于当前时间加上指定时间的响应。

max-stale指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那
么客户机可以接收超出超时期指定值之内的响应消息。

关于表单刷新

问：为什么我在点击浏览器的后退按钮后，所有字段的信息都被清空了？

答：这是由于你在你的表单提交页面中使用了 session_start 函数。该函数会强制当前页面不被
缓存。解决办法为，在你的 Session_start 函数后加入 header("Cache-control: private");
注意在本行之前你的PHP程序不能有任何输出。

补充：还有基于session的解决方法，在session_start前加上
引用:
session_cache_limiter('nocache');// 清空表单
session_cache_limiter('private'); //不清空表单，只在session生效期间
session_cache_limiter('public'); //不清空表单，如同没使用session一般

可以在session_start();前加上 session_cache_limiter("private,max-age=10800");
