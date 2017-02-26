---
author: yupinglu
comments: true
date: 2010-10-23 12:58:00+00:00
layout: post
slug: turn_to_test_various_types_char_int_float_long__the_length_of_the_code
title: 测试各类型（char,int,float,long……）长度的代码
wordpress_id: 182
categories:
- IT
---

	#include <stdio.h>
	#include <stdlib.h>
	#include <string.h>
	
	typedef struct employee_st {
		char name[40];
		int id;
	} Employee;
	
	int main()
	{
		int myInt;
		Employee john;
		
		printf("Size of int is %dn",sizeof(myInt));
		/* The argument of sizeof is an object */
		printf("Size of int is %dn",sizeof(int));
		/* The argument of sizeof is a data type */
		
		printf("Size of Employee is %dn",sizeof(Employee));
		/* The argument of sizeof is a data type */
		printf("Size of john is %dn",sizeof(john));
		/* The argument of sizeof is an object */
		
		printf("Size of char is %dn",sizeof(char));
		printf("Size of short is %dn",sizeof(short));
		printf("Size of int is %dn",sizeof(int));
		printf("Size of long is %dn",sizeof(long));
		printf("Size of float is %dn",sizeof(float));
		printf("Size of double is %dn",sizeof(double));
		
		return 0;
	}
