---
author: yupinglu
comments: true
date: 2013-01-04 15:42:35+00:00
layout: post
slug: ubuntu-12-04-the-system-network-services-are-not-compatible-with-this-version
title: 'Ubuntu 12.04: The system network services are not compatible with this version'
wordpress_id: 449
categories:
- Linux
tags:
- Ubuntu
---

Totally solution:

Open your terminal, and type " sudo gedit /etc/network/interfaces", and remove those lines that come **after** "iface lo inet loopback".



Possible reason for this problem(Not sure):

Adsl(PPPOE configuration):

1. sudo pppoeconf

2. sudo pon dsl-provider

3. sudo poff

I didn't update my Network Manager recently. I restarted my computer a few hours after configuring pppoe. However, it run very slowly, and I was unable to connect to the internet. :(
