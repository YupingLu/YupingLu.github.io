---
author: yupinglu
comments: true
date: 2012-11-22 14:54:40+00:00
layout: post
slug: change-computer-name-and-username-in-ubuntu
title: Change Computer Name and Username in Ubuntu
wordpress_id: 148
categories:
- Linux
tags:
- Ubuntu
---

You might want to change the computer name for a number of reasons: Perhaps you want to shorten the name, or maybe there was a typo in the old computer name.

1. First, press Alt-F2 to bring up the Run dialog. Type the following:

    
    gksu gedit /etc/hostname



2. Type your administrator password when you’re prompted, and click OK. You’ll see a gedit text editor window open, displaying your current computer name. Replace the text with your desired name. Remember to hit Ctrl+S to save your file before closing the file.

3. Now bring up the Run dialog again by pressing Alt-F2. This time, type:

    
    gksu gedit /etc/hosts



4. Save the file and restart the system. Once you’re back on your desktop, open a terminal window and verify that you have your new computer name at the header.

Below tutorial will show you how to change username in ubuntu.First,we need login as root to change the username,then restart the enable this changing.

1. Open a terminal by Pressing Ctl+Alt+t or search terminal in Dash

2. Unlock account root and enable login as root using below command

    
    sudo passwd root
    sudo sh -c 'echo "greeter-show-manual-login=true" >> /etc/lightdm/lightdm.conf'



3. Reboot your computer and login as root

4. Open a terminal and Use blow command to change your username and home folder name

    
    usermod -m -d /home/newname -l newname oldname



5. All done,use below command to lock your root again,then you can reboot and login as your new username

    
    passwd -l root
