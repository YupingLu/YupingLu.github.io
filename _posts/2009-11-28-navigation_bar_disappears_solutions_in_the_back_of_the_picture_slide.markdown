---
author: yupinglu
comments: true
date: 2009-11-28 03:57:00+00:00
layout: post
slug: navigation_bar_disappears_solutions_in_the_back_of_the_picture_slide
title: 导航条消失在图片slide后面的解决办法
wordpress_id: 98
categories:
- 前端
tags:
- JS
---

最近在做网站前台的js部分，以为用jquery应该不会出现什么大的bug。可是还是遇到了，如标题所述的问题。刚开始我不知道怎么描述，所以无法用百度等检索，幸好会点英文，通过“navigation dropdown behind image slide“在Google搜索后，发现大家的首先想到的是z-index的设置问题，以前也没太在意这个属性，于是在百度百科里”http://baike.baidu.com/view/1157742.htm“查看了一下，一下子豁然开朗了。其实这个问题很简单，只要把所要显示的元素加上position属性，同时把它的z-index值调高就可以了！
