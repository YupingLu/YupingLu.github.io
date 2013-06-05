---
author: yupinglu
comments: true
date: 2009-04-28 05:43:00+00:00
layout: post
slug: reserved_c___memset_memcpy_and_strcpy_fundamental_difference
title: 【转载】C++:memset ,memcpy 和strcpy 的根本区别？
wordpress_id: 75
categories:
- C++
tags:
- C++
---

#include "memory.h"

memset用来对一段内存空间全部设置为某个字符，一般用在对定义的字符串进行初始化为‘ ’或‘�’；例：char a[100]；memset（a， '�'， sizeof（a））；memcpy用来做内存拷贝，你可以拿它拷贝任何数据类型的对象，可以指定拷贝的数据长度；例：char a[100]，b[50]； memcpy（b， a， sizeof（b））；注意如用sizeof（a），会造成b的内存地址溢出。

strcpy就只能拷贝字符串了，它遇到'�'就结束拷贝；例：char a[100]，b[50]；strcpy（a，b）；如用strcpy（b，a），要注意a中的字符串长度（第一个‘�’之前）是否超过50位，如超过，则会造成b的内存地址溢出。

strcpy原型：extern char *strcpy（char *dest，char *src）；用法：#include <string.h>功能：把src所指由NULL结束的字符串复制到dest所指的数组中。

说明：src和dest所指内存区域不可以重叠且dest必须有足够的空间来容纳src的字符串。

返回指向dest的指针。

memcpy原型：extern void *memcpy（void *dest， void *src， unsigned int count）；用法：#include <string.h>功能：由src所指内存区域复制count个字节到dest所指内存区域。

说明：src和dest所指内存区域不能重叠，函数返回指向dest的指针。

memset原型：extern void *memset（void *buffer， int c， int count）；用法：#include <string.h>功能：把buffer所指内存区域的前count个字节设置成字符c.说明：返回指向buffer的指针。

ASSERT（）是干什么用的

ASSERT（）是一个调试程序时经常使用的宏，在程序运行时它计算括号内的表达式，如果表达式为FALSE （0）， 程序将报告错误，并终止执行。如果表达式不为0，则继续执行后面的语句。这个宏通常原来判断程序中是否出现了明显非法的数据，如果出现了终止程序以免导致严重后果，同时也便于查找错误。例如，变量n在程序中不应该为0，如果为0可能导致错误，你可以这样写程序：……

ASSERT（ n ！= 0）；k = 10/ n；……

ASSERT只有在Debug版本中才有效，如果编译为Release版本则被忽略。

assert（）的功能类似，它是ANSI C标准中规定的函数，它与ASSERT的一个重要区别是可以用在Release版本中。

system（“pause”）；系统的暂停程序，按任意键继续，屏幕会打印，“按任意键继续……” 省去了使用getchar（）；
