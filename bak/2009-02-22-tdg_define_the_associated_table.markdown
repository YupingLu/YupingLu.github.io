---
author: yupinglu
comments: true
date: 2009-02-22 12:09:00+00:00
layout: post
slug: tdg_define_the_associated_table
title: 【TDG】定义关联表
wordpress_id: 61
categories:
- Database
tags:
- Database
---

$belongsTo

定义从属关联

1、外键放置在主表中；
2、保存时不会自动更新关联表的记录；
3、删除时也不会更新关联表的记录。

示例：
多个文章都属于某一个栏目。

格式一：

* class Articles
* {
*      var $belongsTo = array(
*          array(
*              'tableClass' => 'Columns',
*              'foreignKey' => 'column_id',
*              'mappingName' => 'column'
*          ),
*      );
* }

在上面的格式中，foreignKey 表示在当前表中用什么字段存储对关联表的主键引用。
mappingName 表示在主表的返回结果中，以什么名字保存关联表的数据。
如果不提供 mappingName 参数，则假定使用 tableClass。

格式二：

* class Articles
* {
*      var $belongsTo = 'Columns';
* }

格式二是一种简化写法。foreignKey 字段名将和关联表的主键字段名相同。

============================

$hasMany

定义一对多关联

1、外键保存在关联表中；
2、保存时自动更新关联表的记录；
3、删除主表记录时自动删除关联记录。

示例：
每个用户（user）有多张订单 order。

格式一：

* class Users
* {
*      var $hasMany = array(
*          array(
*              'tableClass' => 'Orders',
*              'foreignKey' => 'user_id',
*              'mappingName' => 'orders',
*          ),
*      );
* }

在一对多关系中，当前表并不包含对关联表的主键引用。
而是在关联表中保存对当前表的主键引用。
在上面的格式中，foreignKey 指示在关联表中用什么字段存储对当前表的主键引用。
mappingName 表示在主表的返回结果中，以什么名字保存关联表的数据。
如果不提供 mappingName 参数，则假定使用 tableClass。

格式二：

* class Users
* {
*      var $hasMany = 'Orders';
* }

简化写法中，foreignKey 字段名将和当前表的主键字段名相同。

============================

$hasOne

定义一对一关联
1、外键放置在关联表中；
2、保存时如果有关联对象，则自动创建或更新关联表的记录；
3、删除主表记录时自动删除关联记录。

示例：
当前表为 users，用于存储用户账户。而每个用户账户有且只有一个对应的个人信息（profile）记录。

格式一：

* class Users
* {
*      var $hasOne = array(
*          array(
*              'tableClass' => 'Profiles',
*              'foreignKey' => 'profile_id',
*              'mappingName' => 'profile',
*          ),
*      );
* }

在上面的格式中，foreignKey 表示在关联表中用什么字段存储对主表的主键引用。 mappingName 表示在主表的返回结果中，以什么名字保存关联表的数据。 如果不提供 mappingName 参数，则假定使用 tableClass。

格式二：

* class Users
* {
*      var $hasOne = 'Profiles';
* }

格式二是一种简化写法。foreignKey 字段名将和主表的主键字段名名相同。

============================

$manyToMany

定义多对多关联

1、外键保存在中间表里面；
2、保存时自动更新中间表；
3、删除主表记录时自动删除中间表的相关记录。

示例：
每个成员（member）可以拥有多个角色（role），而每个角色也可以指定给多个成员。

格式一：

* class Members
* {
*      var $manyToMany = array(
*          array(
*              'tableClass'      => 'Roles',
*              'joinTable'       => 'member_roles',
*              'foreignKey'      => 'member_id',
*              'assocforeignKey' => 'role_id',
*              'mappingName'     => 'roles',
*          ),
*      );
* }

在多对多关系中，当前表并不包含对关联表的主键引用。
而是在一个中间表里面保存对当前表和关联表的主键引用。
在上面的格式中，joinTable 表示中间表的名字。foreignKey 和
assocforeignKey 分别表示在中间表里面用什么字段存储对主表和
关联表主键字段的引用。

mappingName 表示在主表的返回结果中，以什么名字保存关联表的数据。
如果不提供 mappingName 参数，则假定使用 tableClass。

格式二：

* class Members
* {
*      var $manyToMany = 'Roles';
* }

简化写法中，foreignKey 字段名将和当前表的主键字段名相同。
assocforeignKey字段名称则和关联数据表的主键字段名相同。
而中间表名称将用FLEA_Db_TableDataGateway::getMidtableName() 方法计算。
