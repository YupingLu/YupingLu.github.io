---
author: yupinglu
comments: true
date: 2008-10-08 13:28:00+00:00
layout: post
slug: linked_list
title: 链表
wordpress_id: 19
categories:
- C++
tags:
- C++
---

单链表的逆置的实现:**(1)算法**

struct link
{
int data;
struct link *next;
};

link reverse(link x)
{
if( NULL==x )
return NULL;

link t=NULL;
link r=NULL, y=x;   //(0)
while(y!=NULL)
{
t = y->next;    //(1)
y->next = r;    //(2)
r = y;          //(3)
y = t;          //(4)
}

return r;      //返回逆置后的链表
}
