---
author: yupinglu
comments: true
date: 2013-06-02 07:58:26+00:00
layout: post
slug: set-your-custom-naked-domain-on-openshift
title: Set your custom naked domain on Openshift
wordpress_id: 469
categories:
- IT
tags:
- openshift
---

First, here is a guide for you to start your custom domain names on your openshift application.

[https://www.openshift.com/blogs/custom-url-names-for-your-paas-applications-host-forwarding-and-cnames-the-openshift-way](https://www.openshift.com/blogs/custom-url-names-for-your-paas-applications-host-forwarding-and-cnames-the-openshift-way).

If you want your visitors be able to visit your custom domain through a.com instead of www.a.com. One way is to point your www cname to blabla-username.rhcloud.com at your domain dns controller and forward your A record to **wwwizer.com** 's ip ( **174.129.25.170** ) it's done!
