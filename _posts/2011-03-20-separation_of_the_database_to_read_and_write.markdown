---
author: yupinglu
comments: true
date: 2011-03-20 01:54:00+00:00
layout: post
slug: separation_of_the_database_to_read_and_write
title: 数据库的读写分离
wordpress_id: 198
categories:
- Database
tags:
- Database
---

如何提高大型网站的访问速度,根据理解和经验一般常用的方法如SQL优化、缓存、集群等等，NewEgg的专家提示说做过大型网站的话应该知道数据库读写分离的。

读写分离（Read/WriteSplitting）”，基本的原理是让主数据库处理事务性查询，而从数据库处理SELECT查询。数据库复制被用来把事务性查询导致的变更同步到集群中的从数据库。

对于大访问量的网站，一般会采用读写分离，比如ebay的读写比率是260：1，也就是大型的电子商务网站的。

网上看到说采用读写分离有如下工具：
1，oracle的logical standby
2, Quest公司的SharePlex
3, DSG公司的RealSync

MySQLReplication可以将master的数据复制分布到多个slave上，然后可以利用slave来分担master的读压力。那么对于前台应用来说，就要考虑如何将读的压力分布到多个slave上。如果每个应用都需要来实现读写分离的算法，一则成本太高，二来如果slave增加更多的机器，应用就要随之修改。明显的，如果在应用和数据库间加一个专门用于实现读写分离的中间层，则整个系统的架构拥有更好的扩展性。MySQLProxy就是这么一个中间层代理，简单的说，MySQLProxy就是一个连接池，负责将前台应用的连接请求转发给后台的数据库，并且通过使用lua脚本，可以实现复杂的连接控制和过滤，从而实现读写分离和负载平衡。对于应用来说，MySQLProxy是完全透明的，应用则只需要连接到MySQLProxy的监听端口即可。当然，这样proxy机器可能成为单点失效，但完全可以使用多个proxy机器做为冗余，在应用服务器的连接池配置中配置到多个proxy的连接参数即可。
