---
author: yupinglu
comments: true
date: 2010-12-13 12:25:00+00:00
layout: post
slug: the_virtualbox_ubuntu_resolution_problem
title: VirtualBox 中 Ubuntu 分辨率的问题
wordpress_id: 185
categories:
- Linux
tags:
- Ubuntu
---

1.启动虚拟机

2.在虚拟机窗口选择“设备”->“分配光驱”->“虚拟光驱”->VBoxGuestAdditions.iso->“选择”

3.进入ubuntu系统->点击顶端panel上的"place"->选择光盘图标，名字应该为“VBOXADDITIONS...”

4.在打开的窗口，双击运行"autorun.sh"

5.弹出提示时，选择在终端运行

6.等安装执行完成，在终端敲回车，然后重启ubuntu

附： Ubuntu命令大全地址 [http://wiki.ubuntu.org.cn/Unix%E5%91%BD%E4%BB%A4%E5%A4%A7%E5%85%A8](http://wiki.ubuntu.org.cn/Unix%E5%91%BD%E4%BB%A4%E5%A4%A7%E5%85%A8)
