---                
author: yupinglu                
comments: true                
date: 2008-12-24 13:00:00+00:00                
layout: post                
slug: data_structures_sort                
title: 数据结构排序                
wordpress_id: 46                
categories:                
- C++                
tags:                
- C++                
---                
                
排序；                
1、插入排序（直接插入排序和希尔排序）                
2、选择排序（直接选择排序和堆排序）                
3、交换排序（冒泡排序和快速排序）                
4、归并排序
5、基数排序                
－－－－－－－－－－－－－－－－－－－－－                
直接插入排序                
说明：逐个将后一个数加到前面的排好的序中。在直接插入排序过程中，对其中一个记录的插入排序称为一次                
排序；直接插入排序是从第二个记录开始进行的，因此，长度为n的记录序列需要进行n-1次排序才能完成整个                
序列的排序。时间复杂度为O(n2)。                
	void InsertSort(elemtype x[],int n)                
	/*用直接插入法对x[0]-x[n-1]排序*/                
	{                
		int i,j;                
		elemtype s;                
		for(i=0;i<n-1;i++)                
		{                
			s=x[i+1];                
			j=i;                
			while(j>-1&&s.key<x[j].key)                
			{                
				x[j+1]=x[j];                
				j--;                
			}                
			x[j+1]=s;                
		}                
	}                
－－－－－－－－－－－－－－－－－－－－－                
希尔排序                
说明：希尔排序又称缩小增量排序，增量di可以有各种不同的取法，但最后一次排序时的增量必须为1，最简                
单可取di+1=di/2（取小）。时间复杂度为O(n(log2n)2)。                
	void ShellSort(elemtype x[],int n,intd[],int Number)                
	/*用希尔排序法对记录x[0]-x[n-1]排序，d为增量值数组*/                
	/*Number为增量值个数，各组内采用直接插入法排序*/                
	{                
		int i,j,k,m,Span;                
		elemtype s;                
		for(m=0;m<Number;m++)                
		{                
			Span=d ;                
			for(k=0;k<Span;k++)                
			{                
				for(i=k;i<n-1;i+=Span)/*这个for之后的是“组内采用直接插入法排序”*/                
				{                
					s=x[i+Span];                
					j=i;                
					while(j>-1&&s.key<x[j].key)                
					{                
						x[j+Span]=x[j];                
						j-=Span;                
					}                
					x[j+Span]=s;                
				}                
			}                
		}                
	}                
－－－－－－－－－－－－－－－－－－－－－－－－－－－－                
直接选择排序                
说明：每次将后面的最小的找出来插入前面的已排好的序中。同理，具有n个记录的序列要做n-1次排序。                
时间复杂度为O(n2)。                
	void SelectSort(elemtype x[],int n)                
	/*用直接选择排序法对x[0]-x[n-1]排序*/                
	{                
		int i,j,Small;                
		elemtype Temp;                
		for(i=0;i<n-1;i++)                
		{                
			Small=i;                
			for(j=i+1;j<n;j++)                
			if(x[j].key<x[Small].key)                
			Small=j;                
			                
			if(Small!=i)                
			{                
				Temp=x ;                
				x =x[Small];                
				x[Small]=Temp;                
			}                
		}                
	}                
－－－－－－－－－－－－－－－－－－－－－－－－－－                
冒泡排序                
说明：两个两个比较，将大的往后移。通过第一次冒泡排序，使得待排序的n个记录中关键字最大的记录排到                
了序列的最后一个位置上。然后对序列中前n-1个记录进行第二次冒泡排序。。。对于n个记录的序列，共需进                
行n次冒泡排序。时间复杂度为O(n2)。                
	void BubbleSort(elemtype x[],int n)                
	/*用冒泡排序法对x[0]-x[n-1]排序*/                
	{                
		int i,j,flag=1;                
		elemtype Temp;                
		for(i=1;i<n&&flag==1;i++)                
		{                
			flag=0;                
			for(j=0;j<n-i;j++)                
			{                
				if(x[j].key>x[j+1].key)                
				{                
					flag=1;                
					Temp=x[j];                
					x[j]=x[j+1];                
					x[j+1]=Temp;                
				}                
			}                
		}                
	}                
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－                
快速排序                
说明：又叫分区交换排序，是对冒泡排序方法的一种改进。时间复杂度为O(nlog2n)。                
	void QuickSort(elemtype x[],int low,int high)                
	/*用递归方法对记录x[0]-x[n-1]进行快速排序*/                
	{                
		int i,j;                
		elemtype Temp;                
		i=low;                
		j=high;                
		Temp=x[low];                
		while(i<j)                
		{                
			/*在序列的右端扫描*/                
			while(i<j&&Temp.key<=x[j].key)j--;                
			if(i<j)                
			{                
				x =x[j];                
				i++;                
			}                
			/*在序列的左端扫描*/                
			while(i<j&&x .key<Temp.key)i++;                
			if(i<j)                
			{                
				x[j]=x ;                
				j--;                
			}                
		}                
		x =Temp;                
		/*对子序列进行快速排序*/                
		if(low<i-1)QuickSort(x,low,i-1);                
		if(j+1<high)QuickSort(x,j+1,high);                
	}                
－－－－－－－－－－－－－－－－－－－－－－－－－                
归并排序                
说明：所谓归并排序就是将两个或两个以上的有序数据序列合并成一个有序数据序列的过程。                
时间复杂度为O(nlog2n)。                
	void merge(r,l,m,h,r1,r2)/*r[l,m]及r[m+1,h]分别有序，归并后置于r2中*/                
	sqlist r,r2;                
	int l,m,h;                
	{                
	int i,j,k;                
	k=l;/*k是r2的指示器，i、j分别为s1、s2的指示器*/                
	i=l;                
	j=m+1;                
	while(i<=m&&j<=h)                
	{                
		if(r .key<=r[j].key)                
		{                
			r2[k]=r ;                
			i++;                
		}                
		else                
		{                
			r2[k]=r[j];                
			j++;                
		}                
		k++;                
	}                
	if(i>m) /*s1结束*/                
	while(j<=h)                
	{                
		r2[k]=r[j];                
		j++;k++;                
	}                
	else                
	while(i<=m)                
	{                
		r2[k]=r ;                
		i++;k++;                
	}                
