---
author: yupinglu
comments: true
date: 2009-05-24 09:13:00+00:00
layout: post
slug: C++中将string转换为int
title: C++中将string转换为int(转）
wordpress_id: 79
categories:
- C++
tags:
- C++
---

C语言库函数名: atoi
功 能: 把字符串转换成整型数
函数说明: atoi()会扫描参数nptr字符串，检测到第一个数字或正负符号时开始做类型转换，之后检测到非数字或结束符 � 时停止转换，返回整型数。
原型: int atoi(const char *nptr);
需要用到的头文件: #include <stdlib.h>
程序例:
	1）
	#include <stdlib.h>
	#include <stdio.h>
	int main(void)
	{
		int n;
		char *str = "12345.67";
		n = atoi(str);
		printf("string = %s integer = %dn", str, n);
		return 0;
	}
	执行结果
	string = 12345.67 integer = 12345
	
	2）
	#include <stdlib.h>
	#include <stdio.h>
	int main()
	{
		char a[] = "-100" ;
		char b[] = "123" ;
		int c ;
		c = atoi( a ) + atoi( b ) ;
		printf("c = %dn", c) ;
		return 0;
	}
	执行结果
	c = 23

我试过了,在C++中

对于

	#include <iostream>
	#include <cstdlib>
	
	using namespace std;
	int main()
	{
		string a;
		a="12345";
		int c;
		c=atoi(a);
		return 0;
	}

将会报错

原因我也不太清楚。。。

	#include <iostream>
	#include <cstdlib>
	
	using namespace std;
	int main()
	{
		string a;
		a="12345";
		int c;
		c=atoi(a.c_str());
		return 0;
	}

这样就可以了

百度百科：

c_str函数的返回值是const char*的，不能直接赋值给char*，所以就需要我们进行相应的操作转化，下面就是这一转化过程。

c++语言提供了两种字符串实现，其中较原始的一种只是字符串的c语言实现。与C语言的其他部分一样，它在c+的所有实现中可用，我们将这种实现提供的字符串对象，归为c-串，每个c-串char*类型的。

标准头文件<cstring>包含操作c-串的函数库。这些库函数表达了我们希望使用的几乎每种字符串操作。 当调用库函数，客户程序提供的是string类型参数，而库函数内部实现用的是c-串，因此需要将string对象，转化为char*对象，而c_str()提供了这样一种方法，它返回一个客户程序可读不可改的指向字符数组的指针。 例：

	#include <iostream>
	#include <string>
	using namespace std;
	
	void main()
	{
		string add_to="hello!";
		//std::cout<<add_to<<endl;
		const string add_on="baby";
		const char*cfirst = add_to.c_str();
		const char*csecond = add_on.c_str();
		char*copy = new char[strlen(cfirst) + strlen(csecond) + 1];
		
		strcpy( copy, cfirst);
		std::cout<<copy<<endl;
		
		//strcat( copy, csecond);
		
		add_to = copy;
		delete [] copy;
		
		std::cout<<add_to<<std::endl;
	}
