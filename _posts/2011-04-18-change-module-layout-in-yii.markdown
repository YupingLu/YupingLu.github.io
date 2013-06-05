---
author: yupinglu
comments: true
date: 2011-04-18 07:01:45+00:00
layout: post
slug: change-module-layout-in-yii
title: change module layout in Yii
wordpress_id: 94
categories:
- PHP
tags:
- php
- Yii
---

public function init()
    {
        // import the module-level models and components
        $this->setImport(array(
            'administrator.models.*',
            'administrator.components.*',
        ));
    
        $this->layout = 'admin';
    }


when this method is not working for you, you have two ways to solve this problem:
1   **try forcing it (AdminModule)**

    
    public function beforeControllerAction($controller, $action)
      {
        if(parent::beforeControllerAction($controller, $action))
        {
          // this overwrites everything in the controller
          $controller->layout = 'admin';
          // this method is called before any module controller action is performed
          // you may place customized code here
          return true;
        }
        else
          return false;
      }


2  ** try removing $layout in Controller.php under components.**
