---
author: yupinglu
comments: true
date: 2010-12-26 08:00:00+00:00
layout: post
slug: build_a_web_page39s_blast_windows__linux
title: 构建Web页面的Blast(windows/linux)
wordpress_id: 190
categories:
- Linux
tags:
- Blast
- Linux
---

**准备1：[Linux](http://liucheng.name/tag/linux/)，**下载[Blast](http://liucheng.name/tag/blast/)。看[最新版的blast下载](http://www.liucheng.name/?p=785)，找到适合你的版本。假设安装在/usr/[NCBI](http://liucheng.name/tag/ncbi/)/[blast](http://liucheng.name/tag/blast/)/

准备2：php环境，运行一个例子看看。如果一切胜利。正常情况下，一般需要在你用户名（如zhenglc）下建个文件夹public_html，里面随便放个页面。内容可以是：

文件名：phpinfo.php<? echo phpinfo(); ?>

注意权限。你可以用chmod命令来改变文件或文件夹的权限。

chmod 777 zhenglcchmod 777 public_htmlchmod 777 phpinfo.php

有了权限后才可以运行。又假设你全部配置好了。例如该Linux的IP是192.168.1.1

http://192.168.1.1/~zhenglc/phpinfo.php

地址类似这样。如果一切顺利。当然会有内容。失败的话就重头再检查一遍。成功后接下来就比较简单。无非就是写个界面，然后调用blast就是。

例如：一个简单的界面index.php

<strong>1. To Blast Test DB Information(Enter [FASTA](http://liucheng.name/770/) sequence):</strong>
<form action="./blastall.php" enctype="application/x-www-form-urlencoded" method="post">//注意这里
Select
<select [name](http://liucheng.name/)="data" size="1"> <option selected="selected" value="test_na_db">Test na db(nt)</option>//这里是blastdb的名称。自行更换 <option value="test_aa_db">test_aa_db(protein)</option>//这里是blastdb的名称。自行更换</select>

Select
<select [name](http://liucheng.name/)="blast" size="1"> <option selected="selected" value="blastn">blastn</option> <option value="blastp">blastp</option></select>
<select name="bv" size="1"> <option selected="selected" value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="8">8</option> <option value="10">10</option></select>

<textarea style="width: 550px; height: 100px;" cols="66" rows="6" name="sequence"></textarea>
<input name="B1" type="submit" value="Blast" />
<input name="B2" type="reset" value="Reset" />
</form>

触发Form之后，提交到blastall.php

< ?php$sequence=$_POST[sequence];$blast=$_POST[blast];$bv=$_POST[bv];$data=$_POST[data];$filename=md5 (uniqid (rand()));//随机产生一个文件名$file=fopen("/tmp/$filename.seq","w+");//把提交的[序列](http://liucheng.name/entrez/)保存在这里fwrite($file,$sequence,strlen($sequence));fclose($file);system("/usr/ncbi/blast/blastall -i /tmp/$filename.seq -p $blast -d /ext2/zhenglc/blastdb/$data -b $bv -v $bv -F F");//这里运行blast。用system调用linux命行。 exit; } ?>

是比较简单的。具体一些路径自行更换。参数也是。

另外，你也可以直接下载[wwwblast](http://liucheng.name/tag/wwwblast/)，直接下载后解压就能用了。

**另外如果是在windows环境，如XP下的。注意路径。**

相应的地方改为：

$file=fopen("C:/blast/$filename.seq","w+");$blastresult=passthru("C:/blast/bin/blastall.exe -i C:/blast/$filename.seq -p $blast -d C:/blast/db/$db -b $bv -v $bv -F F"); //Linux下用system函数，windows下运行用passthru函数。print $blastresult;

~完~!
