---
author: yupinglu
comments: true
date: 2008-09-20 09:18:00+00:00
layout: post
slug: sql_query_essence_of_the_article
title: SQL查询语句精华文章
wordpress_id: 6
categories:
- Database
tags:
- Database
- SQL
---

一、 简单查询
简单的Transact-SQL查询只包括选择列表、FROM子句和WHERE子句。它们分别说明所查询列、查询的
表或视图、以及搜索条件等。
例如，下面的语句查询testtable表中姓名为“张三”的nickname字段和email字段。 _复制内容到剪贴板_ 代码:`SELECT `nickname`,`email`FROM `testtable`WHERE `name`='张三'`(一) 选择列表
选择列表(select_list)指出所查询列，它可以是一组列名列表、星号、表达式、变量(包括局部变
量和全局变量)等构成。

1、选择所有列
例如，下面语句显示testtable表中所有列的数据： _复制内容到剪贴板_ 代码:`SELECT * FROM testtable`2、选择部分列并指定它们的显示次序
查询结果集合中数据的排列顺序与选择列表中所指定的列名排列顺序相同。
例如： _复制内容到剪贴板_ 代码:`SELECT nickname,email FROM testtable`3、更改列标题
在选择列表中，可重新指定列标题。定义格式为：
列标题=列名
列名 列标题
如果指定的列标题不是标准的标识符格式时，应使用引号定界符，例如，下列语句使用汉字显示列
标题： _复制内容到剪贴板_ 代码:`SELECT 昵称=nickname,电子邮件=email   FROM testtable `4、删除重复行
SELECT语句中使用ALL或DISTINCT选项来显示表中符合条件的所有行或删除其中重复的数据行，默认
为ALL。使用DISTINCT选项时，对于所有重复的数据行在SELECT返回的结果集合中只保留一行。

5、限制返回的行数
使用TOP n [PERCENT]选项限制返回的数据行数，TOP n说明返回n行，而TOP n PERCENT时，说明n是
表示一百分数，指定返回的行数等于总行数的百分之几。
例如： _复制内容到剪贴板_ 代码:`SELECT TOP 2 * FROM `testtable` `_复制内容到剪贴板_ 代码:`SELECT TOP 20 PERCENT * FROM `testtable``(二)FROM子句
FROM子句指定SELECT语句查询及与查询相关的表或视图。在FROM子句中最多可指定256个表或视图，
它们之间用逗号分隔。
在FROM子句同时指定多个表或视图时，如果选择列表中存在同名列，这时应使用对象名限定这些列
所属的表或视图。例如在usertable和citytable表中同时存在cityid列，在查询两个表中的cityid时应
使用下面语句格式加以限定： _复制内容到剪贴板_ 代码:`SELECT `username`,citytable.cityid
FROM `usertable`,`citytable`
WHERE usertable.cityid=citytable.cityid`在FROM子句中可用以下两种格式为表或视图指定别名：
表名 as 别名
表名 别名

(二) FROM子句
FROM子句指定SELECT语句查询及与查询相关的表或视图。在FROM子句中最多可指定256个表或视图，
它们之间用逗号分隔。
在FROM子句同时指定多个表或视图时，如果选择列表中存在同名列，这时应使用对象名限定这些列
所属的表或视图。例如在usertable和citytable表中同时存在cityid列，在查询两个表中的cityid时应
使用下面语句格式加以限定： _复制内容到剪贴板_ 代码:`SELECT `username`,citytable.cityid
FROM `usertable`,`citytable`
WHERE usertable.cityid=citytable.cityid`在FROM子句中可用以下两种格式为表或视图指定别名： _复制内容到剪贴板_ 代码:`表名 as 别名
表名 别名`例如上面语句可用表的别名格式表示为： _复制内容到剪贴板_ 代码:`SELECT `username`,b.cityid
FROM usertable a,citytable b
WHERE a.cityid=b.cityid`SELECT不仅能从表或视图中检索数据，它还能够从其它查询语句所返回的结果集合中查询数据。
例如： _复制内容到剪贴板_ 代码:`SELECT a.au_fname+a.au_lname
FROM authors a,titleauthor ta
(SELECT `title_id`,`title`
FROM `titles`
WHERE ` ytd_sales`>10000
) AS t
WHERE a.au_id=ta.au_id
AND ta.title_id=t.title_id`此例中，将SELECT返回的结果集合给予一别名t，然后再从中检索数据。

(三) 使用WHERE子句设置查询条件
WHERE子句设置查询条件，过滤掉不需要的数据行。例如下面语句查询年龄大于20的数据： _复制内容到剪贴板_ 代码:`SELECT * FROM usertable WHERE age>20 `WHERE子句可包括各种条件运算符：
比较运算符(大小比较)：>、>=、=、<、<=、<>、!>、!<
范围运算符(表达式值是否在指定的范围)：BETWEEN…AND…
NOT BETWEEN…AND…
列表运算符(判断表达式是否为列表中的指定项)：IN (项1,项2……)
NOT IN (项1,项2……)
模式匹配符(判断值是否与指定的字符通配格式相符)LIKE、NOT LIKE
空值判断符(判断表达式是否为空)：IS NULL、NOT IS NULL
逻辑运算符(用于多条件的逻辑连接)：NOT、AND、OR
1、范围运算符例：age BETWEEN 10 AND 30相当于age>=10 AND age<=30
2、列表运算符例：country IN ('Germany','China')
3、模式匹配符例：常用于模糊查找，它判断列值是否与指定的字符串格式相匹配。可用于char、
varchar、text、ntext、datetime和smalldatetime等类型查询。
可使用以下通配字符：
百分号%：可匹配任意类型和长度的字符，如果是中文，请使用两个百分号即%%。
下划线_：匹配单个任意字符，它常用来限制表达式的字符长度。
方括号[]：指定一个字符、字符串或范围，要求所匹配对象为它们中的任一个。
[^]：其取值也[] 相同，但它要求所匹配对象为指定字符以外的任一个字符。
例如：
限制以Publishing结尾，使用LIKE '%Publishing'
限制以A开头：LIKE '[A]%'
限制以A开头外：LIKE '[^A]%'
4、空值判断符例WHERE age IS NULL
5、逻辑运算符：优先级为NOT、AND、OR
(四)查询结果排序
使用ORDER BY子句对查询返回的结果按一列或多列排序。ORDER BY子句的语法格式为：
ORDER BY {column_name [ASC|DESC]} [,…n]
其中ASC表示升序，为默认值，DESC为降序。ORDER BY不能按ntext、text和image数据类型进行排
序。
例如： _复制内容到剪贴板_ 代码:`SELECT * FROM `usertable` ORDER BY `age` DESC,`userid` ASC`另外，可以根据表达式进行排序。

二、 联合查询
UNION运算符可以将两个或两个以上上SELECT语句的查询结果集合合并成一个结果集合显示，即执行联
合查询。UNION的语法格式为： _复制内容到剪贴板_ 代码:`select_statement
UNION [ALL] selectstatement
[UNION [ALL] selectstatement][…n]`其中selectstatement为待联合的SELECT查询语句。
ALL选项表示将所有行合并到结果集合中。不指定该项时，被联合查询结果集合中的重复行将只保留一
行。
联合查询时，查询结果的列标题为第一个查询语句的列标题。因此，要定义列标题必须在第一个查询语
句中定义。要对联合查询结果排序时，也必须使用第一查询语句中的列名、列标题或者列序号。
在使用UNION 运算符时，应保证每个联合查询语句的选择列表中有相同数量的表达式，并且每个查询选
择表达式应具有相同的数据类型，或是可以自动将它们转换为相同的数据类型。在自动转换时，对于数值类
型，系统将低精度的数据类型转换为高精度的数据类型。
在包括多个查询的UNION语句中，其执行顺序是自左至右，使用括号可以改变这一执行顺序。例如：
查询1 UNION (查询2 UNION 查询3)

三、连接查询
通过连接运算符可以实现多个表查询。连接是关系数据库模型的主要特点，也是它区别于其它类型
数据库管理系统的一个标志。
在关系数据库管理系统中，表建立时各数据之间的关系不必确定，常把一个实体的所有信息存放在
一个表中。当检索数据时，通过连接操作查询出存放在多个表中的不同实体的信息。连接操作给用户带
来很大的灵活性，他们可以在任何时候增加新的数据类型。为不同实体创建新的表，尔后通过连接进行
查询。
连接可以在SELECT 语句的FROM子句或WHERE子句中建立，似是而非在FROM子句中指出连接时有助于
将连接操作与WHERE子句中的搜索条件区分开来。所以，在Transact-SQL中推荐使用这种方法。
SQL-92标准所定义的FROM子句的连接语法格式为： _复制内容到剪贴板_ 代码:`FROM join_table join_type join_table [ON (join_condition)]`其中join_table指出参与连接操作的表名，连接可以对同一个表操作，也可以对多表操作，对同一
个表操作的连接又称做自连接。
join_type 指出连接类型，可分为三种：内连接、外连接和交叉连接。内连接(INNER JOIN)使用比
较运算符进行表间某(些)列数据的比较操作，并列出这些表中与连接条件相匹配的数据行。根据所使用
的比较方式不同，内连接又分为等值连接、自然连接和不等连接三种。
外连接分为左外连接(LEFT OUTER JOIN或LEFT JOIN)、右外连接(RIGHT OUTER JOIN或RIGHT JOIN)
和全外连接(FULL OUTER JOIN或FULL JOIN)三种。与内连接不同的是，外连接不只列出与连接条件相匹
配的行，而是列出左表(左外连接时)、右表(右外连接时)或两个表(全外连接时)中所有符合搜索条件的
数据行。
交叉连接(CROSS JOIN)没有WHERE 子句，它返回连接表中所有数据行的笛卡尔积，其结果集合中的
数据行数等于第一个表中符合查询条件的数据行数乘以第二个表中符合查询条件的数据行数。
连接操作中的ON (join_condition) 子句指出连接条件，它由被连接表中的列和比较运算符、逻辑
运算符等构成。
无论哪种连接都不能对text、ntext和image数据类型列进行直接连接，但可以对这三种列进行间接
连接。例如： _复制内容到剪贴板_ 代码:`SELECT p1.pub_id,p2.pub_id,p1.pr_info
FROM pub_info AS p1 INNER JOIN pub_info AS p2
ON DATALENGTH(p1.pr_info)=DATALENGTH(p2.pr_info)`(一)内连接
内连接查询操作列出与连接条件匹配的数据行，它使用比较运算符比较被连接列的列值。内连接分
三种：
1、等值连接：在连接条件中使用等于号(=)运算符比较被连接列的列值，其查询结果中列出被连接
表中的所有列，包括其中的重复列。
2、不等连接： 在连接条件使用除等于运算符以外的其它比较运算符比较被连接的列的列值。这些
运算符包括>、>=、<=、<、!>、!<和<>。
3、自然连接：在连接条件中使用等于(=)运算符比较被连接列的列值，但它使用选择列表指出查询
结果集合中所包括的列，并删除连接表中的重复列。
例，下面使用等值连接列出authors和publishers表中位于同一城市的作者和出版社： _复制内容到剪贴板_ 代码:`SELECT *
FROM authors AS a INNER JOIN publishers AS p
ON a.city=p.city`又如使用自然连接，在选择列表中删除authors 和publishers 表中重复列(city和state)： _复制内容到剪贴板_ 代码:`SELECT a.*,p.pub_id,p.pub_name,p.country
FROM authors AS a INNER JOIN publishers AS p
ON a.city=p.city`(二)外连接
内连接时，返回查询结果集合中的仅是符合查询条件( WHERE 搜索条件或 HAVING 条件)和连接条件
的行。而采用外连接时，它返回到查询结果集合中的不仅包含符合连接条件的行，而且还包括左表(左外
连接时)、右表(右外连接时)或两个边接表(全外连接)中的所有数据行。
如下面使用左外连接将论坛内容和作者信息连接起来： _复制内容到剪贴板_ 代码:`SELECT a.*,b.* FROM `luntan` LEFT JOIN usertable as b
ON a.username=b.username`下面使用全外连接将city表中的所有作者以及user表中的所有作者，以及他们所在的城市： _复制内容到剪贴板_ 代码:`SELECT a.*,b.*
FROM city as a FULL OUTER JOIN user as b
ON a.username=b.username`(三)交叉连接
交叉连接不带WHERE 子句，它返回被连接的两个表所有数据行的笛卡尔积，返回到结果集合中的数
据行数等于第一个表中符合查询条件的数据行数乘以第二个表中符合查询条件的数据行数。
例，titles表中有6类图书，而publishers表中有8家出版社，则下列交叉连接检索到的记录数将等
于6*8=48行。 _复制内容到剪贴板_ 代码:`SELECT `type`,`pub_name`
FROM `titles` CROSS JOIN `publishers`
ORDER BY `type``SQL核心语句(非常实用的几个技巧)

_ArticleContent1_lblContent>插入数据

向表中添加一个新记录，你要使用SQL INSERT 语句。这里有一个如何使用这种语句的例子： _复制内容到剪贴板_ 代码:`INSERT mytable (mycolumn) VALUES (‘some data’) `这个语句把字符串’some data’插入表mytable的mycolumn字段中。将要被插入数据的字段的名字在第一个括号中指定，实际的数据在第二个括号中给出。

INSERT 语句的完整句法如下： _复制内容到剪贴板_ 代码:`INSERT [INTO] {table_name|view_name} [(column_list)] {DEFAULT VALUES | `

Values_list | select_statement} 如果一个表有多个字段，通过把字段名和字段值用逗号隔开，你可以向所有的字段中插入数据。假设表mytable有三个字段first_column,second_column,和third_column。下面的INSERT语句添加了一条三个字段都有值的完整记录： _复制内容到剪贴板_ 代码:`INSERT mytable (first_column,second_column,third_column) `

VALUES (‘some data’,’some more data’,’yet more data’)注意

你可以使用INSERT语句向文本型字段中插入数据。但是，如果你需要输入很长的字符串，你应该使用WRITETEXT语句。这部分内容对本书来说太高级了，因此不加讨论。要了解更多的信息，请参考Microsoft SQL Sever 的文档。

如果你在INSERT 语句中只指定两个字段和数据会怎么样呢？换句话说，你向一个表中插入一条新记录，但有一个字段没有提供数据。在这种情况下，有下面的四种可能：

如果该字段有一个缺省值，该值会被使用。例如，假设你插入新记录时没有给字段third_column提供数据，而这个字段有一个缺省值’some value’。在这种情况下，当新记录建立时会插入值’some value’。

如果该字段可以接受空值，而且没有缺省值，则会被插入空值。

如果该字段不能接受空值，而且没有缺省值，就会出现错误。你会收到错误信息：

The column in table mytable may not be null.

最后，如果该字段是一个标识字段，那么它会自动产生一个新值。当你向一个有标识字段的表中插入新记录时，只要忽略该字段，标识字段会给自己赋一个新值。

注意

向一个有标识字段的表中插入新记录后，你可以用SQL变量@@identity来访问新记录

的标识字段的值。考虑如下的SQL语句： _复制内容到剪贴板_ 代码:`INSERT mytable (first_column) VALUES(‘some value’)`

[code][/code]
[code][/code]

`INSERT anothertable(another_first,another_second) `

VALUES(@@identity,’some value’)如果表mytable有一个标识字段，该字段的值会被插入表anothertable的another_first字段。这是因为变量@@identity总是保存最后一次插入标识字段的值。

字段another_first应该与字段first_column有相同的数据类型。但是，字段another_first不能是应该标识字段。Another_first字段用来保存字段first_column的值。

删除记录

要从表中删除一个或多个记录，需要使用SQL DELETE语句。你可以给DELETE 语句提供WHERE 子句。WHERE子句用来选择要删除的记录。例如，下面的这个DELETE语句只删除字段first_column的值等于’Delete Me’的记录： _复制内容到剪贴板_ 代码:`DELETE mytable WHERE first_column=’Deltet Me’ `DELETE 语句的完整句法如下： _复制内容到剪贴板_ 代码:`DELETE [FROM] {table_name|view_name} [WHERE clause] `在SQL SELECT 语句中可以使用的任何条件都可以在DELECT 语句的WHERE子句 中使用。例如，下面的这个DELETE语句只删除那些first_column字段的值为’goodbye’或second_column字段的值为’so long’的记录： _复制内容到剪贴板_ 代码:`DELETE mytable WHERE first_column=’goodby’ OR second_column=’so long’ `如果你不给DELETE 语句提供WHERE 子句，表中的所有记录都将被删除。你不应该有这种想法。如果你想删除应该表中的所有记录，应使用第十章所讲的TRUNCATE TABLE语句。

注意

为什么要用TRUNCATE TABLE 语句代替DELETE语句？当你使用TRUNCATE TABLE语句时，记录的删除是不作记录的。也就是说，这意味着TRUNCATE TABLE 要比DELETE快得多。

更新记录

要修改表中已经存在的一条或多条记录，应使用SQL UPDATE语句。同DELETE语句一样，UPDATE语句可以使用WHERE子句来选择更新特定的记录。请看这个例子： _复制内容到剪贴板_ 代码:`UPDATE mytable SET first_column=’Updated!’ WHERE second_column=’Update Me!’ `这个UPDATE 语句更新所有second_column字段的值为’Update Me!’的记录。对所有被选中的记录，字段first_column的值被置为’Updated!’。

下面是UPDATE语句的完整句法： _复制内容到剪贴板_ 代码:`UPDATE {table_name|view_name} SET [{table_name|view_name}]
{column_list|variable_list|variable_and_column_list}
[,{column_list2|variable_list2|variable_and_column_list2}…
[,{column_listN|variable_listN|variable_and_column_listN}]]
[WHERE clause] `注意

你可以对文本型字段使用UPDATE语句。但是，如果你需要更新很长的字符串，应使用UPDATETEXT语句。这部分内容对本书来说太高级了，因此不加讨论。要了解更多的信息，请参考Microsoft SQL Sever 的文档。

如果你不提供WHERE子句，表中的所有记录都将被更新。有时这是有用的。例如，如果你想把表titles中的所有书的价格加倍，你可以使用如下的UPDATE 语句：

你也可以同时更新多个字段。例如，下面的UPDATE语句同时更新first_column,second_column,和third_column这三个字段： _复制内容到剪贴板_ 代码:`UPDATE mytable SET first_column=’Updated!’
Second_column=’Updated!’
Third_column=’Updated!’
WHERE first_column=’Update Me1’ `技巧

SQL忽略语句中多余的空格。你可以把SQL语句写成任何你最容易读的格式。

用SELECT 创建记录和表

你也许已经注意到，INSERT 语句与DELETE语句和UPDATE语句有一点不同，它一次只操作一个记录。然而，有一个方法可以使INSERT 语句一次添加多个记录。要作到这一点，你需要把INSERT 语句与SELECT 语句结合起来，象这样： _复制内容到剪贴板_ 代码:`INSERT mytable (first_column,second_column)
SELECT another_first,another_second
FROM anothertable
WHERE another_first=’Copy Me!’ `这个语句从anothertable拷贝记录到mytable.只有表anothertable中字段another_first的值为’Copy Me！’的记录才被拷贝。

当为一个表中的记录建立备份时，这种形式的INSERT 语句是非常有用的。在删除一个表中的记录之前，你可以先用这种方法把它们拷贝到另一个表中。

如果你需要拷贝整个表，你可以使用SELECT INTO 语句。例如，下面的语句创建了一个名为newtable的新表，该表包含表mytable的所有数据： _复制内容到剪贴板_ 代码:`SELECT * INTO newtable FROM mytable `你也可以指定只有特定的字段被用来创建这个新表。要做到这一点，只需在字段列表中指定你想要拷贝的字段。另外，你可以使用WHERE 子句来限制拷贝到新表中的记录。下面的例子只拷贝字段second_columnd的值等于’Copy Me!’的记录的first_column字段。 _复制内容到剪贴板_ 代码:`SELECT first_column INTO newtable
FROM mytable
WHERE second_column=’Copy Me!’ `使用SQL修改已经建立的表是很困难的。例如，如果你向一个表中添加了一个字段，没有容易的办法来去除它。另外，如果你不小心把一个字段的数据类型给错了，你将没有办法改变它。但是，使用本节中讲述的SQL语句，你可以绕过这两个问题。

例如，假设你想从一个表中删除一个字段。使用SELECT INTO 语句，你可以创建该表的一个拷贝，但不包含要删除的字段。这使你既删除了该字段，又保留了不想删除的数据。

如果你想改变一个字段的数据类型，你可以创建一个包含正确数据类型字段的新表。创建好该表后，你就可以结合使用UPDATE语句和SELECT 语句，把原来表中的所有数据拷贝到新表中。通过这种方法，你既可以修改表的结构，又能保存原有的数据。

_ArticleContent1_lblContent>插入数据

向表中添加一个新记录，你要使用SQL INSERT 语句。这里有一个如何使用这种语句的例子： _复制内容到剪贴板_ 代码:`INSERT mytable (mycolumn) VALUES (‘some data’) `这个语句把字符串’some data’插入表mytable的mycolumn字段中。将要被插入数据的字段的名字在第一个括号中指定，实际的数据在第二个括号中给出。

INSERT 语句的完整句法如下： _复制内容到剪贴板_ 代码:`INSERT [INTO] {table_name|view_name} [(column_list)] {DEFAULT VALUES | Values_list | select_statement} `如果一个表有多个字段，通过把字段名和字段值用逗号隔开，你可以向所有的字段中插入数据。假设表mytable有三个字段first_column,second_column,和third_column。下面的INSERT语句添加了一条三个字段都有值的完整记录： _复制内容到剪贴板_ 代码:`INSERT mytable (first_column,second_column,third_column) VALUES (‘some data’,’some more data’,’yet more data’)
`

[code][/code]

`
注意

你可以使用INSERT语句向文本型字段中插入数据。但是，如果你需要输入很长的字符串，你应该使用WRITETEXT语句。这部分内容对本书来说太高级了，因此不加讨论。要了解更多的信息，请参考Microsoft SQL Sever 的文档。

如果你在INSERT 语句中只指定两个字段和数据会怎么样呢？换句话说，你向一个表中插入一条新记录，但有一个字段没有提供数据。在这种情况下，有下面的四种可能：

如果该字段有一个缺省值，该值会被使用。例如，假设你插入新记录时没有给字段third_column提供数据，而这个字段有一个缺省值’some value’。在这种情况下，当新记录建立时会插入值’some value’。

如果该字段可以接受空值，而且没有缺省值，则会被插入空值。

如果该字段不能接受空值，而且没有缺省值，就会出现错误。你会收到错误信息：

The column in table mytable may not be null.

最后，如果该字段是一个标识字段，那么它会自动产生一个新值。当你向一个有标识字段的表中插入新记录时，只要忽略该字段，标识字段会给自己赋一个新值。

注意

向一个有标识字段的表中插入新记录后，你可以用SQL变量@@identity来访问新记录

的标识字段的值。考虑如下的SQL语句：
`

[code][/code]

`INSERT mytable (first_column) VALUES(‘some value’) `_复制内容到剪贴板_ 代码:`INSERT anothertable(another_first,another_second) VALUES(@@identity,’some value’) `如果表mytable有一个标识字段，该字段的值会被插入表anothertable的another_first字段。这是因为变量@@identity总是保存最后一次插入标识字段的值。

字段another_first应该与字段first_column有相同的数据类型。但是，字段another_first不能是应该标识字段。Another_first字段用来保存字段first_column的值。

删除记录

要从表中删除一个或多个记录，需要使用SQL DELETE语句。你可以给DELETE 语句提供WHERE 子句。WHERE子句用来选择要删除的记录。例如，下面的这个DELETE语句只删除字段first_column的值等于’Delete Me’的记录： _复制内容到剪贴板_ 代码:`DELETE mytable WHERE first_column=’Deltet Me’ `DELETE 语句的完整句法如下： _复制内容到剪贴板_ 代码:`DELETE [FROM] {table_name|view_name} [WHERE clause] `在SQL SELECT 语句中可以使用的任何条件都可以在DELECT 语句的WHERE子句 中使用。例如，下面的这个DELETE语句只删除那些first_column字段的值为’goodbye’或second_column字段的值为’so long’的记录： _复制内容到剪贴板_ 代码:`DELETE mytable WHERE first_column=’goodby’ OR second_column=’so long’ `如果你不给DELETE 语句提供WHERE 子句，表中的所有记录都将被删除。你不应该有这种想法。如果你想删除应该表中的所有记录，应使用第十章所讲的TRUNCATE TABLE语句。

注意

为什么要用TRUNCATE TABLE 语句代替DELETE语句？当你使用TRUNCATE TABLE语句时，记录的删除是不作记录的。也就是说，这意味着TRUNCATE TABLE 要比DELETE快得多。

更新记录

要修改表中已经存在的一条或多条记录，应使用SQL UPDATE语句。同DELETE语句一样，UPDATE语句可以使用WHERE子句来选择更新特定的记录。请看这个例子： _复制内容到剪贴板_ 代码:`UPDATE mytable SET first_column=’Updated!’ WHERE second_column=’Update Me!’ `这个UPDATE 语句更新所有second_column字段的值为’Update Me!’的记录。对所有被选中的记录，字段first_column的值被置为’Updated!’。

下面是UPDATE语句的完整句法： _复制内容到剪贴板_ 代码:`UPDATE {table_name|view_name} SET [{table_name|view_name}]
{column_list|variable_list|variable_and_column_list}
[,{column_list2|variable_list2|variable_and_column_list2}…
[,{column_listN|variable_listN|variable_and_column_listN}]]
[WHERE clause] `注意

你可以对文本型字段使用UPDATE语句。但是，如果你需要更新很长的字符串，应使用UPDATETEXT语句。这部分内容对本书来说太高级了，因此不加讨论。要了解更多的信息，请参考Microsoft SQL Sever 的文档。

如果你不提供WHERE子句，表中的所有记录都将被更新。有时这是有用的。例如，如果你想把表titles中的所有书的价格加倍，你可以使用如下的UPDATE 语句：

你也可以同时更新多个字段。例如，下面的UPDATE语句同时更新first_column,second_column,和third_column这三个字段： _复制内容到剪贴板_ 代码:`UPDATE mytable SET first_column=’Updated!’
Second_column=’Updated!’
Third_column=’Updated!’
WHERE first_column=’Update Me1’ `技巧

SQL忽略语句中多余的空格。你可以把SQL语句写成任何你最容易读的格式。

用SELECT 创建记录和表

你也许已经注意到，INSERT 语句与DELETE语句和UPDATE语句有一点不同，它一次只操作一个记录。然而，有一个方法可以使INSERT 语句一次添加多个记录。要作到这一点，你需要把INSERT 语句与SELECT 语句结合起来，象这样： _复制内容到剪贴板_ 代码:`INSERT mytable (first_column,second_column)
SELECT another_first,another_second
FROM anothertable
WHERE another_first=’Copy Me!’ `这个语句从anothertable拷贝记录到mytable.只有表anothertable中字段another_first的值为’Copy Me！’的记录才被拷贝。

当为一个表中的记录建立备份时，这种形式的INSERT 语句是非常有用的。在删除一个表中的记录之前，你可以先用这种方法把它们拷贝到另一个表中。

如果你需要拷贝整个表，你可以使用SELECT INTO 语句。例如，下面的语句创建了一个名为newtable的新表，该表包含表mytable的所有数据： _复制内容到剪贴板_ 代码:`SELECT * INTO newtable FROM mytable `你也可以指定只有特定的字段被用来创建这个新表。要做到这一点，只需在字段列表中指定你想要拷贝的字段。另外，你可以使用WHERE 子句来限制拷贝到新表中的记录。下面的例子只拷贝字段second_columnd的值等于’Copy Me!’的记录的first_column字段。 _复制内容到剪贴板_ 代码:`SELECT first_column INTO newtable
FROM mytable
WHERE second_column=’Copy Me!’ `使用SQL修改已经建立的表是很困难的。例如，如果你向一个表中添加了一个字段，没有容易的办法来去除它。另外，如果你不小心把一个字段的数据类型给错了，你将没有办法改变它。但是，使用本节中讲述的SQL语句，你可以绕过这两个问题。

例如，假设你想从一个表中删除一个字段。使用SELECT INTO 语句，你可以创建该表的一个拷贝，但不包含要删除的字段。这使你既删除了该字段，又保留了不想删除的数据。

如果你想改变一个字段的数据类型，你可以创建一个包含正确数据类型字段的新表。创建好该表后，你就可以结合使用UPDATE语句和SELECT 语句，把原来表中的所有数据拷贝到新表中。通过这种方法，你既可以修改表的结构，又能保存原有的数据。
