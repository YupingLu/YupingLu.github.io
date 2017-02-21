---
author: yupinglu
comments: true
date: 2009-06-12 13:28:00+00:00
layout: post
slug: vc60_afxresh_problem_can_not_be_loaded
title: VC6.0无法加载afxres.h的问题
wordpress_id: 81
categories:
- C++
tags:
- C++
---

最近一直在用windows7操作系统，感觉真的很爽，就是有一点挺郁闷的，我的版本不能用VC6.0,但现在用VS2008写MFC，自己还没那个能力，还好，试着装了windows7的XPM，虚拟的xp sp3。起初，以为一切将会很顺利，可是很快运行程序时发现，无法加载afxres.h。我以为又是兼容的问题，或者说是VC版本的问题。所以卸了几次，试了不同的版本，还是报同样的错，最后在百度的情况下，总算解决：现把方法总结如下：

Compiling...
Error spawning cl.exe
3-6.exe - 1 error(s), 0 warning(s)

可能很多人在安装VC 6.0后有过点击“Compile”或者“Build”后被出现的“Compiling... ,Error spawning cl.exe”错误提示给郁闷过。很多人的选择是重装，实际上这个问题很多情况下是由于路径设置的问题引起的，“CL.exe”是VC使用真正的编译器（编译程序），其路径在“VC根目录VC98Bin”下面，你可以到相应的路径下找到这个应用程序。.2404633

因此问题可以按照以下方法解决：点击VC“TOOLS（工具）”—>“Option（选择）”—>“Directories（目录）”重新设置“Excutable Fils、Include Files、Library Files、Source Files”的路径。很多情况可能就一个盘符的不同（例如你的VC装在C，但是这些路径全部在D），改过来就OK了。
