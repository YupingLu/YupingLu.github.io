---
author: yupinglu
comments: true
date: 2011-04-08 08:46:36+00:00
layout: post
slug: connect-yii-mail-extension-to-gmail-server
title: Connect Yii mail extension to gmail server
wordpress_id: 90
categories:
- PHP
tags:
- gmail
- php
- Yii
---

Based on [this](http://www.yiiframework.com/extension/mail/) extension.

1. extract and copy the yii-mail folder to the protected/extensions folder.
2. add mail thingy in main.php at protected/config :






	
  1. // autoloading model and component classes

	
  2. ...

	
  3. 'import'=>array(

	
  4. ..

	
  5. ..

	
  6. 'ext.yii-mail.YiiMailMessage',

	
  7. ),

	
  8. ...

	
  9. 'components'=>array(

	
  10. ...

	
  11. ...

	
  12. 'mail' => array(

	
  13. 'class' => 'ext.yii-mail.YiiMail',

	
  14. 'transportType' => 'smtp', // change to 'php' when running in real domain.

	
  15. 'viewPath' => 'application.views.mail',

	
  16. 'logging' => true,

	
  17. 'dryRun' => false,

	
  18. 'transportOptions' => array(

	
  19. 'host' => 'smtp.gmail.com',

	
  20. 'username' => 'test@gmail.com',

	
  21. 'password' => 'test',

	
  22. 'port' => '465',

	
  23. 'encryption' => 'tls',

	
  24. ),

	
  25. ),

	
  26. ),

	
  27. ...






    
    <em>// autoloading model and component classes
    ...
    'import'=>array(
        ..
        ..
       'ext.yii-mail.YiiMailMessage',
    ),
    ...
    'components'=>array(
     ...
     ...
     'mail' => array(
      'class' => 'ext.yii-mail.YiiMail',
      'transportType' => 'smtp', // change to 'php' when running in real domain.
      'viewPath' => 'application.views.mail',
      'logging' => true,
      'dryRun' => false,
      'transportOptions' => array(
       'host' => 'smtp.gmail.com',  //if not work, try smtp.googlemail.com
       'username' => 'test@gmail.com',
       'password' => 'test',
       'port' => '465',
       'encryption' => 'tls',
      ),
     ),
    ),
    ...</em>


3. enable [OpenSSL](http://au2.php.net/fsockopen) in php configuration.
4. run the example code in your view file:






	
  1. $message = new YiiMailMessage;

	
  2. $message->setBody('Message content here with HTML', 'text/html');

	
  3. $message->subject = 'My Subject';

	
  4. $message->addTo('test@gmail.com');

	
  5. $message->from = Yii::app()->params['adminEmail'];

	
  6. Yii::app()->mail->send($message);



