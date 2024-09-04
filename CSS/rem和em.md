https://engageinteractive.co.uk/blog/em-vs-rem-vs-px#ref-2

# EM vs REM vs PX – Why you shouldn't “just use pixels”

The debate has been had many times - what units of measurement should we use in our CSS?

> 关于在CSS中应该使用什么度量单位的争论已经有很多次了

We, like many others[[1](https://engageinteractive.co.uk/blog/em-vs-rem-vs-px#ref-1)][[2](https://engageinteractive.co.uk/blog/em-vs-rem-vs-px#ref-2)], were ready to ditch REMs and return to the beloved pixel. We lost track of why we adopted the use of REMs in the first place. The problem doesn’t just revolve around font-sizes - it’s also about accessibility.

>  **我们一开始就迷失了使用rem的原因。这个问题不仅仅是围绕着字体大小——它还涉及到可访问性。**

TL;DR:

- Pixels are ignorant(无知的，愚昧的), don’t use them.
- Use REMs for sizes and spacing.
- Use EMs for media queries.

## Pixels

Pixels (px) are what we’ve all become accustomed to over the years. Everyone knows what a pixel is (although the size of a pixel isn’t always the same, but that’s for another day). Everyone is comfortable with using pixels. They’re easily translatable（adj. 可译的；能译的；可转移的）. Designers typically work in pixels, so it’s easy to take sizes directly from Photoshop straight in to build.

So what’s wrong with pixels?

### Accessibility

I’m a big advocate of accessibility on the web. I’d take accessibility over “pretty” any day.

> 我是网络可访问性的大力倡导者。我觉得通俗易懂比漂亮更重要。

If you’re setting all of your font-sizes, element sizes and spacing in pixels, you’re not treating the end user with respect.

In most browsers, a user can set their default browser font-size to be a different size to the default (typically 16px). If the user sets their default to 20px, all font-sizes should scale accordingly.

However, if the website explicitly sets font-sizes in pixels, a heading set at 30px will always be 30px. That might sound great from a designer/developer point of view - but you’re not the user, stop making websites for yourself.

当用了px/rem后，用户在修改浏览器设置，更换字号时（不是网页缩放时），并不会引起页面字体大小的改变

Thankfully, setting font-sizes in pixels doesn’t completely ruin accessibility. The user can still zoom in and out with ctrl plus +/- (cmd instead of ctrl on OS X). However, we can do better.

## REMs

If you’re in any way familiar with the web design world, you will undoubtedly have heard of REMs. If you’re not, REMs are a way of setting font-sizes **based on the font-size of the root HTML element**. They also allow you to quickly scale an entire project by changing the root font-size (for example at a certain media query/screen size).

*“[The REM] unit represents the font-size of the root element (e.g. the font-size of the <html>element). When used on the font-size on this root element, it represents its initial value.”*[[3](https://engageinteractive.co.uk/blog/em-vs-rem-vs-px#ref-3)]

### How to calculate PX from REM

A basic and most common example: html font-size is set to 10px, paragraph is set to 1.6rem - 1.6rem * 10px = 16px.

Setting a root font-size of 10px is the most common scenario when I see people using REMs. It allows for a quick conversion between pixel values to REM values simply by dividing the number by 10.

However, setting the base font-size in pixels still has the same problem as the pixel example above. Accessibility overridden.

While REMs certainly have their uses, I’m willing to bet that most people use REMs because they are seen as cooler than pixels. I rarely see a project where someone actually changes the root HTML font-size depending on screen size; and rightfully so. Unless you’ve got a very typographically heavy design, you’re unlikely to want to scale everything at once.

### So how can we un-break our accessibility faux pas?

那么我们如何才能改正我们的易访问性错误呢?

Set the root HTML font-size as a percentage.

> !!! That’s a percentage of the user’s default browser font-size. 

A typical method is to set the HTML font-size to 62.5%. That’s because 62.5% of 16px (typical default browser font-size) is 10px. That would still make 1.6rem = 16px. This now means that if the user’s default browser font-size is changed to, for example, 20px, 1.6rem would now equal 20px. So if your user wants bigger fonts, let them. Happy designer. Happy developer. All numbers are still easy to work with.

The ideal scenario would be to leave the HTML font-size as 100%, but that does make the maths a little bit harder. For example, 16px is now 1rem, 20px is 1.25rem, 24px is 1.5rem etc.

### Sass/SCSS to the rescue

Working all of these numbers out in your head would be pretty time consuming. Thankfully, if you use Sass/SCSS, LESS, or any other CSS pre-processor, you shouldn’t worry. You can use functions to calculate these things for you

## What about EMs?

EMs perform initially in a similar fashion to REMs, until it comes to nesting. 

> EMs最初以类似于rem的方式执行，直到出现嵌套。

I’ve never been a fan of EMs, especially when it comes to font-sizes. For example, take a div with a font-size of 2em, then add a paragraph with a font-size of 2em. The font-size of that paragraph is now 2ems relative to the div. I quickly lose track of the maths and what size is what, and it quickly becomes unmanageable. This is what REMs solve - the size always refers back to the root.

## What about media queries?

So we’ve established that using ==pixel values overrides browser default settings==, so simply converting all pixel sizes to REMs is the best thing to do, right? Not quite.

This blog post highlights some of the key the differences between using pixels, EMs and REMs in media queries (https://zellwk.com/blog/media-query-units/). Go have a read and then come back.

# PX, EM or REM Media Queries?

Have you wondered if you should use `px`, `em` or `rem` for media queries? I had the same question too, and I never figured it out, not till now.

> 你是否想过在媒体查询中应该使用px、em或rem ?

When I first created the [mappy-breakpoint](https://github.com/zellwk/mappy-breakpoints) library over a year ago, I used rem units. Then [after a conversation](https://github.com/at-import/breakpoint/issues/132) with Sam Richard, I quickly switched to em instead because I found out there isn’t a difference between the two.

In addition to `em` and `rem`, a popular unit of choice for media queries is the good old pixel. I wondered if it’s possible to use pixel queries nowadays since px-zooming problem that used to exist was now resolved by all browsers.

> 以前存在的像素缩放问题具体是什么问题？？？

This week, I finally decided to get to the bottom of this matter.

Before we begin this article, I’m assuming that you already know what `em` and `rem` units are. Check [this article](https://zellwk.com/blog/rem-vs-em/) out if you don’t.

## The Base Experiment

I thought of creating three separate `<div>` elements, one for `px`, one for `em` and one for `rem`. I gave each `<div>` a background color so it becomes easy to tell them apart.

```css
.pixel { background: red; }
.em { background: green; }
.rem { background: blue; }
```

Next, I created a `min-width` query on all three selectors since we’re comparing the media query units.

When the query kicks in, I decided to decrease the opacity of the element so I can see the difference immediately. Here’s the CSS for the pixel-based media query:

```css
.pixel {
  background: red;
  @media (min-width: 400px) {
    opacity: 0.5
  }
}
```

@media 可以针对不同的屏幕尺寸设置不同的样式，特别是如果你需要设置设计响应式的页面，@media 是非常有用的。

The next step is to figure out how to create the `em` and `rem` units.

**In this first experiment, I wanted to test if there were differences between the three units if all conditions were ideal**. In other words, none of the following scenarios has happened:

1. ==`font-size` changed in `<html>`==
2. ==user zoomed in.==
3. ==user changed their browser’s font setting.==

Since the conditions are ideal at this point, I can safely assume that `16px`, `1em` and `1rem` are equal. `400px`, then, is equivalent to `25em` or `25rem`.

```css
.pixel {
  background: red;
  @media (min-width: 400px) {
    opacity: 0.5
  }
}

.em {
  background: green;
  // 400 ÷ 16 = 25
  @media (min-width: 25em) {
    opacity: 0.5
  }
}

.rem {
  background: blue;
  // 400 ÷ 16 = 25
  @media (min-width: 25rem) {
    opacity: 0.5
  }
}
/* 这个代码不生效，要换成下面的 */
```

```css
.pixel {
  height: 100px;
  background: red;
}
@media (min-width: 600px) {
  .pixel {
    opacity: 0.5
  }
}

.em {
  height: 100px;
  background: green;
}
@media (min-width: 37.5em) {
  .em {
    opacity: 0.5
  }
}

.rem {
  height: 100px;
  background: blue;
}
@media (min-width: 37.5rem) {
  .rem { 
    opacity: 0.5
  }
}
```

**If all three media queries behave in the same manner, we should see all of them trigger at 400px exactly.**

And they did (on every browser I tested).

![control](/Users/chenmeifang/Desktop/typora/图片/control.gif)

Since all three media queries kicked in at the same breakpoint, we know that **there’s no difference between `px`, `em` or `rem` queries at this stage**.

After establishing the base experiment, the next step is to test for less ideal conditions where any of the scenarios above occurred. Once again, the scenarios are:

1. `font-size` changed in `<html>`
2. user zoomed in.
3. user changed their browser’s font setting.

Let’s go through them one by one.

## 1. Font-size Changed in HTML

==The first scenario is incredibly common. In fact, almost all web pages use this method set the default `font-size` property in their CSS:== yes！！！！！！that's right！！！

```css
html {
  // setting default font size
  font-size: 200%
}
```

Here, I chose to use a `font-size` of 200% in my test, which means that I’m setting both `1em` and `1rem` as `32px`. **If `em` and `rem` are affected by this change in `font-size`, they should only trigger at `800px`**

Here’s the result: Chrome, Firefox and IE 11 triggered all three media queries at 400px:

![chrome](/Users/chenmeifang/Desktop/typora/图片/chrome.gif)

This is the correct behavior. ==**`em` and `rem` units should not be affected by changes in `font-size` in the HTML**== since they’re based on the browser’s internal `font-size` property.

> 这里不理解，html的font-size设置成200%后，1rem和1em对应的值不就变了吗！！！ 

!!!!!==只是在媒体查询中不影响，但是在普通的文字中有影响==

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        p{
            font-size: 1rem;
        }
        html{
            font-size: 200%;
        }
        .pixel {
            height: 100px;
            background: red;
        }
        @media (min-width: 600px) {
            .pixel {
                opacity: 0.5
            }
        }

        .em {
            height: 100px;
            background: green;
        }
        @media (min-width: 37.5em) {
            .em {
                opacity: 0.5
            }
        }

        .rem {
            height: 100px;
            background: blue;
        }
        @media (min-width: 37.5rem) {
            .rem { 
                opacity: 0.5
            }
        }
    </style>
</head>
<body>
    <p>你好</p>
    <div class="pixel"></div>
    <div class="em"></div>
    <div class="rem"></div>    
</body>
</html>
```

Unfortunately, we didn’t get the perfect behavior on ==Safari. It triggered the `rem` media query at 800px==:

![safari-200](/Users/chenmeifang/Desktop/typora/图片/safari-200.gif)

Since this behavior only occurs on Safari, I was curious to see if mobile Safari was affected as well. Turns out, it did.

==So, the first scenario already showed us that we shouldn’t use `rem` media queries.** However, let’s continue to put rem in the rest of our experiments to see if anything else comes up.==

## 2. User Zooms In

The second scenario is common as well. If the text on your page isn’t large enough, **users may choose to use the zoom function built into their browser to enlarge the text.**

A quick note here: The original idea behind `em` based sizes was due to older browsers not being able to update pixel values when a user zooms. In this regard, testing the difference between media query units when a user zooms will help to answer the question on whether we can use `px` based media queries now.

![zoom](/Users/chenmeifang/Desktop/typora/图片/zoom.gif)

The results from this experiment is that Chrome, Firefox and IE showed the same behavior. `px` unit queries fired at the same time as `em` and `rem` queries.

![chrome-zoom](/Users/chenmeifang/Desktop/typora/图片/chrome-zoom.gif)

And you guessed it… Safari didn’t 

> 但是我实际验证的结果不是这样的。在safari浏览器，依旧是同时触发！！！！
>
> 后面再一次验证的时候又不一样了！！！ safari浏览器没有同时触发！！！！

![safari-zoom](/Users/chenmeifang/Desktop/typora/图片/safari-zoom.gif)

==**Unfortunately, this means that pixel based media queries are out of the question**. Safari doesn’t support them properly (unless you decide to forsake Safari?).==

Once again, move on to our final experiment to see if anything unexpected comes up still.

## 3. User Changed Their Browser’s Font Setting.

**Many developers like to believe that [users don’t change their browser’s `font-size`](https://nicolas-hoizey.com/2016/03/people-don-t-change-the-default-16px-font-size-in-their-browser.html) since it’s hidden deeeep inside the settings.**

Well, it’ll be awesome if all users exhibit this behavior because we don’t have to do this experiment! 

Unfortunately, there’s no data to proof that users don’t change their browser’s `font-size`s, so **it’s still our duty as developers to bake the flexibility into our websites.**

- In this experiment, I enlarged the default `font-size` of the four browsers I tested with in the following way (incase you wanted to follow along):
  - **Chrome:** Go to `settings`, `show advanced settings`, `web-content`.
  - **Firefox:** Go to `preferences`, `content`, `fonts and colors`.
  - **Internet Explorer:** Click on `page`, then `text-size`

The only browser I couldn’t figure out where to set the font-size was **Safari**. So I used a proxy instead. I change the settings such that the smallest font-size is larger than 16px. To do so, go to `preferences`, `advanced`, `acessibility`.

**This was the only test that all browsers behaved in the same way:**

![chrome-very-large-font-size](/Users/chenmeifang/Desktop/typora/图片/chrome-very-large-font-size.gif)

As you can see, the pixel queries triggered earlier than `em` or `rem` queries.

There aren’t any bugs here. This is the correct implementation since px are absolute units. The breakpoint should remain at 400px no matter what the user set’s their default `font-size` to.

`em` and `rem`, on the other hand, is based on the `font-size` of the browser. Hence, their media queries should get updated when the user changes their default `font-size` setting.

So… **I’m sorry to break your bubble, pixel fans, but it’s a no-go for pixel based queries**. 😱😱😱

(Here’s a more detailed explanation for people who found this last experiment confusing.)

！！！！下面看不懂了！！！我丢！！！懂了！！

Try to imagine you’ve coded up a website that has a breakpoint at 600px. This 600px breakpoint is perfect for a font-size of 16px (the default).

Let’s call the viewport smaller than 600px the *small viewport*, while that larger than 600px the *medium viewport*.

Let’s further assume that you only changed the layout at 600px. You used a one-column layout below 600px, and a two-column layout above 600px.

Now, change your browser font-size setting to 20px and look at your website at 650px.

If you used `em` or `rem` based media queries, your user would see a one-column layout at 650px. This behavior would be consistent with the first two scenarios.

If you used px based media queries, your user would see a two-column layout at 650px. This behavior would be inconsistent with the above scenarios. (And the design would not fit the screen).

## Concluding The Experiments

As you can see from our tests above, **the only unit that performed consistently across all four browsers is `em`**. There aren’t any differences between `em` and `rem` with the exception of bugs found on Safari.

`px` media queries performed well in two of the three experiments (with the exception of Safari, again). Unfortunately, `px` media queries remained at `400px` in the third experiment, which makes it a no-go if you intend to support users who change their browser’s `font-size` value.

Hence, my conclusion after these experiments is: ==**Use `em` media queries**.==

If you’re using a library that doesn’t do `em` media queries, point the developer to this article so they know the implications of their code. Otherwise, feel free to switch to a `em` based library like [Mappy-breakpoints](https://github.com/zellwk/mappy-breakpoints), [Breakpoint-sass](http://breakpoint-sass.com/) or [sass-mq](https://github.com/sass-mq/sass-mq).

If you enjoyed this article, please tell a friend about it! Share it on [Twitter](https://twitter.com/share?text=PX%2C EM or REM Media Queries%3F by @zellwk 👇 &url=https://zellwk.com/blog/media-query-units/). If you spot a typo, I’d appreciate if you can correct [it on GitHub](https://github.com/zellwk/zellwk.com/blob/master/src/posts/2016-03-17-px-em-rem-media-queries.md). Thank you!

看完另一篇博客回来了！！！！

In summary, both pixels and REMs for media queries fail in various browsers when using browser zoom, and EMs are the best option we have. REMs fail much more than pixels at this point, so we’re going to discount them completely.

It does get a bit more tricky though.

 Both EMs and pixels have their downfalls with media queries when it comes to the difference of a decimal place of that unit. 

> EMs和像素在媒体查询中都有它们的缺点，当涉及到单位的小数点位的差异时。

If you happen to use both min and max width media queries in the same block of code, you’re going to have a bad time as soon as the user starts to change their browser zoom or default font-size.

### Here are some examples:

We use 6 decimal places because certain browsers show no difference between 2-5.d.p.

> 从这里开始看不懂，后面还有一小点点

*For clarity, we’re using a font size of 10px on the body to make the maths a little clearer.*

Example 1: Browser zoom set to 100%, browser width set to 640px





https://www.kancloud.cn/lixu/interview/925585 面试题集合 可以看一下！

# rem可以解决移动端的适配问题

1. 移动端的适配问题具体是怎样的？

   1. 手机端适配 因为市面上各种分辨率 设备宽度不同的 手机太多 这个时候我们可以采用 将
      根元素 字体大小固定的方式 来实现适配 手机端

   2. 就拿750宽度的设计稿来说吧

      > 这段代码十分重要！！！

      ```javascript
      function setRootFontSize() {
      	var width = document.documentElement.clientWidth, fontSize;
      	if (width > 750) { width = 750 }
      	fontSize = (width / 7.5);//这里除于7.5的意思就是100px等于1rem;
      	// document.html.style.fontSize=fontSize+'px';
      	document.getElementsByTagName('html')[0].style['font-size'] = fontSize + 'px';	
      }	
      setRootFontSize();	
      window.addEventListener('resize', function() {
      	setRootFontSize();
      }, false);
      ```

   这样把 font-size 成固定的一个值

   在 750设计稿 上 200px 就是 2rem

   如果设计的页面到了 650的手机上 为了保证页面的显示效果相同

   `**此时的 2rem 在 650宽度额手机上就是 173px会相对的缩小一点**. 这里没理解！！！！？？？？？懂了

   如果还保持　750中的200px 可能会超出屏幕 给用户体验也不太好

   如果在 650宽度的手机测量出来是 200px的话

   计算方式: 650/7.5=200/x x=200*7.5/650 算出来是 x=2.307rem 明显比750大一点

   

2. rem又是如何解决的？

https://yunchong.blog.csdn.net/article/details/104854398

* rem是相对单位 相对于 html根元素　
* em这块是相对于父元素继承来的。em 虽然指的是当前元素的 字体大小 但是当前元素的字体大小没有设置的话 就是继承它的父元素的 字体大

# em的基本使用

`em` 是一种相对单位，主要用于定义字体大小、间距、宽度等 CSS 属性。与像素（px）等绝对单位不同，`em` 单位的值是相对其父元素或当前元素的字体大小计算的。这使得 `em` 在响应式设计中非常有用，因为它允许页面内容根据父元素的大小动态调整。

### `em` 的主要特点：
1. **相对性**：
   - `1em` 等于当前元素的字体大小。例如，如果一个元素的字体大小为16px，那么`1em` 就等于16px。
   - 如果在嵌套元素中使用 `em`，则 `em` 的值是相对于父元素的字体大小。例如，如果父元素的字体大小为20px，而子元素的字体大小设置为`2em`，那么子元素的实际字体大小为40px。

2. **可继承性**：
   - 当 `em` 用于定义字体大小时，它会继承父元素的字体大小，因此在深层嵌套的情况下，`em` 的值可能会变得很大或很小。

3. **灵活性**：
   - `em` 可以用于各种 CSS 属性，例如 `margin`、`padding`、`width`、`height` 等，使得元素的尺寸可以根据字体大小自动调整，从而实现更灵活的布局。

### 使用场景：
1. **响应式设计**：
   - 使用 `em` 单位可以使文本和相关布局根据父元素的字体大小进行调整，从而实现响应式设计。例如，当改变根元素的字体大小时，整个页面的布局可以随着字体大小的变化而变化。

2. **可访问性**：
   - `em` 单位有助于提高网页的可访问性，尤其是在用户调整浏览器的默认字体大小时。使用 `em` 单位可以确保页面内容在不同设备和浏览器设置下的可读性。

### 示例：
```css
/* 设置根元素的字体大小为16px */
html {
  font-size: 16px;
}

/* 子元素相对于根元素 */
.container {
  font-size: 1.5em; /* 24px */
  padding: 1em; /* 24px */
}

/* 更深层嵌套的子元素 */
.child {
  font-size: 2em; /* 48px，相对于 .container 的字体大小 */
  margin-top: 0.5em; /* 24px，相对于 .child 的字体大小 */
}
```

在这个例子中，`.container` 的字体大小为24px（即 `1.5em`），而 `.child` 的字体大小为48px（即 `2em`），并且 `.child` 的 `margin-top` 相对于其自身的字体大小设置为24px（即 `0.5em`）。

### 需要注意的点：
- 当使用 `em` 定义嵌套元素的属性时，可能会因为继承性导致尺寸过大或过小，建议在设计时仔细考虑层级结构。
- 在一些复杂布局中，`em` 的相对性可能会导致不易控制的情况，这时可以考虑使用 `rem` 单位（相对于根元素字体大小）来代替。

通过合理使用 `em` 单位，可以实现更灵活和响应式的网页布局。















