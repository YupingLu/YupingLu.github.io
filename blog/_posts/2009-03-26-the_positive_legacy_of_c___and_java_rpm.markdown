---
author: yupinglu
comments: true
date: 2009-03-26 06:23:00+00:00
layout: post
slug: the_positive_legacy_of_c___and_java_rpm
title: The Positive Legacy of C++ and Java（转）
wordpress_id: 70
categories:
- C++
- JAVA
tags:
- C++
- JAVA
---

That said, I hardly ever use C++ anymore. When I do, it's either examining legacy code, or to write performance-critical sections, typically as small as possible to be called from other code (my preferred approach is to quickly write an app in Python, then profile it and if necessary improve performance by calling small portions of C++ using Python's **ctypes** library).

Because I was on the C++ Standards Committee, I saw these decisions being made. They were all extremely carefully considered, far more so than many of the decisions made in Java.

However, as people have rightly pointed out, the resulting language was complicated and painful to use and full of weird rules that I forget as soon as I'm away from it for a little while -- and I figured out those rules from first principles while I wrote books, not just by memorizing them.

To understand how the language can be both unpleasant and complicated, and well designed at the same time, you must keep in mind the primary design decision upon which everything in C++ hung: compatibility with C. Stroustrup decided -- and correctly so, it would appear -- that the way to get the masses of C programmers to move to objects was to make the move transparent: to allow them to compile their C code unchanged under C++. This was a huge constraint, and has always been C++'s greatest strength ... and its bane. It's what made C++ as successful as it was, and as complex as it is.

It also fooled the Java designers who didn't understand C++ well enough. For example, they thought operator overloading was too hard for programmers to use properly. Which is basically true in C++, because C++ has both stack allocation and heap allocation and you must overload your operators to handle all situations and not cause memory leaks. Difficult indeed. Java, however, has a single storage allocation mechanism and a garbage collector, which makes operator overloading trivial -- as was shown in C# (but had already been shown in Python, which predated Java). But for many years, the partly line from the Java team was "Operator overloading is too complicated." This and many other decisions where someone clearly didn't do their homework is why I have a reputation for disdaining many of the choices made by Gosling and the Java team.

There are plenty of other examples. Primitives "had to be included for efficiency." The right answer is to stay true to "everything is an object" and provide a trap door to do lower-level activities when efficiency was required (this would also have allowed for the hotspot technologies to transparently make things more efficient, as they eventually would have). Oh, and the fact that you can't use the floating point processor directly to calculate transcendental functions (it's done in software instead). I've written about issues like this as much as I can stand, and the answer I hear has always been some tautological reply to the effect that "this is the Java way."

When I wrote about how badly generics were designed, I got the same response, along with "we must be backwards compatible with previous (bad) decisions made in Java." Lately more and more people have gained enough experience with Generics to see that they really are very hard to use -- indeed, C++ templates are much more powerful and consistent (and much easier to use now that compiler error messages are tolerable). People have even been taking reification seriously -- something that would be helpful but won't put that much of a dent in a design that is crippled by self-imposed constraints.

The list goes on to the point where it's just tedious. Does this mean Java was a failure? Absolutely not. Java brought the mainstream of programmers into the world of garbage collection, virtual machines and a consistent error handling model (especially if you subtract checked exceptions, which is possible using techniques I show in _Thinking in Java, 4e_). With all its flaws, it moved us up a level, to the point where we are now ready for higher-level languages.

At one point, C++ was the leading language and people thought it would always be so. Many think the same about Java, but Java has made it even easier to replace itself, because of the JVM. It's now possible for someone to create a new language and have it run as efficiently as Java in short order; Previously, getting a correct and efficient compiler took most of the development time for a new language.

And we are seeing this happen -- both with higher-level static languages like Scala, and with dynamic languages, both new and ports, like Groovy, JRuby and Jython. This is the future, and the transition is much smoother because you can easily use these new languages in conjunction with existing Java code, and you can rewrite bottlenecks in Java if necessary.

Java itself will diminish, just as C++ did, to be used in special cases (or perhaps just to support legacy code, since it doesn't have the same connection to hardware as C++ does). But the unintentional benefit, the true accidental brilliance of Java is that it has created a very smooth path for its own replacements, even if Java itself has reached the point where it can no longer evolve. All future languages should learn from this: either create a culture where you can be refactored (as Python and Ruby have done) or allow competitive species to thrive.

by Bruce Eckel
March 14, 2009
