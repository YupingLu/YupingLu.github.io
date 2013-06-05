---
author: yupinglu
comments: true
date: 2011-04-27 01:37:19+00:00
layout: post
slug: yii-with-nginx-on-dotcloud
title: Yii with Nginx on dotcloud
wordpress_id: 100
categories:
- PHP
tags:
- dotcloud
- Nginx
- php
- Yii
---

location ~ .php$ {
fastcgi_pass  127.0.0.1:9000;
fastcgi_index index.php;
include fastcgi_params;
fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
fastcgi_param PATH_INFO $fastcgi_script_name;
}
location /blog {
try_files $uri $uri/ /index.php?$args; #此处应该是$args 不应该是 $request_uri 看到有一文章这里用的是 $request_uri
}

If you want to hide **'index.php'**, pay attention to this:
'urlManager'=>array(
'urlFormat' => 'path',
**'showScriptName' => false**
),

If you meet a database connection error, set the connectionString like this in your config/main.php:

'connectionString' => 'mysql:host=localhost;dbname=a;port=3306',
