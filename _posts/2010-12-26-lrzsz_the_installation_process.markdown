---
author: yupinglu
comments: true
date: 2010-12-26 08:01:00+00:00
layout: post
slug: lrzsz_the_installation_process
title: lrzsz的安装过程
wordpress_id: 191
categories:
- Linux
tags:
- Linux
- lrzsz
---

1、下载 lrzsz-1.12.20.tar.gz
[http://www.filewatcher.com/m/lrzsz-0.12.20.tar.gz.280938.0.0.html](http://www.filewatcher.com/m/lrzsz-0.12.20.tar.gz.280938.0.0.html)
2、解压文件:tar zxvf lrzsz-1.12.20.tar.gz
3、进入目录 :cd lrzsz-1.12.20
4、./configure --prefix=/usr/local/lrzsz
5、make&make install
6、建立软链接
#cd /usr/bin
#ln -s /usr/local/lrzsz/bin/lrz rz
#ln -s /usr/local/lrzsz/bin/lsz sz
7、测试: 运行 rz 弹出SecureCRT上传窗口
