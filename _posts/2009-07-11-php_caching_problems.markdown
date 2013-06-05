---
author: yupinglu
comments: true
date: 2009-07-11 08:02:00+00:00
layout: post
slug: php_caching_problems
title: PHP的缓存问题
wordpress_id: 87
categories:
- PHP
tags:
- php
---

<?php
include("../jpgraph/src/jpgraph.php");
include("../jpgraph/src/jpgraph_bar.php");
include("linkdatabase.php");

// Setup the graph.
$graph = new Graph(1000,400,"auto"); //创建新的Graph对象，图片长：400px，宽300px
$graph->SetScale("linlin",0,0,1,$scaffold);
$graph->img->SetMargin(30,15,25,25);

$graph->title->SetFont(FF_SIMSUN,FS_BOLD);//标题为中文字体

$graph->title->Set('植物基因图谱');
$graph->title->SetColor('darkred');//标题颜色：深红

$graph->xaxis->SetPos('min');
$graph->xaxis->SetTickSide(SIDE_DOWN);

$bplot = new BarPlot($datay);

$bplot->SetWidth(1);
//$bplot->SetYBase(8);

$bplot->SetFillColor("#FF0000");
$bplot->SetColor("#FF0000");//柱型颜色

$graph->Add($bplot);

// Finally send the graph to the browser
$graph->Stroke();

?>

这是我用jpgraph画图的系统的一个文件。代码不算多，应该没什么问题。可是就是不能显示图像。我郁闷了很久，到底哪里错了呢。于是慢慢的调试。我考虑的是linkdatabase.php中的变量可能未传过来，于是在程序最后调用print_r($datay);未显示，说明$graph->Stroke();未执行。当在此之前调用print_r($datay);就正常显示数据。那就是最后一句程序的问题了。可到底哪里的问题呢。我首先就想到了缓存的问题，因为$datay存放的数据量比较大，有12MB左右。于是我在php.ini里修改了相关配置：

max_execution_time = 300     ; Maximum execution time of each script, in seconds
max_input_time = 600 ; Maximum amount of time each script may spend parsing request data
;max_input_nesting_level = 64 ; Maximum input variable nesting level
memory_limit = 1280M      ; Maximum amount of memory a script may consume (128MB)

果然就行了，挺高兴的，终于解决了问题。

最后显示的效果：

![](http://farm9.staticflickr.com/8065/8240926272_59db97fb7e_b.jpg)
