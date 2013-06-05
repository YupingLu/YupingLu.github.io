---
author: yupinglu
comments: true
date: 2011-01-15 08:38:00+00:00
layout: post
slug: installing_memcached_for_php_53_on_windows_7
title: Installing Memcached for PHP 5.3 on Windows 7
wordpress_id: 195
categories:
- PHP
tags:
- php
---

First off, all credits go to [this guy](http://pureform.wordpress.com/2008/01/10/installing-memcache-on-windows-for-php/). I’m just listing the steps on how I did it in Windows 7 with PHP 5.3. Also, I tested this using[WampServer](http://www.wampserver.com/en/) but I believe it should work on any PHP install.

Install memcachedDownload the Memcached Win32 library here: [http://code.jellycan.com/memcached](http://code.jellycan.com/memcached/). Just get the Win32 binary ([direct link](http://code.jellycan.com/files/memcached-1.2.6-win32-bin.zip)). Extract the downloaded archive file in a directory (e.g. c:memcached). There should be a memcached.exe in there.Run a command prompt **as an administrator**. Some info on how to do that [here](http://blogs.msdn.com/tims/archive/2006/11/02/windows-vista-secret-10-open-an-elevated-command-prompt-in-six-keystrokes.aspx).

Install memcached as a service. Go to the memcached directory, type and run:

memcached -d install

If you get an error saying _“MSVCP71.dll is missing”_, see [this page](http://www.addictivetips.com/windows-tips/fix-msvcp71-dll-and-msvcr71-dll-missing-error-in-windows-7/) for a solution.

Start the memcached service by running:

memcached -d start

You can verify if memcached is running by executing this in the command line:

wmic process get description, executablepath | findstr memcached.exe

You should see a result list showing memcached.exe and its full path.

Install PHP Memcache extension (php_memcache.dll)Chances are you don’t have php_memcache.dll in your PHP extensions yet. You can download a build of it [here](http://downloads.php.net/pierre/). **Basu** has noted in the comments that VC6 builds are no longer available from that link. You can download the correct build [here](http://shikii.net/blog/downloads/php_memcache-cvs-20090703-5.3-VC6-x86.zip).The archive should contain php_memcache.dll. Extract the archive to your php extensions directory. On my system (WampServer), this was C:wampbinphpphp5.3.0ext.

Edit php.ini, add this line to enable the extension:

extension=php_memcache.dll

Or if you’re using WampServer, restart it and enable the extension through the WampServer system tray menu.

Test

Test the installation using the sample PHP code here: [http://www.php.net/manual/en/memcache.examples-overview.php](http://www.php.net/manual/en/memcache.examples-overview.php).
