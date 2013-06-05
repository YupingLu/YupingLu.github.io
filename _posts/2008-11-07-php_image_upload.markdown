---
author: yupinglu
comments: true
date: 2008-11-07 05:55:00+00:00
layout: post
slug: php_image_upload
title: php图像上传
wordpress_id: 160
categories:
- PHP
tags:
- php
---

昨天好郁闷，搞了一天的图像上传代码，就是没能实现，今天接着弄，终于有了些头绪！

以下是我第一次的代码，弄了半天终于不报错了！

<?php
$uploadfile = "upfiles/".$_FILES['upfile']['name'];   //上传后文件所在的文件名和路径
$smallfile = "upfiles/small_".$_FILES['upfile']['name'];     //上传后缩略图文件所在的文件名和路径

if($_FILES['upfile']['type'] == "image/pjpeg")
{
move_uploaded_file($_FILES['upfile']['tmp_name'],$uploadfile); //上传文件

$dstW = 200;     //设定缩略图的宽度
$dstH = 200;     //设定缩略图的高度

$src_image = ImageCreateFromJPEG($uploadfile);    //读取JPEG文件并创建图像对象
$srcW = ImageSX($src_image);          //获得图像的宽度
$srcH = ImageSY($src_image);          //获得图像的高度
$dst_image = ImageCreateTrueColor($dstW,$dstH);        //创建新的图像对象
//将图像重新定义大小写后写入新的图像对象
ImageCopyResized($dst_image,$src_image,0,0,0,0,$dstW,$dstH,$srcW,$srcH);
ImageJpeg($dst_image,$smallfile);           //创建缩略图文件

echo "文件上传完成<br>";        //输出上传成功的信息
echo "<img src='$smallfile'></img>";          //在页面上显示缩略图
}
else if($_FILES['upfile']['type'] == "image/gif")
{
move_uploaded_file($_FILES['upfile']['tmp_name'],$uploadfile); //上传文件

$dstW = 200;     //设定缩略图的宽度
$dstH = 200;     //设定缩略图的高度

$src_image = ImageCreateFromGIF($uploadfile);    //读取JPEG文件并创建图像对象
$srcW = ImageSX($src_image);          //获得图像的宽度
$srcH = ImageSY($src_image);          //获得图像的高度
$dst_image = ImageCreateTrueColor($dstW,$dstH);        //创建新的图像对象
//将图像重新定义大小写后写入新的图像对象
ImageCopyResized($dst_image,$src_image,0,0,0,0,$dstW,$dstH,$srcW,$srcH);
ImageGif($dst_image,$smallfile);           //创建缩略图文件

echo "文件上传完成<br>";        //输出上传成功的信息
echo "<img src='$smallfile'></img>";          //在页面上显示缩略图
}
else
{
echo "文件类型错误！";     //输出错误信息
}
?>

接下来又修改了一下，虽然还不够全面，不过自我感觉还可以！

<?php
/******************************************************************************
图片上传程序

版权说明:
Mady By ALLAN
2008.11.7
[http://hi.baidu.com/dalas12345.cn](http://hi.baidu.com/dalas12345.cn)
ALLAN's Blog

参数说明:
$max_file_size : 上传文件大小限制, 单位BYTE
$destination_folder : 上传文件路径
$watermark   : 是否附加水印(1为加水印,其他为不加水印);

使用说明:
1. 将PHP.INI文件里面的"extension=php_gd2.dll"一行前面的;号去掉,因为我们要用到GD库;
2. 将extension_dir =改为你的php_gd2.dll所在目录;
******************************************************************************/

$uptypes=array('image/jpg',   //上传文件类型列表
'image/jpeg',
'image/png',
'image/pjpeg',
'image/gif',
'image/bmp',
'image/x-png');

$max_file_size=2000000;     //上传文件大小限制, 单位BYTE
$destination_folder="uploadimg/"; //上传文件路径
$watermark=1;      //是否附加水印(1为加水印,其他为不加水印);
$watertype=1;      //水印类型(1为文字,2为图片)
$waterposition=1;     //水印位置(1为左下角,2为右下角,3为左上角,4为右上角,5为居中);
$waterstring="[www.xplore.cn](http://www.xplore.cn/)"; //水印字符串
$waterimg="xplore.gif";    //水印图片
$imgpreview=1;      //是否生成预览图(1为生成,其他为不生成);
$imgpreviewsize=1/2;    //缩略图比例
?>
<html>
<head>
<title>图片上传程序</title>
<style type="text/css">
<!--
body
{
font-size: 9pt;
}
input {
background-color: #66CCFF;
border: 1px inset #CCCCCC;
}
-->
</style>
</head>

<body>
<form enctype="multipart/form-data" method="post" name="upform">
上传文件:
<input name="upfile" type="file">
<input type="submit" value="上传"><br>
允许上传的文件类型为:<?php echo $i=implode(', ',$uptypes); ?>
</form>

<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
if (!is_uploaded_file($_FILES["upfile"]["tmp_name"]))
//是否存在文件
{
echo "图片不存在!";
exit;
}

$file = $_FILES["upfile"];
if($max_file_size < $file["size"])
//检查文件大小
{
echo "文件太大!";
exit;
}

if(!in_array($file["type"], $uptypes))
//检查文件类型
{
echo "文件类型不符!".$file["type"];
exit;
}

if(!file_exists($destination_folder))
mkdir($destination_folder);

$filename=$file["tmp_name"];
$image_size = getimagesize($filename);
$pinfo=pathinfo($file["name"]);
$ftype=$pinfo["extension"];
$destination = $destination_folder.time().".".$ftype;
if (file_exists($destination) && $overwrite != true)
{
echo "同名文件已经存在了";
exit;
}

if(!move_uploaded_file ($filename, $destination))
{
echo "移动文件出错";
exit;
}

$pinfo=pathinfo($destination);
$fname=$pinfo["basename"];
echo " <font color=red>已经成功上传</font><br>文件名: <font color=blue>".$destination_folder.$fname."</font><br>";
echo " 宽度:".$image_size[0];
echo " 长度:".$image_size[1];
echo "<br> 大小:".$file["size"]." bytes";

if($watermark==1)
{
$iinfo=getimagesize($destination,$iinfo);
$nimage=imagecreatetruecolor($image_size[0],$image_size[1]);
$white=imagecolorallocate($nimage,255,255,255);
$black=imagecolorallocate($nimage,0,0,0);
$red=imagecolorallocate($nimage,255,0,0);
imagefill($nimage,0,0,$white);
switch ($iinfo[2])
{
case 1:
$simage =imagecreatefromgif($destination);
break;
case 2:
$simage =imagecreatefromjpeg($destination);
break;
case 3:
$simage =imagecreatefrompng($destination);
break;
case 6:
$simage =imagecreatefromwbmp($destination);
break;
default:
die("不支持的文件类型");
exit;
}

imagecopy($nimage,$simage,0,0,0,0,$image_size[0],$image_size[1]);
imagefilledrectangle($nimage,1,$image_size[1]-15,80,$image_size[1],$white);

switch($watertype)
{
case 1:   //加水印字符串
imagestring($nimage,2,3,$image_size[1]-15,$waterstring,$black);
break;
case 2:   //加水印图片
$simage1 =imagecreatefromgif("xplore.gif");
imagecopy($nimage,$simage1,0,0,0,0,85,15);
imagedestroy($simage1);
break;
}

switch ($iinfo[2])
{
case 1:
//imagegif($nimage, $destination);
imagejpeg($nimage, $destination);
break;
case 2:
imagejpeg($nimage, $destination);
break;
case 3:
imagepng($nimage, $destination);
break;
case 6:
imagewbmp($nimage, $destination);
//imagejpeg($nimage, $destination);
break;
}

//覆盖原上传文件
imagedestroy($nimage);
imagedestroy($simage);
}

if($imgpreview==1)
{
echo "<br>图片预览:<br>";
echo "<img src="".$destination."" width=".($image_size[0]*$imgpreviewsize)." height=".($image_size[1]*$imgpreviewsize);
echo " alt="图片预览:r文件名:".$destination."r上传时间:">";
}
}
?>
</body>
</html>
