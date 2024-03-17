# Vue的模板编译『模板-AST树-render-虚拟DOM-真实DOM』

https://www.bilibili.com/video/BV1Rf4y1S7RN

感觉不是我目前能接受的了的！！！

# 1 Vue原型方法扩展技巧 ，rollup基本使用，模版编译过程，AST树基本认知

模版编译完了以后，要拿最终响应式的数据（经过了数据劫持）。

注意：一般开发js小型框架和库，是不会用webpack来打包的

wabpack实际上是工程化打包（项目打包）

**rollup打包工具**：主要打包js

![截屏2021-02-06 下午11.57.41](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-06 下午11.57.41.png)

![截屏2021-02-07 上午12.00.01](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-07 上午12.00.01.png)

![截屏2021-02-07 上午12.27.36](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-07 上午12.27.36.png)

AST && 虚拟dom

虚拟dom是描述dom对象，描述dom节点的

为什么要先从template转化成AST树？
因为template中有可能含有“v-”指令
这些指令虚拟dom中不能有
因为真实dom是真正浏览器能够识别的东西。

![截屏2021-02-07 上午12.39.56](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-07 上午12.39.56.png)

打补丁不懂！！！！

上面五步都是mount函数去做的事情

AST树：

![截屏2021-02-23 下午10.49.50](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午10.49.50.png)

# 2 AST转换相关方法技巧与正则表达式

三种模版，如下：

![截屏2021-02-07 上午10.18.35](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-07 上午10.18.35.png)

如果这三种模版都写，去取的话一定有一个先后顺序

![截屏2021-02-14 上午11.46.37](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-14 上午11.46.37.png)

compileToRenderFunction（）

把模版变成render函数

![截屏2021-02-14 上午11.47.37](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-14 上午11.47.37.png)

compileToRenderFunction（）需要实现第二步和第三步

![截屏2021-02-14 上午11.54.08](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-14 上午11.54.08.png)

----

![截屏2021-02-14 上午11.57.59](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-14 上午11.57.59.png)

![截屏2021-02-07 上午10.54.55](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-07 上午10.54.55.png)

# 3 匹配HTML字符串找出标签，属性和文本

源码：html-parser

```javascript
/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson (MPL-1.1 OR Apache-2.0 OR GPL-2.0-or-later)
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

import { makeMap, no } from 'shared/util'
import { isNonPhrasingTag } from 'web/compiler/util'
// import { unicodeRegExp } from 'core/util/lang'

// Regular Expressions for parsing tags and attributes
// attribute：匹配id="app" id='app' id=app
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
// const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
// ncname:匹配标签名 <my-header></my-header>
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
// const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`

// qnameCapture: 匹配特殊的标签名 <my:header></my:header>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`) 
// const startTagOpen = new RegExp(`^<((?:${ncname}\\:)?${ncname})`) 
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i
// #7298: escape - to avoid being passed as HTML comment when inlined in page
const comment = /^<!\--/
const conditionalComment = /^<!\[/

// Special Elements (can contain anything)
export const isPlainTextElement = makeMap('script,style,textarea', true)
const reCache = {}

const decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
}
const encodedAttr = /&(?:lt|gt|quot|amp|#39);/g
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g

// #5992
const isIgnoreNewlineTag = makeMap('pre,textarea', true)
const shouldIgnoreFirstNewline = (tag, html) => tag && isIgnoreNewlineTag(tag) && html[0] === '\n'

function decodeAttr (value, shouldDecodeNewlines) {
  const re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr
  return value.replace(re, match => decodingMap[match])
}
// 将HTML变成AST树：
/* <div id="app" style="color: red;font-size:20px;">
  你好，{{name}}
  <span class="text" style="color:green">{{age}}</span>
</div> */
// 匹配完一截就删除一截
export function parseHTML (html, options) {
  const stack = []
  const expectHTML = options.expectHTML
  const isUnaryTag = options.isUnaryTag || no
  const canBeLeftOpenTag = options.canBeLeftOpenTag || no
  let index = 0
  let last, lastTag
  // 当html被截取完了，循环就停止
  while (html) {
    last = html
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      let textEnd = html.indexOf('<')
      if (textEnd === 0) {
        // 如果textEnd === 0 就可以开始去做“开始标签”匹配的事情了
        // const comment = /^<!\--/
        if (comment.test(html)) {
          const commentEnd = html.indexOf('-->')
          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
            }
            advance(commentEnd + 3)
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          const conditionalEnd = html.indexOf(']>')

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2)
            continue
          }
        }

        // Doctype:
        const doctypeMatch = html.match(doctype)
        if (doctypeMatch) {
          advance(doctypeMatch[0].length)
          continue
        }

        // End tag:
        const endTagMatch = html.match(endTag)
        if (endTagMatch) {
          const curIndex = index
          advance(endTagMatch[0].length)
          parseEndTag(endTagMatch[1], curIndex, index)
          continue
        }

        // Start tag:
        const startTagMatch = parseStartTag()
        if (startTagMatch) {
          handleStartTag(startTagMatch)
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1)
          }
          continue // 因为这里完了以后，底下到程序就可以不走了，重新开始下一轮循环。
        }
      }

      let text, rest, next
      // 这种情况是什么情况？到下一个标签了吗？？？？
      if (textEnd >= 0) {
        rest = html.slice(textEnd)
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1)
          if (next < 0) break
          textEnd += next
          rest = html.slice(textEnd)
        }
        // text是个啥？
        text = html.substring(0, textEnd)
      }

      if (textEnd < 0) {
        text = html
      }

      if (text) {
        advance(text.length)
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index)
      }
    } else {
      let endTagLength = 0
      const stackedTag = lastTag.toLowerCase()
      const reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'))
      const rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1')
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1)
        }
        if (options.chars) {
          options.chars(text)
        }
        return ''
      })
      index += html.length - rest.length
      html = rest
      parseEndTag(stackedTag, index - endTagLength, index)
    }

    if (html === last) {
      options.chars && options.chars(html)
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(`Mal-formatted tag at end of template: "${html}"`, { start: index + html.length })
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag()

  // 删除字符串
  function advance (n) {
    index += n
    html = html.substring(n)
  }

  function parseStartTag () {
    // const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
    // // qnameCapture: 匹配特殊的标签名 <my:header></my:header>
    // const qnameCapture = `((?:${ncname}\\:)?${ncname})`
    // const startTagOpen = new RegExp(`^<${qnameCapture}`) 
    const start = html.match(startTagOpen) // <div, div
    if (start) {
      const match = {
        tagName: start[1], // div
        attrs: [],
        start: index
      }
      advance(start[0].length)
      let end, // 是不是end
          attr
      // 往下走，看什么时候匹配到结束标签
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        // 没有匹配到结束标签 && （xxx || 匹配到了属性）
        // attr(取双引号): ["id="app"","id", "=", "app", undefined, undefined, {groups:undefined}, {index:0}, {input:" id="app" style="color: red;font-size:20px;">"}]
        // attr(取单引号): ["id='app',"id", "=", undefined, "app", undefined, {groups:undefined}, {index:0}, {input:" id="app" style="color: red;font-size:20px;">"}]
        // attr(不要引号): ["id=app,"id", "=", undefined, undefined, "app", {groups:undefined}, {index:0}, {input:" id="app" style="color: red;font-size:20px;">"}]
        // match.sttrs.push({
        //   name: attr[1],
        //   value: attr[3] || attr[4] || attr[5]
        // })
        attr.start = index
        advance(attr[0].length)
        attr.end = index
        match.attrs.push(attr)
      }
      // 匹配到结束标签了
      if (end) {
        match.unarySlash = end[1]
        advance(end[0].length)
        match.end = index
        return match
        // match = {
        //   tag: '',
        //   attrs: [
        //     {
        //       name: '',
        //       value: ''
        //     }
        //   ]
        // }
      }
    }
  }

  function handleStartTag (match) {
    const tagName = match.tagName
    const unarySlash = match.unarySlash

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag)
      }
      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag(tagName)
      }
    }

    const unary = isUnaryTag(tagName) || !!unarySlash

    const l = match.attrs.length
    const attrs = new Array(l)
    for (let i = 0; i < l; i++) {
      const args = match.attrs[i]
      const value = args[3] || args[4] || args[5] || ''
      const shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      }
      if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length
        attrs[i].end = args.end
      }
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end })
      lastTag = tagName
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end)
    }
  }

  function parseEndTag (tagName, start, end) {
    let pos, lowerCasedTagName
    if (start == null) start = index
    if (end == null) end = index

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase()
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (let i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            `tag <${stack[i].tag}> has no matching end tag.`,
            { start: stack[i].start, end: stack[i].end }
          )
        }
        if (options.end) {
          options.end(stack[i].tag, start, end)
        }
      }

      // Remove the open elements from the stack
      stack.length = pos
      lastTag = pos && stack[pos - 1].tag
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end)
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end)
      }
      if (options.end) {
        options.end(tagName, start, end)
      }
    }
  }
}
```

# 4 生成AST树的方法与技巧

实在看不懂！！！！



























