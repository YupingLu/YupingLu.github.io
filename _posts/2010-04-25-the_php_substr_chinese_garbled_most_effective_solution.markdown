---
author: yupinglu
comments: true
date: 2010-04-25 11:12:00+00:00
layout: post
slug: the_php_substr_chinese_garbled_most_effective_solution
title: php substr中文乱码最有效解决办法
wordpress_id: 176
categories:
- PHP
tags:
- php
---

php substr中文乱码最有效到解决办法(2009-07-29 12:29:38) 标签：[php](http://uni.sina.com.cn/c.php?t=blog&k=php&ts=bpost&stype=tag) [substr](http://uni.sina.com.cn/c.php?t=blog&k=substr&ts=bpost&stype=tag) [中 文乱码](http://uni.sina.com.cn/c.php?t=blog&k=%D6%D0%CE%C4%C2%D2%C2%EB&ts=bpost&stype=tag) [网 站开发](http://uni.sina.com.cn/c.php?t=blog&k=%CD%F8%D5%BE%BF%AA%B7%A2&ts=bpost&stype=tag) [it](http://uni.sina.com.cn/c.php?t=blog&k=it&ts=bpost&stype=tag)

直接使用PHP函数substr截取中文字符可能会出现乱码，主要是substr可能硬生生的将一个中文字符“锯”成两半。解决办法：

1、使用mbstring扩展库的mb_substr截取就不会出现乱码了。

2、自己书写截取函数，但效率不如用mbstring扩展库来得高。

3、如果仅是为了输出截取的串，可用如下方式实现：substr($str, 0, 30).chr(0)。

=============================

substr()函数可以分割文字，但要分割的文字如果包括中文字符往往会遇到问题，这时可以用mb_substr()/mb_strcut这个函 数，mb_substr()/mb_strcut的用法与substr()相似，只是在mb_substr()/mb_strcut最后要加入多一个参 数，以设定字符串的编码，但是一般的服务器都没打开php_mbstring.dll，需要在php.ini在把php_mbstring.dll打开。
举个例子：
<?php
echo mb_substr('这样一来我的字符串就不会有乱码^_^', 0, 7, 'utf-8');
?>
输出：这样一来我的字
<?php
echo mb_strcut('这样一来我的字符串就不会有乱码^_^', 0, 7, 'utf-8');
?>
输出：这样一
从上面的例子可以看出，mb_substr是按字来切分字符，而mb_strcut是按字节来切分字符，但是都不会产生半个字符的现象。

=============================

PHP实现中文字串截取无乱码的方法

function GBsubstr($string, $start, $length) {
if(strlen($string)>$length){
$str=null;
$len=$start+$length;
for($i=$start;$i<$len;$i++){
if(ord(substr($string,$i,1))>0xa0){
$str.=substr($string,$i,2);
$i++;
}else{
$str.=substr($string,$i,1);
}
}
return $str.'...';
}else{
return $string;
}
}

==========================================================

strpos('大家好','家') 返回是3

改用mb_strpos 用法.

mb_strpos

(PHP 4 >= 4.0.6)

mb_strpos -- Find position of first occurrence of string in a stringDescriptionint **mb_strpos** ( string haystack, string needle [, int offset [, string encoding]])

**mb_strpos()** returns the numeric position of the first occurrence of _needle_ in the _haystack_ string. If _needle_ is not found, it returns **FALSE**.

**mb_strpos()** performs multi-byte safe operation based on number of characters. _needle_ position is counted from the beginning of the _haystack_. First character's position is 0. Second character position is 1, and so on.

If _encoding_ is omitted, internal character encoding is used. accepts string for _needle_ where accepts only character.

_offset_ is search offset. If it is not specified, 0 is used.

_encoding_ is character encoding name. If it is omitted, internal character encoding is used.

See also **mb_strpos()**, ,
