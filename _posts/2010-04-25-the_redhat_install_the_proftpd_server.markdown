---
author: yupinglu
comments: true
date: 2010-04-25 10:55:00+00:00
layout: post
slug: the_redhat_install_the_proftpd_server
title: Redhat下安装proftpd服务器
wordpress_id: 175
categories:
- Linux
tags:
- Linux
---

最近工作室的服务器出问题，重装系统，配置proftpd心得如下，参考的一个比较全的笔记：ProFTPD是一个Unix平台上或是类Unix平台上(如Linux, FreeBSD等)的FTP服务器程序，
它是在自由软件基金会的版权声明(GPL)下开发、发布的免费软件，也就是说任何人只要遵
守GPL版权声明，都可以随意修改源始码。

ProFTPD设计目标是实现一个安全且易于设定的FTP Server。目前Unix或类Unix平台上
FTP Server十分有限，最常使用的恐怕就是wu-ftpd了。虽然wu-ftpd有着极佳的效能同时也是
一套很好的软件，然而它却欠缺了许多Win32平台上FTP Server的一些特色，同时wu-ftpd过去
也有不少的安全漏洞陆续被发现。ProFTPD的原创者本身就曾经花非常多的时间寻找wu-ftpd
的漏洞加以改进并且增加许多功能。然而十分不幸的是，他很快地发现显然wu-ftpd需要全部
重新的改写才能补足欠缺的设定能力以及缺乏的一些功能。ProFTPD不是从其它FTP Server的
既有原始码修改而产生的，相反的，它是完全独立而完整、重新改写的FTP Server。

ProFTPD的主要包括如下特点：

* 单一主设置文件，包含许多指令以及其支配的组，? 耆 际侵惫鄣纳瓒āＨ绻 魑欢訟
pache Web Serve的设置不陌生的话相信一定会觉得十分容易操作设定。

* 每个目录都可以定义一个".ftpaccess"设置文件，就如同Apache的".htaccess"文件一样可以设定
该目录的存取权限。

* 可设定多个虚拟FTP server，而匿名FTP服务更是十分容易。

* 可根据系统的负载(load)选择以单独运作(stand-alone)方式或是由inetd启动。

* 匿名FTP的根目录不需要特定的目录结构、系统二进制执行文件或其它系统文件。

* ProFTPD不执行任何外部程序以免造成安全漏洞。

* 具有隐藏目录或隐藏文件，源自于Unix形式的档案权限，或是user/group类型的档案权限设定。

* 能够以一般使用者在单独运作(stand-alone)模式下执行，以减少某些藉由攻击方式取得root权的
可能性。注：此功能与Unix的操作系统有关。

* 支持系统记录以及utmp/wtmp。
记录的方式与wu-ftpd的标准完全兼容，也支持记录内容的延伸格式。

* 支持Shadow&! nbsp;password，包括了帐号使用期限设定的功能。

编译和安装
Proftpd提供了多种安装格式，包括源代码方式、RPM方式、deb方式(debian软件包)等。本文
主要讨论源代码方式的安装。

从ftp.proftpd.net下载最新版本的proftpd-1.2.0rc3到Linux服务器上。然后按照如下步骤
进行处理：

[root@ftpd /]# cp proftpd-1.2.0rc3.tar.gz /usr/src/
[root@ftpd /]# cd /usr/src
[root@ftpd src]# tar xvfz proftpd-1.2.0rc3.tar.gz
[root@ftpd src]# cd proftpd-1.2.0rc3
[root@pftd proftpd-1.2.0rc3]# ./configure
[root@pftd proftpd-1.2.0rc3]# make
[root@pftd proftpd-1.2.0rc3]# make install

到现在为止，你已经完成了proftpd的编译和安装。并且在/usr/local/etc/目录下有一个默
认的proftpd配置文件proftpd.conf。

启动测试

对于笔者的试验系统RedHat6.2来说，需要将该配置文件中：

Group nogrou! p

修改为：

Group nobody

因为redhat系统中nobody用户属于nobody组，而不是nogroup组。

若需要将proftpd设置为系统启动时自动启动则通过如下命令拷贝启动文件：

[root@ftpd proftpd-1.2.0rc3]# cp ./contrib/dist/rpm/proftpd.init.d /etc/rc.d
/init.d/proftpd

然后修改该脚本的可执行属性：

[root@ftpd /]# chmod +x /etc/rc.d/init.d/proftpd

然后编辑/etc/rc.d/init.d/functions：

修改

export PATH="/sbin:/usr/sbin:/bin:/usr/bin:/usr/X11R6/bin"

为

export PATH="/sbin:/usr/sbin:/bin:/usr/bin:/usr/X11R6/bin:/usr/local/sbin"

注：若将在运行./cofigure命令时通过--prefix选项指定将proftpd安装在/usr/sbin目! 录下
则不需要修改fuctions文件。

然后运行命令：

[root@ftpd rc3.d]# chkconfig --level 35 proftpd on

则下次系统启动以后，proftpd将自动启动。

最后，需要确保系统当前没有ftp服务器在运行：

[root@ftpd /]# netstat -ln

若输出中不包含

tcp 0 0 0.0.0.0:21 0.0.0.0:* LISTEN

这样的内容则可以直接启动proftpd，否则需要关闭以前的ftpd服务器。对于一般的缺省
Linux安装来说，则需要通过以下的途径来关闭ftp服务器：

编辑/etc/inetd.conf文件，在

ftp stream tcp nowait root /usr/sbin/tcpd in.ftpd -l -a

一行前加上#：

#ftp stream tcp nowait root /usr/sbin/tcpd in.ftpd -l -a

然后：

[root@ftpd ! /]# ps ax|grep inetd
350 ? S 0:00 inetd

得到inetd的进程号 ，重新启动inetd进程：

[root@ftpd /]# kill -HUP 350

然后通过如下命令启动proftpd：

[root@ftpd /]# /etc/rc.d/init.d/proftpd start

这时候可以通过如下命令来测试proftpd是否正常运行：

C:WINDOWS>;ftp 192.168.2.33
Connected to 192.168.2.33.
220 ProFTPD 1.2.0rc3 Server (ProFTPD Default Installation)[ftpd.test.com.cn]
User (192.168.2.33![](http://localhost/wp-content/uploads/pic/other_site/bbs_chinaunix_icon_sad.gif)none)): ideal
Password:
230 User ideal logged in.
ftp>;

则现在你就拥有了一个安全可靠的ftp服务器。

FAQ

1、我安装proftpd以后，出现了问题，我如何调试？

通过通过命令! /usr/local/sbin/proftpd -d9 -n启动proftpd来进行调试,则proftp d就会将
调试信息打印到consle上以供调试之用。

2、为什么我的proftpf启动以后，匿名用户不能登录？

查看proftp配置文件/usr/local/etc/proftpd.conf，修改<Anonymous ～ftp>;为
<Anonymous /home/ftp>;（这里/home/ftp可以是任何希望匿名用户登录以后的当前根目录，
但是确保要使该目录允许ftp用户访问），并且若<Anonymous /home/ftp>;部分的User指令
指定的用户为ftp用户，则需要在配置文件中添加如下命令指示：

RequireValidShell off

3、我如何实现一个正常用户登录以后将其的访问限定在某个目录之下？

可以通过指令DefaultRoot来实现。例如若希望将ftpusers组的用户限定在自己的home目录下，则
需要首先创建该组：

/usr/sbin/groupadd ftpusers

然后将用户ideal加入到该组中：

usrmod -G ftpusers ideal

最后在在proftpd.conf文件中添加如下内容：

DefaultRoot ~ ftpusers

也可以限制用户登录以后仅仅访问自己主目录下的一个子目录：

Default! Root ~/anoftp ftpusers

当然也可以将用户限制在其他目录之下，而不是自己的home目录下：

DefaultRoot /tmp ftpusers

也可以限定一个用户组的某些用户被限制，而其他不作限制：

DefaultRoot ~ ftpusers,!empolyee

这个指令指示仅仅限制ftpusers组中的不是empolyee组的用户进行限制。

4、我如何使用户登陆时不显示ftp服务器版本信息，以增强安全性？

在proftpd.conf中添加如下内容：

ServerIdent off

则再次登录时，显示如下内容：

C:WINDOWS>;ftp 192.168.2.33
Connected to 192.168.2.33.
220 ftpd.test.com.cn FTP server ready.
User (192.168.2.33![](http://localhost/wp-content/uploads/pic/other_site/bbs_chinaunix_icon_sad.gif)none)):

5、在proftpd环境下如何设定虚拟主机？

可以通过指令：VirtualHost来实现，一个最简单的例子：

<VirtualHost 192.168.2.35>;
ServerName "virtual FTP server"
</VirtualHost>;
若你仅仅希望通过匿名访问某个虚拟主机，则使用如下! 的指令：

<VirtualHost 192.168.2.35>;

Serv erName "virtual FTP server"

<Limit LOGIN>;
DenyAll
</Limit>;

<Anonymous /usr/local/private>;

User private
Group private

<Limit LOGIN>;
AllowAll
</Limit>;

</Anonymous>;

</VirtualHost>;

这样192.168.2.35的这台主机则仅仅允许匿名登录。

笔者的proftpd.conf配置文件内容为：

# This is a basic ProFTPD configuration file (rename it to
# 'proftpd.conf' for actual use. It establishes a single server
# and a single anonymous login. It assumes that you have a user/group
# "nobody" and "ftp" for normal operation and anon.

ServerName &! quot;test.com.cn FTP Server"
ServerType standalone
DefaultServer on

# Port 21 is the standard FTP port.
Port 21
# Umask 022 is a good standard umask to prevent new dirs and files
# from being group and world writable.
Umask 022

# To prevent DoS attacks, set the maximum number of child processes
# to 30. If you need to allow more than 30 concurrent connections
# at once, simply increase this value. Note that this ONLY works
# in standalone mode, in inetd mode you should use an inetd server
# that allows you to&! nbsp;limit maximum number of processes per&nb sp;service
# (such as xinetd)
MaxInstances 30

RequireValidShell off
ServerIdent off

# Set the user and group that the server normally runs at.
User nobody
Group nobody

# Normally, we want files to be overwriteable.
<Directory /*>;
AllowOverwrite on
</Directory>;

# A basic anonymous configuration, no upload directories.
<Anonymous /home/ftp>;
User ftp
Group ftp
# We want clients to be able to login with "anonymous" as well as "ftp"
UserAlias anonymous ftp

# Limit the maximum number of anonymous logins
MaxClients 10

# We ! ;want 'welcome.msg' displayed at login, and '.message' displayed
# in each newly chdired directory.
DisplayLogin welcome.msg
DisplayFirstChdir .message

# Limit WRITE everywhere in the anonymous chroot
<Limit WRITE>;
DenyAll
</Limit>;

</Anonymous>;

DefaultRoot ~ ftpusers

<VirtualHost 192.168.2.35>;

ServerName "virtual FTP server"

<Limit LOGIN>;
DenyAll
</Limit>;

<Anonymous /usr/local/private>;

User private
Group private

<Limit LOGIN>;
AllowAll
</Limit>;

</Anonymous>;

</VirtualHost>;

参照的一个老外关于常遇到的问题解决方法，很重要：I have also had this problem, however, it was only the problem of rights inside the system. Careless what unix or linux you are using, you have to set the permissions inside your system, not only in the proftpd.conf, so that people can login and operate with ftp. That means:

# we will assume that /home/ftp is the folder we want to share, you must create an ftp user and ftp group first, # unless you already have it

# lets dedicate the folder and all its contents to the ftp owner and ftp group
sudo chown -R ftp:ftp /home/ftp   (!R应该为大写)

# now lets adjust the permitions so that the owner and group can read,write and execute, others only read
sudo chmod -R 775 /home/ftp

now, all the members of the group will be able to access the ftp with writing mode
and all the visitors will be able to read and download things
of course, you can make the system more sophisticated, but for the beginning....

# and if you really want more you can try e.g:
# for the upload we could have more courageously - but I do not advice this, it allows everyone
# to delete everything in upload
sudo chmod -R 777 /home/ftp/upload/

good luck

Kolaloka
(and if you get tired of the overautomagicUbuntu, try the NetBSD - the touch of a real unix)

chown与chmod的区别：chown 修改文件和文件夹的用户和用户组属性
1。要修改文件hh.c的所有者.修改为sakia的这个用户所有
chown sakia hh.c
这样就把hh.c的用户访问权限应用到sakia作为所有者
2。将目录 /tmp/sco 这个目录的所有者和组改为sakia和组net
chown -R sakia:net /tmp/sco

chmod 修改文件和文件夹读写执行属性
1。把hh.c文件修改为可写可读可执行
chmod 777 hh.c
要修改某目录下所有的 文件属性为可写可读可执行
chmod 777 *.*
把文件夹名称与后缀名用*来代替就可以了。
同理若是要修改所有htm 文件的属性
chmod 777 *.htm
2。把目录 /tmp/sco修改为可写可读可执行
chmod 777 /tmp/sco
要修改某目录下所有的文件夹属性为可写可读可执行
chmod 777 *
把文件夹名称用*来代替就可以了
要修改/tmp/sco下所有的文件和文件夹及其子文件夹属性为可写可读可执行
chmod -R 777 /tmp/sco
可 写 w=4
可读 r=2
可执行 x=1
777就是拥有全权限。根据需要可以自由组合用户和组的权限
