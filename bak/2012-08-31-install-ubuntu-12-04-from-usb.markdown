---
author: yupinglu
comments: true
date: 2012-08-31 14:07:12+00:00
layout: post
slug: install-ubuntu-12-04-from-usb
title: Install Ubuntu 12.04 from USB
wordpress_id: 117
categories:
- Linux
tags:
- IPv6
- Ubuntu
- USB
---

1. Download the latest version of Ubuntu. [www.ubuntu.com/getubuntu/download](http://www.ubuntu.com/getubuntu/download)  My version is 12.04

2. Prepare a USB flash disk, make sure its capacity is larger than 2GB.

3. Go to [www.pendrivelinux.com/downloads/Universal-USB-Installer](http://www.pendrivelinux.com/downloads/Universal-USB-Installer) and download the Universal-USB-Installer.exe file. Put it on your Desktop or somewhere convenient.

4. Run Universal-USB-Installer.exe to create a bootable Ubuntu USB flash drive.

5. Make sure your BIOS's first boot choice is from USB

More details: [https://help.ubuntu.com/community/Installation/FromUSBStickQuick](https://help.ubuntu.com/community/Installation/FromUSBStickQuick)

Set up IPv6 in Ubuntu

1. $ sudo apt-get install miredo
2. $ ifconfig (If success, you should see **teredo** in the result)

3. $ sudo gedit /etc/default/ufw (change your firewall setting: set IPV6=no to **yes**)

4. $ sudo ufw disable
5. $ sudo ufw enable

