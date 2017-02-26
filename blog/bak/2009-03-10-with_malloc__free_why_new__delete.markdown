---
author: yupinglu
comments: true
date: 2009-03-10 11:22:00+00:00
layout: post
slug: with_malloc__free_why_new__delete
title: 有了malloc/free 为什么还要new/delete
wordpress_id: 66
categories:
- C++
tags:
- C++
---

malloc 与free 是C++/C 语言的标准库函数，new/delete 是C++的运算符。它们都可用于申请动态内存和释放内存。

对于非内部数据类型的对象而言，光用maloc/free 无法满足动态对象的要求。对象在创建的同时要自动执行构造函数， 对象在消亡之前要自动执行析构函数。由于malloc/free 是库函数而不是运算符，不在编译器控制权限之内，不能够把执行构造函数和析构函数的任务强加于malloc/free。

因此C++语言需要一个能完成动态内存分配和初始化工作的运算符new，以及一个能完成清理与释放内存工作的运算符delete。注意new/delete 不是库函数。

所以我们不要企图用malloc/free 来完成动态对象的内存管理，应该用new/delete。

由于内部数据类型的“ 对象”没有构造与析构的过程，对它们而言malloc/free 和new/delete 是等价的。

既然new/delete 的功能完全覆盖了malloc/free，为什么C++不把malloc/free 淘汰出局呢？这是因为C++程序经常要调用C 函数，而C 程序只能用malloc/free 管理动态内存。

如果用free 释放“new 创建的动态对象”，那么该对象因无法执行析构函数而可能导致程序出错。如果用delete 释放“malloc 申请的动态内存”，理论上讲程序不会出错，但是该程序的可读性很差。所以new/delete 必须配对使用，malloc/free 也一样。
