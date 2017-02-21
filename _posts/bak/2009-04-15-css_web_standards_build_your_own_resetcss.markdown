---
author: yupinglu
comments: true
date: 2009-04-15 13:34:00+00:00
layout: post
slug: css_web_standards_build_your_own_resetcss
title: 'WEB标准之CSS: 打造自己的reset.css'
wordpress_id: 74
categories:
- 前端
tags:
- CSS
---

每每有新项目，[第一步就是应当使用一个reset.css来重置样式](http://www.qianduan.net/?p=5539)。滥用不如不用，直接拿个现成的reset.css过来将导致后期各种离奇bug的发生。

所以最好还是自己写一个reset.css，并且要明白每一条 reset都是用来做什么的。

reset.css本意就是重置样式，我始终建议把.clearfix放入layout.css,而把h1、h2之类的定义放进typography.css。

具体如何规划网站CSS结构，不在文本讨论之列，可以参考Smashing Magazine上的[文章](http://www.smashingmagazine.com/2008/05/02/improving-code-readability-with-css-styleguides/)，国内有差强人意的[中文译版](http://www.webjx.com/css/divcss-7054.html)。

注意，本文把reset分成了两个部分，一个是纯reset.css，可以用于任何项目。另一个是用于特定项目的“reset”，自定义修改的内容，这些内容可以放在layout.css、typography.css之类的文件中，他们共同导入到一个base.css形成一个项目的基础样式。

本文就是来介绍如何写一个合适所有项目的通用的reset.css，以及介绍在设置玩reset.css之后需要针对不同项目要首先要设置的内容。

**1，基础**
牛顿是站在巨人伽利略的肩膀上的，我们也可以这么做。首先我们要选定一个前进的基础。
请永远不要使用



	
  1. * { margin: 0; padding: 0; }


这问题太多了，在此不多加表述。

目前比较流行的有[Eric Meyer](http://meyerweb.com/eric/thoughts/2007/04/14/reworked-reset/)的重置样式和[YUI](http://developer.yahoo.com/yui/reset/)的重置样式。另有[Condensed Meyer Reset](http://perishablepress.com/press/2007/10/23/a-killer-collection-of-global-css-reset-styles/)简化Eric Meyer的样式。有趣的是，Eric的重置样式也是[源于YUI的](http://meyerweb.com/eric/thoughts/2007/04/12/reset-styles/)。而那份简化版又把Eric的样式简化回YUI的样式了 。但同时，糟糕的是，网上流传的比较广的(尤其是国内)都不是最新的版本。

上面两个页面里直接看到的都不是最新的，Eric专门为有一个[reset.css页面](http://meyerweb.com/eric/tools/css/reset/index.html)。而YUI当前版本(2.7.0)的reset.css[实际地址](http://yui.yahooapis.com/2.7.0/build/reset/reset.css)里，比上面的页面中还多一些东西。此外，我们还可以基于一些常见的框架，比较著名的比如[Blueprint](http://www.blueprintcss.org/)或者[Elements CSS Framework](http://elements.projectdesigns.org/)（这个的reset也是源自于Eric Meyer的）。

OK，准备工作就差不多了。以上这些都可以作为参考资料来组织我们自己的reset。我这里主要采用YUI，兼带Eric的reset。

**2，默认色彩**
对于页面是不是有默认背景色和前景色，YUI和Eric有着不同的看法。
YUI重置背景色为白色而文字颜色为黑色。



	
  1. html {

	
  2. color: #000;

	
  3. background: #FFF;

	
  4. }


而Eric在当前最新版中让所有颜色为透明，他认为透明才是最原始的颜色。虽然他曾[一度认为](http://meyerweb.com/eric/thoughts/2007/05/01/reset-reloaded/)也应当设置白色背景色、黑色文字颜色。至于最后为什么改了，Eric并没有给出具体理由。

这个问题我基本认为是用户自定义的更重要还是你的设计更重要的问题。我个人的观点是，如果你的设计本身就是白色背景，那么不要设置背景。一小部分中高水平的用户，他们会自定义网页默认背景色。

设置成他们喜欢的背景色，比如浅蓝色。基本常见的浏览器都提供了这个简单的功能。而我们的背景色重置则会破坏用户的选择——尽管这样能保证你的设计原汁原味的呈现给所有用户。当然我知道，更高端的用户会用Stylish之类的Firefox扩展来自定义页面。

但不得不说，只会用“选项”来调背景色的用户更多，不是么？而同时，如果设计本身就有其他背景色，比如黑色、蓝色、绿色之类的，OK，这些设计当然可以设置背景色。但请不要放进reset.css里。这里是重置样式的地方，不是你设计的地方。请把你的设计放在更广袤的土地上。

所以，简单说来，NO，不要在reset中设置背景色。

那么，文字颜色呢？原则上来说，也是不应该设置文字颜色的。但是IE中的表单元素中legend这个对象比较特别，跟主题结合的比较紧密。legend会默认有自己的颜色（跟当前的主题有关）而不会继承父元素的颜色（即便设了color:inherit;）。

从某些角度来说，可以想当然地认为设置字体颜色人数远小于设置背景色的人数；以及认为就算设置了背景色，人们看到legend元素是黑色的也不会觉得奇怪。因此，YUI在其reset中设置了legend {color: #000;}是无可厚非的。

但反过来说，把这个放到typography.css或者form.css里岂不是更好？不同的页面设计，其对legend的色彩要求很可能是不同的，放在reset.css里重复定义是没有必要的。因此这条CSS规则可以作为在reset.css之后首先应当设置的规则。

**3，padding和margin**
曾经一度流行的`* { margin: 0; padding: 0; }`也就是出于这个目的。让各个元素的padding和margin都归零，尤其是那些h1和p以及ul/ol/li之类的元素，还有，body本身也是有margin的。清除元素的padding和margin是很有用的。
YUI这样做：



	
  1. body, div, dl, dt, dd, ul, ol, li,

	
  2. h1, h2, h3, h4, h5, h6, pre, code,

	
  3. form, fieldset, legend, input, button,

	
  4. textarea, p, blockquote, th, td {

	
  5. margin: 0;

	
  6. padding: 0;

	
  7. }


而Eric这样做：

	
  1. html, body, div, span, applet, object, iframe,

	
  2. h1, h2, h3, h4, h5, h6, p, blockquote, pre,

	
  3. a, abbr, acronym, address, big, cite, code,

	
  4. del, dfn, em, font, img, ins, kbd, q, s, samp,

	
  5. small, strike, strong, sub, sup, tt, var,

	
  6. b, u, i, center,

	
  7. dl, dt, dd, ol, ul, li,

	
  8. fieldset, form, label, legend,

	
  9. table, caption, tbody, tfoot, thead, tr, th, td {

	
  10. margin: 0;

	
  11. padding: 0;

	
  12. border: 0;

	
  13. outline: 0;

	
  14. font-size: 100%;

	
  15. vertical-align: baseline;

	
  16. background: transparent;

	
  17. }


可以看到，Eric把几乎所有的元素都写上了规则。而YUI只把有padding和margin的元素清空样式，而其他元素则不动。我个人比较偏好 YUI的做法，因为他这样可以避免给一些无关元素带上不必要的样式。导致元素过多时的性能下降。但Eric的也有可取之处，他这样写，整个 reset.css可以小上不少字节。对服务器的压力会小一些。你怎么用呢？看你自己喜好了。

**4，边框**
YUI里：



	
  1. fieldset, img {

	
  2. border: 0;

	
  3. }

	
  4. abbr, acronym {

	
  5. border: 0;

	
  6. font-variant: normal;

	
  7. }


Eric已经在上一条中把所有的边框都清掉了，还是推荐用YUI的，理由同上。

**5，外边框**
这个就是元素获取焦点时的虚线框，在ie之外的浏览器上可以像下面Eric做的那样，通过设置outline来消除。



	
  1. /* remember to define focus styles! */

	
  2. :focus {

	
  3. outline: 0;

	
  4. }


而YUI则没有设置这一条。而在Eric的样式中，可以看到Eric的提醒：务必重新定义获取焦点后的样式！
这点其实很重要，出于可访问性的角度出发，那些不便于使用鼠标的人基本上都是用tab导航来浏览网页的。获取焦点的元素有特定样式的话可以极大帮助这类群体的用户。

从通用性角度来说，YUI那样不加这条比较好，毕竟没多少人会自定义焦点样式。但从一个reset.css来说，应当还是加上去比较好。毕竟是为了重置所有样式而写的reset.css，不能留下缺憾。因此这条可以作为reset.css之后及早定义的规则。

**6，字体样式(font style/weight/size/variant)**
YUI里，分成了多条：



	
  1. address, caption, cite, code, dfn,

	
  2. em, strong, th, var, optgroup {

	
  3. font-style: inherit;

	
  4. font-weight: inherit;

	
  5. }

	
  6. 
	
  7. h1, h2, h3, h4, h5, h6 {

	
  8. font-size: 100%;

	
  9. font-weight: normal;

	
  10. }

	
  11. abbr, acronym {

	
  12. border: 0;

	
  13. font-variant: normal;

	
  14. }

	
  15. 
	
  16. input, button, textarea,

	
  17. select, optgroup, option {

	
  18. font-family: inherit;

	
  19. font-size: inherit;

	
  20. font-style: inherit;

	
  21. font-weight: inherit;

	
  22. }

	
  23. 
	
  24. /*@purpose To enable resizing for IE */

	
  25. /*@branch For IE6-Win, IE7-Win */

	
  26. input, button, textarea, select {

	
  27. *font-size: 100%;

	
  28. }


Eric则在他最终版的reset中去掉了关于这些的样式重置，只保留了 `font-size: 100%;` 同样他没有给出具体理由。
但通常情况下，我认为还是重置一下这些样式好，比如strong元素，很多时候只是语义而已，并非希望他真的加粗。可能会有背景色或者其他方式来强调。

而之所以这里都用了inherit这个继承属性而不是定义 `font-weight: normal;` 可以在 Eric 先前的[reset文章](http://meyerweb.com/eric/thoughts/2007/04/14/reworked-reset/)中看到。这是为了防止——父元素字体加粗了，而没有一个子元素继承加粗属性（因为设置了normal）——这种情况的发生。

此外，对于h1-h6的字体大小定义，建议放到专门的typography.css里，不建议放在reset.css里。所以这里我同样倾向于用YUI的策略，全部重置。

**7，行高(line-height)**
对于行高，YUI并没有给出重置定义，而Eric则给出了重置：



	
  1. body {

	
  2. line-height: 1;

	
  3. }


行高默认所有元素都会继承的，所以给body设置行高为1就足够了。通常行高设为1时候，英文照常阅读，但中文就无法阅读了，行间距过于紧密导致容易看错行。通常在中文环境下得设置1.4到1.5才能是用户正常阅读。

我建议是1.5，这样算出来的值也是整数。比如字体大小12px的时候行高是 18px，字体大小16px时行高24px。看起来也会比较舒服。

**8，列表样式**
YUI用了：



	
  1. li {

	
  2. list-style: none;

	
  3. }


Eric用了：

	
  1. ol, ul {

	
  2. list-style: none;

	
  3. }


尽管我没有测试出YUI的有什么问题，但我始终觉得设置ol和ul会比较稳妥。而且，波及的元素更少，性能应该更高一点。虽然下载量会多3字节。

**9，表格元素**
在表格方面，都比较统一。均是：



	
  1. /* tables still need 'cellspacing="0"' in the markup */

	
  2. table {

	
  3. border-collapse: collapse;

	
  4. border-spacing: 0;

	
  5. }


Eric还提醒到，需要在html中设置cellspacing=”0″ 来达到完美重置效果~
但此外YUI还设置了

	
  1. caption, th {

	
  2. text-align: left;

	
  3. }


让caption和th元素不要居中。作为重置，是可取的。建议添加此规则。

**10，上下标以及baseline**
YUI写成



	
  1. sup {

	
  2. vertical-align: baseline;

	
  3. }

	
  4. 
	
  5. sub {

	
  6. vertical-align: baseline;

	
  7. }


似乎没有优化，不知道为何没有写到一起去。而Eric则在最开始那条中就已经定义。而其中的问题是，YUI这样定义了，但没有重置字体大小，这点是有所遗憾的。既然是重置样式，就彻底一些，所以建议改成这样的：

	
  1. sup, sub {

	
  2. font-size: 100%;

	
  3. vertical-align: baseline;

	
  4. }


同样对于Eric把所有元素都放到了Baseline上，包括上标下标。Eric的[解释](http://meyerweb.com/eric/thoughts/2007/04/14/reworked-reset/)是，强制让设计师精确定位这些元素的垂直偏移。

**11，插入和删除(ins/del)**
对于这个问题，YUI直接清除了ins的下划线和del的删除线这两个文本装饰：



	
  1. del, ins {

	
  2. text-decoration: none;

	
  3. }


而Eric保留了删除线：

	
  1. /* remember to highlight inserts somehow! */

	
  2. ins {

	
  3. text-decoration: none;

	
  4. }

	
  5. del {

	
  6. text-decoration: line-through;

	
  7. }


如何取舍？我选择Eric的，为什么我这里不追求完美的样式重置了呢？很简单，我这个reset的目标是为了让我们写页面的时候尽量避免浏览器默认样式，以及不同浏览器之间默认样式差异带来的问题。而del元素删除线的文本装饰，我相信没有人会反对的。有人会加上其他样式，比如字体变淡之类的，但对于del如此强语义的元素来说，没有什么比用删除线更能表达含义的了。而不像上面那个focus样式，未必人人喜欢虚线框。
所以，这里我考虑采纳Eric的重置样式。同时别忘了给ins元素在等下也添加一些样式。

**12，引用元素的引号**
某些浏览器中，q或者blockquote前后会出现引号。这个并不是谁都喜欢的。所以需要重置他。
YUI的比较简单，只重置了q：



	
  1. q:before,

	
  2. q:after {

	
  3. content: '';

	
  4. }


而Eric则比较周到，把q和blockquote都重置了。

	
  1. blockquote, q {

	
  2. quotes: none;

	
  3. }

	
  4. blockquote:before, blockquote:after,

	
  5. q:before, q:after {

	
  6. content: '';

	
  7. content: none;

	
  8. }


OK，就决定用Eric的了，对于样式重置，细致一点周到一点总没有错。

今天太晚了，已经四点了，等会睡觉起床接着更新我用的reset.css，以及写完reset.css后立即需要写的几个规则。
