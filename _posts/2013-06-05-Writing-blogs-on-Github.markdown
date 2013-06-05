---
layout: post
title: Writing blogs on Github
categories: [it]
tags: [github, Jekyll, Markdown]
---

我喜欢简约的方式，一直在寻找合适的写博客平台。很久就听说Jekyll了，一直未能尝试。乘着这段时间空前，花了一天多时间将博客移到Github上。我要喜欢上Markdown了，很简洁，很方便，可以让作者专注写作。

在Github搭建博客有几个步骤：

1. 参考官网[help](https://help.github.com/categories/20/articles)了解Github Pages, 并部署自己的Pages.

2. 将原先的博客迁移到Github上。我原先用的是WP，可以参考这个网址(http://johnnycode.com/2012/07/10/how-to-migrate-from-wordpress-to-jekyll-running-on-github/).

3. 在通过Exitwp转换文件的时，可能会报错：UnicodeEncodeError. 修改 exitwp.py，将120行代码
	print result
	
	修改为：
	print result.encode('utf-8', 'ignore')

4. 我的博客使用的是[Yihui Xie](http://yihui.name/)的模板，再次表示感谢.

5. 最后可以添加个人域名，比如[我的域名](http://allal.com).

You see it's easy :}