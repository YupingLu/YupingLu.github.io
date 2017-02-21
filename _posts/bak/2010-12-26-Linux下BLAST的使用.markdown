---
author: yupinglu
comments: true
date: 2010-12-26 07:59:00+00:00
layout: post
slug: Linux下BLAST的使用
title: Linux下BLAST的使用
wordpress_id: 189
categories:
- Linux
tags:
- Blast
- Linux
---

1、把BLAST的压缩文件解压，然后将bin目录下的文件拷贝至/usr/local/bin下；
2、制作软链接，将解压后的文件中bin目录链接至/home/username下，eg：ln -s /home/username/blast/bin；
3、在当前用户目录下，编辑bashrc文件，在文件中加入export PATH=/home/username/bin/=$PATH;
4、在当前目录下，将数据文件格式化，$formatdb -i filename.后缀 -p F -o T5、将待进行blast的文件转化为test.txt文件，拷贝文件内容如下：>test....ACGTCAGTCGATCGAT.....6、进行比对$blastall -p blastn -d filename.后缀 -i test.txt -o test.out
	formatdb -i /home/liuguiyou/Landsberg_Arabidopsis/ncbi_arab2.fna  -o T -p F

	[liuguiyou@localhost ~]$ blastall -p blastn -i 
	/home/liuguiyou/Landsberg_Arabidopsis/Cereon_Ath_Ler.fasta 
	-d /home/liuguiyou/Landsberg_Arabidopsis/ncbi_arab2.fna -e 1e-10 
	-o /home/liuguiyou/Landsberg_Arabidopsis/result

假设：
你安装的blast路径为 /opt/blast/

1、把BLAST的压缩文件解压，然后将bin目录下的文件拷贝至/usr/local/bin下；
	---
	目的：所有用户，不管其当前路径是什么，均可以在命令行下直接调用blast包中的程序，而无需指定该程序的路径
	解释：系统的PATH环境变量中包含/usr/local/bin，在命令行下调用blast包中的程序时，系统会去/usr/local/bin路径下寻找相应的命令程序
	建议：简单起见，你可以略过这一步，除非你希望当使用其他用户登录后，也可以直接输入程序名来使用你安装的blast

2、制作软链接，将解压后的文件中bin目录链接至/home/username下，eg：ln -s /home/username/blast/bin；
	---
	目的：为第3步所做的准备工作
	建议：简单起见，你可以略过这一步

3、在当前用户目录下，编辑bashrc文件，在文件中加入export PATH=/home/username/bin/=$PATH;
	---
	纠正：这里有一些笔误，应当是编辑.bashrc文件，并在文件中加入export PATH=/home/username/bin/:$PATH;
	目的：当前用户登录后，可以直接输入程序名来使用blast
	建议：简单起见，你可以略过这一步

4、在当前目录下，将数据文件格式化，$formatdb -i filename.后缀 -p F -o T
	---
	执行：**代码:**/opt/blast/bin/formatdb -i {data file here} -p F -o T

5、将待进行blast的文件转化为test.txt文件，拷贝文件内容如下：
	>test....
	ACGTCAGTCGATCGAT.....
	---
	这个没什么好说的，改个文件名

6、进行比对
	$blastall -p blastn -d filename.后缀 -i test.txt -o test.out
	---
	执行：**代码:**/opt/blast/bin/blastall -p blastn -d {database file here} -i test.txt -o test.out

补充说明：

**1．运行建库程序formatdb：**

建库的过程是建立目标序列的索引文件，所用程序是formatdb。程序允许的输入格式FASTA或者ASN.1格式，通常我们使用FASTA格式的序列作为输入。用于建库的FASTA序列是db.seq，formatdb的基本命令是：

formatdb -i db.seq [-options]

常用的参数有以下几个：

-p (T/F)：-p参数的意义是选择建库的类型，"T"表示蛋白库，"F"表示核酸库。缺省值为"T"。

-o (T/F)：-o参数的意义是判断是否分析序列名并建立序列名索引。"T"表示建立序列名索引，"F"表示不建立序列名索引。缺省值为"F"。

程序输出：

如果建立的是核酸库，输出为db.seq.nhr、db.seq.nin、db.seq.nsq，如果选择了参数"-o T"，还会同时输出db.seq.nsd、db.seq.nsi、db.seq.nni、db.seq.nnd。

蛋白库和核酸库的输出类似，相应的输出文件为：db.seq.phr、db.seq.pin、db.seq.psq和db.seq.psd、db.seq.psi、db.seq.pni、db.seq.pnd。

除了这些结果，程序还会输出LOG文件（默认为formatdb.log），里面记录了运行时间、版本号、序列数量等信息。

**2．运行比对程序blastall：**

Blast的主程序是blastall。程序的输入文件是query序列（-i 参数）和库文件（-d 参数），比对类型的选择（-p 参数）和输出文件（-o 参数）由用户指定。其中“-p”参数有5种取值：

-p blastp：蛋白序列与蛋白库做比对。

-p blastx：核酸序列对蛋白库的比对。

-p blastn：核酸序列对核酸库的比对。

-p tblastn：蛋白序列对核酸库的比对。

-p tblastx：核酸序列对核酸库在蛋白级别的比对

blastall是最常用的blast程序之一，其功能非常强大，其下面有非常多的参数，但是一般使用的参数如：-p、-i、-d、-o、-e等几个。

**3．运行参数说明：**

**-p: 执行的程序名称****-d: 搜索的数据库名称****-i : 要查询的序列文件名(Query File)****-e:(数学)期望值(Expectation value)，E值是个统计阈值，缺省值10, 意指比对结果中由于随机偶然性产生的匹配结果不大于10,E值越小结果越可靠。**-o :查询结果输出文件名-m: 比对结果显示格式选项，缺省值为0 ，即pairwise格式。另外还可以根据不同的需要选择1~6等不同的格式。-I :在描述行中显示gi号[T/F]，缺省值F**-v :单行描述（one-line description）的最大数目，缺省值500****-b :显示的比对结果的最大数目，缺省值250**-F :对于要查询的序列做低复杂度区域(low complexity regions, LCR)的过滤[T/F]，缺省值T。对blastn用的是DUST程序，其他比对用的是SEG程序。所谓“低复杂度区域”是指某些或一些残基过多表现，短周期重复等。对于高等哺乳动物的基因组序列，可以先用RepeatMask程序遮蔽重复元件。在输出结果中，对LCR区的序列核酸用“N”代替，蛋白质序列用“X”代替。-a:运行BLAST程序所使用的处理器的数目，缺省值1-S:在数据库中搜索时所使用的核酸链（strand），只对blastn、blastx和tblastx有效；1表示top，2表示bottom，3表示both；缺省值3**-T: 产生HTML格式的输出[T/F]，缺省值F**-n: 使用MegaBlast搜索[T/F]，缺省值F-G: 打开一个gap的罚分（0表示使用缺省设置值），默认0-E: 扩展一个gap的罚分（0表示使用缺省设置值），默认0-q: 一个核酸碱基的错配(mismatch)的罚分（只对blastn有效），缺省值-3-r : 一个核酸碱基的正确匹配(match)的奖分（只对blastn有效），缺省值1-M: 所使用的打分矩阵，缺省值BLOSUM62

**4．输出结果参数说明：**

-m: 比对结果显示格式选项

0 = pairwise,1 = query-anchored showing identities,2 = query-anchored no identities,

3 = flat query-anchored, show identities,

4 = flat query-anchored, no identities,

5 = query-anchored no identities and blunt ends,

6 = flat query-anchored, no identities and blunt ends,

7 = XML Blast output,

8 = tabular,

9 tabular with comment lines

10 ASN, text

11 ASN, binary

-m 8：列表格式的比对结果。从左到右各列的意义依次是：query名、subject名、identity、比对长度、错配数、空位数、query比对起始坐标、query比对终止坐标、subject比对起始坐标、subject比对终止坐标、期望值、比对得分。

	query1 sub24   91.11   45    3   1    198   241   502208  502252  2.7e-06 50.05
	
	query1 sub21   98.68   151   2   0    532   682   1360665 1360515 1.0e-76 284.0
	
	query1 sub21   86.17   94    12  1    198   290   479232  479139  4.8e-14 75.82
	
	query1 sub21   87.04   54    7   0    238   291   1297867 1297920 6.9e-07 52.03
	
	query2 sub21   99.44   892   3   2    28    918   1351055 1350165 0.0     1713.2
	
	query2 sub21   87.58   153   17  1    343   495   1358110 1357960 2.1e-35 147.2
	
	query2 sub21   84.11   107   16  1    699   805   1305723 1305618 4.0e-12 69.88
	
	query2 sub21   89.58   48    5   0    519   566   1305968 1305921 6.0e-08 56.00
	
	query2 sub14   88.24   153   16  1    343   495   145402  145252  8.7e-38 155.1
	
	query2 sub24   88.08   151   16  1    345   495   567561  567709  1.4e-36 151.2
	
	query2 sub24   87.80   123   14  1    686   808   563341  563220  1.9e-26 117.5

在m8格式中通过subject的比对起止位置可以判断出序列的比对方向。比如上述结果中第1行，subject的起始坐标小于终止坐标，则两条序列是同方向比对上的；第2行中subject起始坐标大于终止坐标，则query序列是和subject的互补链比上的。

-m 9：带注释行的列表格式。格式和-m 8一样，只是在每个query的比对结果前面加了注释行用以说明列表中各列的意义。

	# BLASTN 2.2.8 [Jan-05-2004]
	
	# Query: query1   out.ace.1
	
	# Database: database.seq
	
	# Fields: Query id, Subject id, % identity, alignment length, mismatches, gap openings, q. start, q. end, s. start, s. end, e-value, bit score
	
	query1 sub24   91.11   45    3   1    198   241   502208  502252  2.7e-06 50.05
	
	query1 sub21   98.68   151   2   0    532   682   1360665 1360515 1.0e-76 284.0
	
	query1 sub21   86.17   94    12  1    198   290   479232  479139  4.8e-14 75.82
	
	query1 sub21   87.04   54    7   0    238   291   1297867 1297920 6.9e-07 52.03
	
	# BLASTN 2.2.8 [Jan-05-2004]
	
	# Query: query1   out.ace.1
	
	# Database: database.seq
	
	# Fields: Query id, Subject id, % identity, alignment length, mismatches, gap openings, q. start, q. end, s. start, s. end, e-value, bit score
	
	query2 sub21   99.44   892   3   2    28    918   1351055 1350165 0.0     1713.2
	
	query2 sub21   87.58   153   17  1    343   495   1358110 1357960 2.1e-35 147.2
	
	query2 sub21   84.11   107   16  1    699   805   1305723 1305618 4.0e-12 69.88
	
	query2 sub21   89.58   48    5   0    519   566   1305968 1305921 6.0e-08 56.00
	
	query2 sub14   88.24   153   16  1    343   495   145402  145252  8.7e-38 155.1
	
	query2 sub24   88.08   151   16  1    345   495   567561  567709  1.4e-36 151.2
	
	query2 sub24   87.80   123   14  1    686   808   563341  563220  1.9e-26 117.5

-m 10和11：分别是ASN格式的文本文件和二进制文件，这里就不做介绍了。

“-m”参数的值从1到6都是为了便于在subjects之间做比较而设立的功能；8和9保留了所有比对结果的原貌，只是统计成了列表的格式，从而大幅度降低了存储空间的消耗，并使结果更加清晰易读。但是m8/m9格式也有相应的缺点，就是损失了一部分比对信息，除了序列长度信息和比对条形图以外，还会在 blastx、tblastn和tblastx的比对中损失关键的相位信息，这是要尽量避免的。因此在大规模的blastn比对任务中，往往要采用m8格式的输出结果来节省空间；而在小规模高精度比对中，通常用默认的输出格式，再用其他程序来提取结果中的有用信息。
