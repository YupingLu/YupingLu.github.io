---
author: yupinglu
comments: true
date: 2010-02-16 13:44:00+00:00
layout: post
slug: ubuntu下Java环境配置
title: ubuntu下Java环境配置
wordpress_id: 111
categories:
- JAVA
tags:
- JAVA
- Ubuntu
---

打开终端，执行以下命令，或使用Adept/新立得软件管理器，在其中分别搜索"sun-java6-jre"和"sun-java6-jdk"并标记安 装。

	sudo apt-get install sun-java6-jre

如果空间富裕，建议安装一个JDK。

	sudo apt-get install sun-java6-jdk

提示：安装过程中需要你回答是否同意使用协议（终端中红蓝色的提示界面），此时按tab键至OK，再按回车即可正常安装。

设置当前默认的java解释器：

	sudo update-alternatives --config java

执行后会出现类似如下的画面:

	There are 2 alternatives which provide `java'.
	
	Selection Alternative
	-----------------------------------------------
	1 /usr/bin/gij-wrapper-4.1
	*+ 2 /usr/lib/jvm/java-6-sun/jre/bin/java
	
	Press enter to keep the default
	
	
	
		
	  * , or type selection number:


输入 有包含 "sun" 的行的前面的数字。如上面显示，则输入2，然后回车确定。

配置JAVA环境变量:

	sudo gedit /etc/environment

在其中添加如下两行：

	CLASSPATH=.:/usr/lib/jvm/java-6-sun/lib
	JAVA_HOME=/usr/lib/jvm/java-6-sun
	
	sudo gedit /etc/jvm

将文件中的

	/usr/lib/jvm/java-6-sun

这一行填入到配置块的顶部

安装浏览器的JAVA Plugin（可选）：

	sudo apt-get install sun-java6-plugin

测试是否安装成功

写个简单的来测试一下

	public class HelloWorld{
	
		public static void main(String args[]){
			System.out.println("Hello World in Ubuntu!!");
		}
	}

然后在命令行输入：

	javac HelloWorld.java

如没有错误，则接着输入

	java HelloWorld

如果shell下输出

	Hello World in Ubuntu!!

OK，成功！

对于开发软件直接用Ubuntu软件中心的，可以直接桌面安装，若自己下载可能会出现编码出错、乱码等问题！
