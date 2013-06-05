---
author: yupinglu
comments: true
date: 2010-12-14 02:10:00+00:00
layout: post
slug: java_sort_highlights_1
title: java排序集锦1
wordpress_id: 187
categories:
- JAVA
tags:
- JAVA
- Sort
---

	import java.util.Random;
	
	/**
	
	* 排序测试类
	
	*
	
	* 排序算法的分类如下：
	
	* 1.插入排序（直接插入排序、折半插入排序、希尔排序）；
	
	* 2.交换排序（冒泡泡排序、快速排序）；
	
	* 3.选择排序（直接选择排序、堆排序）；
	
	* 4.归并排序；
	
	* 5.基数排序。
	
	*
	
	* 关于排序方法的选择：
	
	* (1)若n较小(如n≤50)，可采用直接插入或直接选择排序。
	
	* 　当记录规模较小时，直接插入排序较好；否则因为直接选择移动的记录数少于直接插人，应选直接选择排序为宜。
	
	* (2)若文件初始状态基本有序(指正序)，则应选用直接插人、冒泡或随机的快速排序为宜；
	
	* (3)若n较大，则应采用时间复杂度为O(nlgn)的排序方法：快速排序、堆排序或归并排序。
	
	*
	
	*/
	
	public class SortTest {
		public int[] createArray() {
			Random random = new Random();
			
			int[] array = new int[10];
			
			for (int i = 0; i < 10; i++) {
				array[i] = random.nextInt(100) - random.nextInt(100);//生成两个随机数相减，保证生成的数中有负数
			}
			System.out.println("==========原始序列==========");
			
			printArray(array);
			
			return array;
		}
		
		public void printArray(int[] data) {
		
			for (int i : data) {
				System.out.print(i + " ");
			}
			
			System.out.println();
		}
		
		private void swap(int[] data, int x, int y) {
		
		int temp = data[x];
		
		data[x] = data[y];
		
		data[y] = temp;
	}
	
	/**
	
	* 冒泡排序----交换排序的一种
	
	* 方法：相邻两元素进行比较，如有需要则进行交换，每完成一次循环就将最大元素排在最后（如从小到大排序），下一次循环是将其他的数进行类似操作。
	
	* 性能：比较次数O(n^2),n^2/2；交换次数O(n^2),n^2/4
	
	*
	
	* @param data 要排序的数组
	
	* @param sortType 排序类型
	
	* @return
	
	*/
	
	public void bubbleSort(int[] data, String sortType) {
	
		if (sortType.equals("asc")) { //正排序，从小排到大
		
			//比较的轮数
			
			for (int i = 1; i < data.length; i++) {                     //数组有多长,轮数就有多长
			
				//将相邻两个数进行比较，较大的数往后冒泡
				
				for (int j = 0; j < data.length - i; j++) {          //每一轮下来会将比较的次数减少
				
					if (data[j] > data[j + 1]) {
					
						//交换相邻两个数
						
						swap(data, j, j + 1);
					
					}
					
				}
			
			}
		
		} else if (sortType.equals("desc")) { //倒排序，从大排到小
		
			//比较的轮数
			
			for (int i = 1; i < data.length; i++) {
			
				//将相邻两个数进行比较，较大的数往后冒泡
				
				for (int j = 0; j < data.length - i; j++) {
				
					if (data[j] < data[j + 1]) {
					
						//交换相邻两个数
						
						swap(data, j, j + 1);
					
					}
				
				}
				
			}
		
		} else {
		
			System.out.println("您输入的排序类型错误！");
		
		}
		
		printArray(data);//输出冒泡排序后的数组值
	
	}
	
	/**
	
	* 直接选择排序法----选择排序的一种
	
	* 方法：每一趟从待排序的数据元素中选出最小（或最大）的一个元素， 顺序放在已排好序的数列的最后，直到全部待排序的数据元素排完。
	
	* 性能：比较次数O(n^2),n^2/2
	
	*       交换次数O(n),n
	
	*       交换次数比冒泡排序少多了，由于交换所需CPU时间比比较所需的CUP时间多，所以选择排序比冒泡排序快。
	
	*       但是N比较大时，比较所需的CPU时间占主要地位，所以这时的性能和冒泡排序差不太多，但毫无疑问肯定要快些。
	
	*
	
	* @param data 要排序的数组
	
	* @param sortType 排序类型
	
	* @return
	
	*/
	
	public void selectSort(int[] data, String sortType) {
	
		if (sortType.equals("asc")) { //正排序，从小排到大
		
			int index;
			
			for (int i = 1; i < data.length; i++) {
			
				index = 0;
				
				for (int j = 1; j <= data.length - i; j++) {
				
					if (data[j] > data[index]) {
					
					index = j;
				
					}
				}
			
				//交换在位置data.length-i和index(最大值)两个数
				
				swap(data, data.length - i, index);
				
			}
			
		} else if (sortType.equals("desc")) { //倒排序，从大排到小
		
			int index;
			
			for (int i = 1; i < data.length; i++) {
			
				index = 0;
				
				for (int j = 1; j <= data.length - i; j++) {
				
				if (data[j] < data[index]) {
				
					index = j;
				
				}
			
			}
			
			//交换在位置data.length-i和index(最大值)两个数
			
			swap(data, data.length - i, index);
			
			}
		
		} else {
		
			System.out.println("您输入的排序类型错误！");
		
		}
		
		printArray(data);//输出直接选择排序后的数组值
	
	}

引用地址：[http://www.blogjava.net/yaozhongping/archive/2009/11/18/302832.html](http://www.blogjava.net/yaozhongping/archive/2009/11/18/302832.html)
