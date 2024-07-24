https://www.bilibili.com/video/BV1ZB4y1Z7o8/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

# [React入门到实战导学课程](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=1&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

<img src="02React核心与项目实战.assets/image-20240708174248530.png" alt="image-20240708174248530" style="zoom:50%;" />

# Day1-01.React介绍

React由Meta公司开发，是一个用于 构建Web和原生交互界面的库
![image.png](02React核心与项目实战.assets/01.png)

## React的优势

相较于传统基于DOM开发的优势

1. 组件化的开发方式
2. 不错的性能

相较于其它前端框架的优势

1. 丰富的生态
2. 跨平台支持

## React的市场情况

全球最流行，大厂必备
<img src="02React核心与项目实战.assets/02.png" alt="image.png" style="zoom:50%;" />

# Day1-02.开发环境创建

https://www.bilibili.com/video/BV1ZB4y1Z7o8?p=3&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

create-react-app是一个快速创建React开发环境的工具，底层由Webpack构件，封装了配置细节，开箱即用
执行命令：

```bash
npx create-react-app react-basic
```

1. npx -  Node.js工具命令，查找并执行后续的包命令
2. create-react-app - 核心包（固定写法），用于创建React项目
3. react-basic  React项目的名称（可以自定义）
   :::warning
   创建React项目的更多方式
   [https://zh-hans.react.dev/learn/start-a-new-react-project](https://zh-hans.react.dev/learn/start-a-new-react-project)
   :::

# Day1-03.JSX基础

https://www.bilibili.com/video/BV1ZB4y1Z7o8?p=4&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

## 什么是JSX

> 概念：JSX是JavaScript和XMl(HTML)的缩写，表示在JS代码中编写HTML模版结构，它是React中构建UI的方式

```jsx
const message = 'this is message'

function App(){
  return (
    <div>
      <h1>this is title</h1>
      {message}
    </div>
  )
}
```

优势：

1. HTML的声明式模版写法
2. JavaScript的可编程能力

## JSX的本质

> JSX并不是标准的JS语法，它是 JS的语法扩展，浏览器本身不能识别，需要通过解析工具做解析之后才能在浏览器中使用

![image.png](02React核心与项目实战.assets/03.png)

## JSX高频场景-JS表达式

https://www.bilibili.com/video/BV1ZB4y1Z7o8?p=5&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

> 在JSX中可以通过 `大括号语法{}` 识别JavaScript中的表达式，比如常见的变量、函数调用、方法调用等等

1. 使用引号传递字符串
2. 使用JS变量
3. 函数调用和方法调用
4. 使用JavaScript对象
   :::warning
   注意：if语句、switch语句、变量声明不属于表达式，不能出现在{}中
   :::

```jsx
const message = 'this is message'

function getAge(){
  return 18
}

function App(){
  return (
    <div>
      <h1>this is title</h1>
      {/* 字符串识别 */}
      {'this is str'}
      {/* 变量识别 */}
      {message}
      {/* 变量识别 */}
      {message}
      {/* 函数调用 渲染为函数的返回值 */}
      {getAge()}
    </div>
  )
}
```

## JSX高频场景-列表渲染

https://www.bilibili.com/video/BV1ZB4y1Z7o8?p=6&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

<img src="02React核心与项目实战.assets/04.png" alt="image.png" style="zoom: 67%;" />

> 在JSX中可以使用原生js种的`map方法` 实现列表渲染

```jsx
const list = [
  {id:1001, name:'Vue'},
  {id:1002, name: 'React'},
  {id:1003, name: 'Angular'}
]

function App(){
  return (
    <ul>
      {list.map(item=><li key={item.id}>{item}</li>)}
    </ul>
  )
}
```

## JSX高频场景-条件渲染

<img src="02React核心与项目实战.assets/05.png" alt="image.png" style="zoom:67%;" />

> 在React中，可以通过逻辑与运算符&&、三元表达式(?:) 实现基础的条件渲染

```jsx
const flag = true
const loading = false

function App(){
  return (
    <>
      {flag && <span>this is span</span>}
      {loading ? <span>loading...</span>:<span>this is span</span>}
    </>
  )
}
```

## JSX高频场景-复杂条件渲染

<img src="02React核心与项目实战.assets/06.png" alt="image.png" style="zoom:67%;" />

> 需求：列表中需要根据文章的状态适配
> 解决方案：自定义函数 + 判断语句

```jsx
const type = 1  // 0|1|3

function getArticleJSX(){
  if(type === 0){
    return <div>无图模式模版</div>
  }else if(type === 1){
    return <div>单图模式模版</div>
  }else(type === 3){
    return <div>三图模式模版</div>
  }
}

function App(){
  return (
    <>
      { getArticleJSX() }
    </>
  )
}
```

# Day1-08.React的事件绑定

https://www.bilibili.com/video/BV1ZB4y1Z7o8?p=9&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

## 基础实现

> React中的事件绑定，通过语法 `on + 事件名称 = { 事件处理程序 }`，整体上遵循驼峰命名法

```jsx
function App(){
  const clickHandler = ()=>{
    console.log('button按钮点击了')
  }
  return (
    <button onClick={clickHandler}>click me</button>
  )
}
```

## 使用事件参数

> 在事件回调函数中设置形参e即可

```jsx
function App(){
  const clickHandler = (e)=>{
    console.log('button按钮点击了', e)
  }
  return (
    <button onClick={clickHandler}>click me</button>
  )
}
```

## 传递自定义参数

> 语法：事件绑定的位置改造成箭头函数的写法，在执行clickHandler实际处理业务函数的时候传递实参

```jsx
function App(){
  const clickHandler = (name)=>{
    console.log('button按钮点击了', name)
  }
  return (
    <button onClick={()=>clickHandler('jack')}>click me</button>
  )
}
```

:::warning
注意：不能直接写函数调用，这里事件绑定需要一个函数引用
:::

## 同时传递事件对象和自定义参数

> 语法：在事件绑定的位置传递事件实参e和自定义参数，clickHandler中声明形参，注意顺序对应

```jsx
function App(){
  const clickHandler = (name,e)=>{
    console.log('button按钮点击了', name,e)
  }
  return (
    <button onClick={(e)=>clickHandler('jack',e)}>click me</button>
  )
}
```

# Day1-09.React组件基础使用

https://www.bilibili.com/video/BV1ZB4y1Z7o8?p=10&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

## 组件是什么

概念：一个组件就是一个用户界面的一部分，它可以有自己的逻辑和外观，组件之间可以互相嵌套，也可以服用多次
<img src="02React核心与项目实战.assets/07.png" alt="image.png" style="zoom:67%;" />

## 组件基础使用

> 在React中，一个组件就是**首字母大写的函数**，内部存放了组件的逻辑和视图UI, 渲染组件只需要把组件当成标签书写即可

```jsx
// 1. 定义组件
function Button(){
  return <button>click me</button>
}

// 2. 使用组件
function App(){
  return (
    <div>
      {/* 自闭和 */}
      <Button/>
      {/* 成对标签 */}
      <Button></Button>
    </div>
  )
}
```

# Day1-10.组件状态管理-useState

https://www.bilibili.com/video/BV1ZB4y1Z7o8?p=11&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

## 基础使用

> useState 是一个 React Hook（函数），它允许我们向组件添加一个`状态变量`, 从而控制影响组件的渲染结果
>
> 和普通JS变量不同的是，状态变量一旦发生变化组件的视图UI也会跟着变化（数据驱动视图）

| <img src="02React核心与项目实战.assets/08.png" alt="image.png" style="zoom: 50%;" /> | <img src="02React核心与项目实战.assets/image-20240709084802361.png" alt="image-20240709084802361" style="zoom:50%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
|                                                              | <img src="02React核心与项目实战.assets/image-20240709085159531.png" alt="image-20240709085159531" style="zoom: 45%;" /> |

```jsx
function App(){
  const [ count, setCount ] = React.useState(0)
  return (
    <div>
      <button onClick={()=>setCount(count+1)}>{ count }</button>
    </div>
  )
}
```

## 状态的修改规则

> 在React中状态被认为是只读的，我们应该始终`替换它而不是修改它`, 直接修改状态不能引发视图更新

<img src="02React核心与项目实战.assets/09.png" alt="image.png" style="zoom: 50%;" />

## 修改对象状态

> 对于对象类型的状态变量，应该始终给set方法一个`全新的对象` 来进行修改

<img src="02React核心与项目实战.assets/10.png" alt="image.png" style="zoom: 50%;" />

# Day1-12.组件的基础样式处理

https://www.bilibili.com/video/BV1ZB4y1Z7o8?p=13&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

> React组件基础的样式控制有俩种方式，行内样式和class类名控制

```jsx
<div style={{ color:'red'}}>this is div</div>
```

```css
.foo{
  color: red;
}
```

```jsx
import './index.css'

function App(){
  return (
    <div>
      <span className="foo">this is span</span>
    </div>
  )
}
```

# Day1-13.B站评论案例

<img src="02React核心与项目实战.assets/11.png" alt="image.png" style="zoom: 33%;" />

1. 渲染评论列表
2. 删除评论实现
3. 渲染导航Tab和高亮实现
4. 评论列表排序功能实现

## 基础模版

```tsx
import { useState } from 'react'
import './App.scss'
import avatar from './images/bozai.png'

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
const defaultList = [
  {
    // 评论id
    rpid: 3,
    // 用户信息
    user: {
      uid: '13258165',
      avatar: '',
      uname: '周杰伦',
    },
    // 评论内容
    content: '哎哟，不错哦',
    // 评论时间
    ctime: '10-18 08:15',
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: '',
      uname: '许嵩',
    },
    content: '我寻你千百度 日出到迟暮',
    ctime: '11-13 11:29',
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: '黑马前端',
    },
    content: '学前端就来黑马',
    ctime: '10-19 09:00',
    like: 66,
  },
]
// 当前登录用户信息
const user = {
  // 用户id
  uid: '30009257',
  // 用户头像
  avatar,
  // 用户昵称
  uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: 'hot', text: '最热' },
  { type: 'time', text: '最新' },
]

const App = () => {
  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            <span className='nav-item'>最新</span>
            <span className='nav-item'>最热</span>
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text">发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          <div className="reply-item">
            {/* 头像 */}
            <div className="root-reply-avatar">
              <div className="bili-avatar">
                <img
                  className="bili-avatar-img"
                  alt=""
                />
              </div>
            </div>

            <div className="content-wrap">
              {/* 用户名 */}
              <div className="user-info">
                <div className="user-name">jack</div>
              </div>
              {/* 评论内容 */}
              <div className="root-reply">
                <span className="reply-content">这是一条评论回复</span>
                <div className="reply-info">
                  {/* 评论时间 */}
                  <span className="reply-time">{'2023-11-11'}</span>
                  {/* 评论数量 */}
                  <span className="reply-time">点赞数:{100}</span>
                  <span className="delete-btn">
                    删除
                  </span>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
```

```css
.app {
  width: 80%;
  margin: 50px auto;
}

.reply-navigation {
  margin-bottom: 22px;

  .nav-bar {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;

    .nav-title {
      display: flex;
      align-items: center;
      width: 114px;
      font-size: 20px;

      .nav-title-text {
        color: #18191c;
        font-weight: 500;
      }
      .total-reply {
        margin: 0 36px 0 6px;
        color: #9499a0;
        font-weight: normal;
        font-size: 13px;
      }
    }

    .nav-sort {
      display: flex;
      align-items: center;
      color: #9499a0;
      font-size: 13px;

      .nav-item {
        cursor: pointer;

        &:hover {
          color: #00aeec;
        }

        &:last-child::after {
          display: none;
        }
        &::after {
          content: ' ';
          display: inline-block;
          height: 10px;
          width: 1px;
          margin: -1px 12px;
          background-color: #9499a0;
        }
      }

      .nav-item.active {
        color: #18191c;
      }
    }
  }
}

.reply-wrap {
  position: relative;
}
.box-normal {
  display: flex;
  transition: 0.2s;

  .reply-box-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 50px;
  }

  .reply-box-wrap {
    display: flex;
    position: relative;
    flex: 1;

    .reply-box-textarea {
      width: 100%;
      height: 50px;
      padding: 5px 10px;
      box-sizing: border-box;
      color: #181931;
      font-family: inherit;
      line-height: 38px;
      background-color: #f1f2f3;
      border: 1px solid #f1f2f3;
      border-radius: 6px;
      outline: none;
      resize: none;
      transition: 0.2s;

      &::placeholder {
        color: #9499a0;
        font-size: 12px;
      }
      &:focus {
        height: 60px;
        background-color: #fff;
        border-color: #c9ccd0;
      }
    }
  }

  .reply-box-send {
    position: relative;
    display: flex;
    flex-basis: 86px;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s;

    & .send-text {
      position: absolute;
      z-index: 1;
      color: #fff;
      font-size: 16px;
    }
    &::after {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #00aeec;
      border-radius: 4px;
      opacity: 0.5;
      content: '';
    }
    &:hover::after {
      opacity: 1;
    }
  }
}
.bili-avatar {
  position: relative;
  display: block;
  width: 48px;
  height: 48px;
  margin: 0;
  padding: 0;
  border-radius: 50%;
}
.bili-avatar-img {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 48px;
  height: 48px;
  object-fit: cover;
  border: none;
  border-radius: 50%;
  image-rendering: -webkit-optimize-contrast;
  transform: translate(-50%, -50%);
}

// 评论列表
.reply-list {
  margin-top: 14px;
}
.reply-item {
  padding: 22px 0 0 80px;
  .root-reply-avatar {
    position: absolute;
    left: 0;
    display: flex;
    justify-content: center;
    width: 80px;
    cursor: pointer;
  }

  .content-wrap {
    position: relative;
    flex: 1;

    &::after {
      content: ' ';
      display: block;
      height: 1px;
      width: 100%;
      margin-top: 14px;
      background-color: #e3e5e7;
    }

    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 4px;

      .user-name {
        height: 30px;
        margin-right: 5px;
        color: #61666d;
        font-size: 13px;
        line-height: 30px;
        cursor: pointer;
      }
    }

    .root-reply {
      position: relative;
      padding: 2px 0;
      color: #181931;
      font-size: 15px;
      line-height: 24px;
      .reply-info {
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 2px;
        color: #9499a0;
        font-size: 13px;

        .reply-time {
          width: 76px;
          margin-right: 20px;
        }
        .reply-like {
          display: flex;
          align-items: center;
          margin-right: 19px;

          .like-icon {
            width: 14px;
            height: 14px;
            margin-right: 5px;
            color: #9499a0;
            background-position: -153px -25px;
            &:hover {
              background-position: -218px -25px;
            }
          }
          .like-icon.liked {
            background-position: -154px -89px;
          }
        }
        .reply-dislike {
          display: flex;
          align-items: center;
          margin-right: 19px;
          .dislike-icon {
            width: 16px;
            height: 16px;
            background-position: -153px -153px;
            &:hover {
              background-position: -217px -153px;
            }
          }
          .dislike-icon.disliked {
            background-position: -154px -217px;
          }
        }
        .delete-btn {
          cursor: pointer;
          &:hover {
            color: #00aeec;
          }
        }
      }
    }
  }
}

.reply-none {
  height: 64px;
  margin-bottom: 80px;
  color: #99a2aa;
  font-size: 13px;
  line-height: 64px;
  text-align: center;
}
```

## 完成版本

```jsx
 import { useState } from 'react'
import './App.scss'
import avatar from './images/bozai.png'
import orderBy from 'lodash/orderBy'

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
const defaultList = [
  {
    // 评论id
    rpid: 3,
    // 用户信息
    user: {
      uid: '13258165',
      avatar: '',
      uname: '周杰伦',
    },
    // 评论内容
    content: '哎哟，不错哦',
    // 评论时间
    ctime: '10-18 08:15',
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: '',
      uname: '许嵩',
    },
    content: '我寻你千百度 日出到迟暮',
    ctime: '11-13 11:29',
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: '黑马前端',
    },
    content: '学前端就来黑马',
    ctime: '10-19 09:00',
    like: 66,
  },
]
// 当前登录用户信息
const user = {
  // 用户id
  uid: '30009257',
  // 用户头像
  avatar,
  // 用户昵称
  uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: 'hot', text: '最热' },
  { type: 'time', text: '最新' },
]

const App = () => {
  // 导航 Tab 高亮的状态
  const [activeTab, setActiveTab] = useState('hot')
  const [list, setList] = useState(defaultList)

  // 删除评论
  const onDelete = rpid => {
    // 如果要删除数组中的元素，需要调用 filter 方法，并且一定要调用 setList 才能更新状态
    setList(list.filter(item => item.rpid !== rpid))
  }

  // tab 高亮切换
  const onToggle = type => {
    setActiveTab(type)
    let newList
    if (type === 'time') {
      // 按照时间降序排序
      // orderBy(对谁进行排序, 按照谁来排, 顺序)
      newList = orderBy(list, 'ctime', 'desc')
    } else {
      // 按照喜欢数量降序排序
      newList = orderBy(list, 'like', 'desc')
    }
    setList(newList)
  }

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{list.length}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map(item => {
              return (
                <div
                  key={item.type}
                  className={
                    item.type === activeTab ? 'nav-item active' : 'nav-item'
                  }
                  onClick={() => onToggle(item.type)}
                >
                  {item.text}
                </div>
              )
            })}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text">发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {list.map(item => {
            return (
              <div key={item.rpid} className="reply-item">
                {/* 头像 */}
                <div className="root-reply-avatar">
                  <div className="bili-avatar">
                    <img
                      className="bili-avatar-img"
                      src={item.user.avatar}
                      alt=""
                    />
                  </div>
                </div>

                <div className="content-wrap">
                  {/* 用户名 */}
                  <div className="user-info">
                    <div className="user-name">{item.user.uname}</div>
                  </div>
                  {/* 评论内容 */}
                  <div className="root-reply">
                    <span className="reply-content">{item.content}</span>
                    <div className="reply-info">
                      {/* 评论时间 */}
                      <span className="reply-time">{item.ctime}</span>
                      {/* 评论数量 */}
                      <span className="reply-time">点赞数:{item.like}</span>
                      {user.uid === item.user.uid && (
                        <span
                          className="delete-btn"
                          onClick={() => onDelete(item.rpid)}
                        >
                          删除
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
```

<img src="02React核心与项目实战.assets/image-20240710095116755.png" alt="image-20240710095116755" style="zoom: 80%;" />

# Day2-01.React表单控制

## 受控绑定

> 概念：使用React组件的状态（useState）控制表单的状态

![image.png](02React核心与项目实战.assets/01-17205765786921.png)

```jsx
function App(){
  const [value, setValue] = useState('')
  return (
    <input 
      type="text" 
      value={value} 
      onChange={e => setValue(e.target.value)}
    />
  )
}
```

## 非受控绑定

> 概念：通过获取DOM的方式获取表单的输入数据

<img src="02React核心与项目实战.assets/image-20240710103510531.png" alt="image-20240710103510531" style="zoom:50%;" />

```jsx
function App(){
  const inputRef = useRef(null)

  const onChange = ()=>{
    console.log(inputRef.current.value)
  }
  
  return (
    <input 
      type="text" 
      ref={inputRef}
      onChange={onChange}
    />
  )
}
```

# Day2-03.案例-B站评论案例

<img src="02React核心与项目实战.assets/02-17205765786922.png" alt="image.png" style="zoom:50%;" />

1. 手机输入框评论内容，并发布评论
2. id处理和时间处理（uuid 和 day.js）

# Day2-06.React组件通信

> 概念：组件通信就是`组件之间的数据传递`, 根据组件嵌套关系的不同，有不同的通信手段和方法

<img src="02React核心与项目实战.assets/03-17205765786923.png" alt="image.png" style="zoom:50%;" />

1. A-B 父子通信
2. B-C 兄弟通信
3. A-E 跨层通信

# Day2-07.父子通信-父传子

<img src="02React核心与项目实战.assets/04-17205765786935.png" alt="image.png" style="zoom:50%;" />

## 基础实现

**实现步骤 **

1. 父组件传递数据 - 在子组件标签上绑定属性 
2. 子组件接收数据 - 子组件通过props参数接收数据

```jsx
function Son(props){
  return <div>{ props.name }</div>
}


function App(){
  const name = 'this is app name'
  return (
    <div>
       <Son name={name}/>
    </div>
  )
}
```

## props说明

**props可以传递任意的合法数据**，比如数字、字符串、布尔值、数组、对象、函数、JSX
<img src="02React核心与项目实战.assets/05-17205765786924.png" alt="image.png" style="zoom: 50%;" />
**props是只读对象**
子组件只能读取props中的数据，不能直接进行修改, 父组件的数据只能由父组件修改 

## 特殊的prop-chilren

> 场景：当我们把内容嵌套在组件的标签内部时，组件会自动在名为children的prop属性中接收该内容

<img src="02React核心与项目实战.assets/06-17205765786936.png" alt="image.png" style="zoom:50%;" />

# Day2-09.父子通信-子传父

<img src="02React核心与项目实战.assets/07-17205765786937.png" alt="image.png" style="zoom: 67%;" />

> 核心思路：在子组件中调用父组件中的函数并传递参数

<img src="02React核心与项目实战.assets/image-20240710114716160.png" alt="image-20240710114716160" style="zoom: 80%;" />

```tsx
function Son({ onGetMsg }){
  const sonMsg = 'this is son msg'
  return (
    <div>
      {/* 在子组件中执行父组件传递过来的函数 */}
      <button onClick={()=>onGetMsg(sonMsg)}>send</button>
    </div>
  )
}


function App(){
  const getMsg = (msg)=>console.log(msg)
  
  return (
    <div>
      {/* 传递父组件中的函数到子组件 */}
       <Son onGetMsg={ getMsg }/>
    </div>
  )
}
```

# Day2-10.兄弟组件通信

<img src="02React核心与项目实战.assets/08-17205765786938.png" alt="image.png" style="zoom: 67%;" />

> 实现思路: 借助 `状态提升` 机制，通过共同的父组件进行兄弟之间的数据传递
>
> 1. A组件先通过子传父的方式把数据传递给父组件App
> 2. App拿到数据之后通过父传子的方式再传递给B组件

```jsx
// 1. 通过子传父 A -> App
// 2. 通过父传子 App -> B
import { useState } from "react"

function A ({ onGetAName }) {
  // Son组件中的数据
  const name = 'this is A name'
  return (
    <div>
      this is A compnent,
      <button onClick={() => onGetAName(name)}>send</button>
    </div>
  )
}

function B ({ name }) {
  return (
    <div>
      this is B compnent,
      {name}
    </div>
  )
}

function App () {
  const [name, setName] = useState('')
  const getAName = (name) => {
    setName(name)
  }
  return (
    <div>
      this is App
      <A onGetAName={getAName} />
      <B name={name} />
    </div>
  )
}

export default App
```

# [Day2-11.跨层组件通信](https://www.bilibili.com/video/BV1ZB4y1Z7o8?p=29&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

> 使用Context机制实现跨层级组件通信

<img src="02React核心与项目实战.assets/09-17205765786939.png" alt="image.png" style="zoom: 50%;" />
**实现步骤：**

1. 使用 `createContext`方法创建一个上下文对象Ctx 
2. 在顶层组件（App）中通过 `Ctx.Provider` 组件提供数据 
3. 在底层组件（B）中通过 `useContext` 钩子函数获取消费数据

```jsx
// App -> A -> B
import { createContext, useContext } from "react"

// 1. createContext方法创建一个上下文对象
const MsgContext = createContext()

function A () {
  return (
    <div>
      this is A component
      <B />
    </div>
  )
}

function B () {
  // 3. 在底层组件 通过useContext钩子函数使用数据
  const msg = useContext(MsgContext)
  return (
    <div>
      this is B compnent,{msg}
    </div>
  )
}

function App () {
  const msg = 'this is app msg'
  return (
    <div>
      {/* 2. 在顶层组件 通过Provider组件提供数据 */}
      <MsgContext.Provider value={msg}>
        this is App
        <A />
      </MsgContext.Provider>
    </div>
  )
}

export default App
```

# Day2-12.React副作用管理-useEffect

## 概念理解 

useEffect是一个React Hook函数，用于在React组件中创建不是由事件引起而是由渲染本身引起的操作（副作用）, 比 如发送AJAX请求，更改DOM等等 

<img src="02React核心与项目实战.assets/10-172057657869310.png" alt="image.png" style="zoom:80%;" />

:::warning
说明：上面的组件中没有发生任何的用户事件，组件渲染完毕之后就需要和服务器要数据，整个过程属于“只由渲染引起的操作”
:::

## 基础使用

> 需求：在组件渲染完毕之后，立刻从服务端获取频道列表数据并显示到页面中

<img src="02React核心与项目实战.assets/11-172057657869311.png" alt="image.png" style="zoom:50%;" />

说明： 

1. 参数1是一个函数，可以把它叫做副作用函数，在函数内部可以放置要执行的操作 
2. 参数2是一个数组（可选参），在数组里放置依赖项，不同依赖项会影响第一个参数函数的执行，当是一个空数组的时候，副作用函数只会在组件渲染完毕之后执行一次   
   :::warning
   接口地址：http://geek.itheima.net/v1_0/channels
   :::

## useEffect依赖说明 

useEffect副作用函数的执行时机存在多种情况，根据传入依赖项的不同，会有不同的执行表现

| **依赖项**     | **副作用功函数的执行时机**      |
| -------------- | ------------------------------- |
| 没有依赖项     | 组件初始渲染 + 组件更新时执行   |
| 空数组依赖     | 只在初始渲染时执行一次          |
| 添加特定依赖项 | 组件初始渲染 + 依赖项变化时执行 |

<img src="02React核心与项目实战.assets/image-20240710155751000.png" alt="image-20240710155751000" style="zoom:50%;" />

## 清除副作用

> 概念：在useEffect中编写的由渲染本身引起的对接组件外部的操作，社区也经常把它叫做副作用操作，比如在useEffect中开启了一个定时器，我们想在组件卸载时把这个定时器再清理掉，这个过程就是清理副作用

<img src="02React核心与项目实战.assets/12.png" alt="image.png" style="zoom: 50%;" />

:::warning
说明：清除副作用的函数最常见的执行时机是在组件卸载时自动执行
:::

```jsx
import { useEffect, useState } from "react"

function Son () {
  // 1. 渲染时开启一个定时器
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('定时器执行中...')
    }, 1000)

    return () => {
      // 清除副作用(组件卸载时)
      clearInterval(timer)
    }
  }, [])
  return <div>this is son</div>
}

function App () {
  // 通过条件渲染模拟组件卸载
  const [show, setShow] = useState(true)
  return (
    <div>
      {show && <Son />}
      <button onClick={() => setShow(false)}>卸载Son组件</button>
    </div>
  )
}

export default App
```

# Day2-15.自定义Hook实现

> 概念：自定义Hook是以 `use打头的函数`，通过自定义Hook函数可以用来`实现逻辑的封装和复用`

<img src="02React核心与项目实战.assets/13.png" alt="image.png" style="zoom:50%;" />

<img src="02React核心与项目实战.assets/image-20240710162336948.png" alt="image-20240710162336948" style="zoom:50%;" />

```jsx
// 封装自定义Hook
// 问题: 布尔切换的逻辑 当前组件耦合在一起的 不方便复用
// 解决思路: 自定义hook
import { useState } from "react"

function useToggle () {
  // 可复用的逻辑代码
  const [value, setValue] = useState(true)
  const toggle = () => setValue(!value)
  // 哪些状态和回调函数需要在其他组件中使用 return
  return {
    value,
    toggle
  }
}

// 封装自定义hook通用思路:
// 1. 声明一个以use打头的函数
// 2. 在函数体内封装可复用的逻辑（只要是可复用的逻辑）
// 3. 把组件中用到的状态或者回调return出去（以对象或者数组）
// 4. 在哪个组件中要用到这个逻辑，就执行这个函数，解构出来状态和回调进行使用

function App () {
  const { value, toggle } = useToggle()
  return (
    <div>
      {value && <div>this is div</div>}
      <button onClick={toggle}>toggle</button>
    </div>
  )
}

export default App
```

# Day2-16.React Hooks使用规则

1. 只能在组件中或者其他自定义Hook函数中调用
2. 只能在组件的顶层调用，不能嵌套在if、for、其它的函数中

![image.png](02React核心与项目实战.assets/14.png)

# Day2-17.案例-优化B站评论案例

<img src="02React核心与项目实战.assets/15.png" alt="image.png" style="zoom:50%;" />

1. 使用请求接口的方式获取评论列表并渲染 
2. 使用自定义Hook函数封装数据请求的逻辑 
3. 把评论中的每一项抽象成一个独立的组件实现渲染

| <img src="02React核心与项目实战.assets/image-20240710163257863.png" alt="image-20240710163257863" style="zoom: 60%;" /> | <img src="02React核心与项目实战.assets/image-20240710163741347.png" alt="image-20240710163741347" style="zoom:50%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img src="02React核心与项目实战.assets/image-20240710164108214.png" alt="image-20240710164108214" style="zoom:50%;" /> |                                                              |

# Day3-01.Redux介绍

> Redux 是React最常用的集中状态管理工具，类似于Vue中的Pinia（Vuex），可以独立于框架运行
> 作用：通过集中管理的方式管理应用的状态

<img src="02React核心与项目实战.assets/1.png" alt="image.png" style="zoom: 50%;" />

**为什么要使用Redux？**

1. 独立于组件，无视组件之间的层级关系，简化通信问题
2. 单项数据流清晰，易于定位bug
3. 调试工具配套良好，方便调试

# Day3-01.Redux快速体验

## 1. 实现计数器

> 需求：不和任何框架绑定，不使用任何构建工具，使用纯Redux实现计数器

<img src="02React核心与项目实战.assets/2.png" alt="image.png" style="zoom: 33%;" />

使用步骤：

1. 定义一个 reducer 函数 （根据当前想要做的修改返回一个新的状态）
2. 使用createStore方法传入 reducer函数 生成一个store实例对象
3. 使用store实例的 subscribe方法 订阅数据的变化（数据一旦变化，可以得到通知）
4. 使用store实例的 dispatch方法提交action对象 触发数据变化（告诉reducer你想怎么改数据）
5. 使用store实例的 getState方法 获取最新的状态数据更新到视图中

代码实现：

| <img src="02React核心与项目实战.assets/image-20240711113020705.png" alt="image-20240711113020705" style="zoom: 67%;" /> | <img src="02React核心与项目实战.assets/image-20240711113427461.png" alt="image-20240711113427461" style="zoom: 67%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img src="02React核心与项目实战.assets/image-20240711113632626.png" alt="image-20240711113632626" style="zoom: 67%;" /> |                                                              |



```html
<button id="decrement">-</button>
<span id="count">0</span>
<button id="increment">+</button>

<script src="https://unpkg.com/redux@latest/dist/redux.min.js"></script>

<script>
  // 定义reducer函数 
  // 内部主要的工作是根据不同的action 返回不同的state
  function counterReducer (state = { count: 0 }, action) {
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + 1 }
      case 'DECREMENT':
        return { count: state.count - 1 }
      default:
        return state
    }
  }
  // 使用reducer函数生成store实例
  const store = Redux.createStore(counterReducer)

  // 订阅数据变化
  store.subscribe(() => {
    console.log(store.getState())
    document.getElementById('count').innerText = store.getState().count

  })
  // 增
  const inBtn = document.getElementById('increment')
  inBtn.addEventListener('click', () => {
    store.dispatch({
      type: 'INCREMENT'
    })
  })
  // 减
  const dBtn = document.getElementById('decrement')
  dBtn.addEventListener('click', () => {
    store.dispatch({
      type: 'DECREMENT'
    })
  })
</script>
```

## 2. Redux数据流架构

> Redux的难点是理解它对于数据修改的规则, 下图动态展示了在整个数据的修改中，数据的流向

<img src="02React核心与项目实战.assets/3.png" alt="1" style="zoom: 40%;" />

为了职责清晰，Redux代码被分为三个核心的概念，我们学redux，其实就是学这三个核心概念之间的配合，三个概念分别是:

1. state:  一个对象 存放着我们管理的数据
2. action:  一个对象 用来描述你想怎么改数据
3. reducer:  一个函数 根据action的描述更新state

# Day3-02.Redux与React - 环境准备

> Redux虽然是一个框架无关可以独立运行的插件，但是社区通常还是把它与React绑定在一起使用，以一个计数器案例体验一下Redux + React 的基础使用

## 1. 配套工具

> 在React中使用redux，官方要求安装俩个其他插件 - Redux Toolkit 和 react-redux

1. Redux Toolkit（RTK）- 官方推荐编写Redux逻辑的方式，是一套工具的集合集，简化书写方式

   <img src="02React核心与项目实战.assets/image-20240711114428915.png" alt="image-20240711114428915" style="zoom: 45%;" />

2. react-redux - 用来 链接 Redux 和 React组件 的中间件

<img src="02React核心与项目实战.assets/4.png" alt="image.png" style="zoom:67%;" />

## 2. 配置基础环境

1.  使用 CRA 快速创建 React 项目

```bash
npx create-react-app react-redux 
```

2.  安装配套工具

```bash
npm i @reduxjs/toolkit  react-redux 
```

3.  启动项目

```bash
npm run start 
```


## 3. store目录结构设计

<img src="02React核心与项目实战.assets/5.png" alt="image.png" style="zoom: 33%;" />

1. 通常集中状态管理的部分都会单独创建一个单独的 `store` 目录

2. 应用通常会有很多个子store模块，所以创建一个 `modules` 目录，在内部编写业务分类的子store

3. store中的入口文件 index.js 的作用是组合modules中所有的子模块，并导出store

# Day3-03.Redux与React - 实现counter

## 1. 整体路径熟悉

<img src="02React核心与项目实战.assets/6.png" alt="image.png" style="zoom:45%;" />


## 2. 使用React Toolkit 创建 counterStore

```javascript
// counterStore.js
import { createSlice } from '@reduxjs/toolkit'

const counterStore = createSlice({
  // 模块名称独一无二
  name: 'counter',
  // 初始数据
  initialState: {
    count: 1
  },
  // 修改数据的同步方法
  reducers: {
    increment (state) {
      state.count++
    },
    decrement(state){
      state.count--
    }
  }
})
// 结构出actionCreater
const { increment,decrement } = counter.actions

// 获取reducer函数
const counterReducer = counterStore.reducer

// 导出
export { increment, decrement }
export default counterReducer
```

```javascript
// store/index.js
import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './modules/counterStore'

export default configureStore({
  reducer: {
    // 注册子模块
    counter: counterReducer
  }
})
```

| <img src="02React核心与项目实战.assets/image-20240711120215847.png" alt="image-20240711120215847" style="zoom:50%;" /> | <img src="02React核心与项目实战.assets/image-20240711120333447.png" alt="image-20240711120333447" style="zoom:50%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
|                                                              |                                                              |

## 3. 为React注入store

> react-redux负责把Redux和React 链接 起来，内置 Provider组件 通过 store 参数把创建好的store实例注入到应用中，链接正式建立

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// 导入store
import store from './store'
// 导入store提供组件Provider
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  // 提供store数据
  <Provider store={store}>
    <App />
  </Provider>
)
```

## 4. React组件使用store中的数据

> 在React组件中使用store中的数据，需要用到一个钩子函数 - useSelector，它的作用是把store中的数据映射到组件中，使用样例如下：

<img src="02React核心与项目实战.assets/7.png" alt="image.png" style="zoom: 67%;" />

## 5. React组件修改store中的数据

> React组件中修改store中的数据需要借助另外一个hook函数 - useDispatch，它的作用是生成提交action对象的dispatch函数，使用样例如下：

<img src="02React核心与项目实战.assets/8.png" alt="image.png" style="zoom:60%;" />

<img src="02React核心与项目实战.assets/image-20240711121255293.png" alt="image-20240711121255293" style="zoom: 50%;" />

# Day3-04.Redux与React - 提交action传参

> 需求：组件中有俩个按钮 `add to 10` 和 `add to 20` 可以直接把count值修改到对应的数字，目标count值是在组件中传递过去的，需要在提交action的时候传递参数

<img src="02React核心与项目实战.assets/9.png" alt="image.png" style="zoom: 33%;" />

实现方式：在reducers的同步修改方法中添加action对象参数，在调用actionCreater的时候传递参数，参数会被传递到action对象payload属性上

<img src="02React核心与项目实战.assets/10-172060109577112.png" alt="image.png"  />

# Day3-05.Redux与React - 异步action处理

**需求理解**

<img src="02React核心与项目实战.assets/11-172060109577113.png" alt="image.png" style="zoom: 50%;" />

![image-20240711201706999](02React核心与项目实战.assets/image-20240711201706999.png)

**实现步骤**

1. 创建store的写法保持不变，配置好同步修改状态的方法
2. 单独封装一个函数，在函数内部return一个新函数，在新函数中
   2.1 封装异步请求获取数据
   2.2 调用同步actionCreater传入异步数据生成一个action对象，并使用dispatch提交
3. 组件中dispatch的写法保持不变

**代码实现**

> 测试接口地址：  [http://geek.itheima.net/v1_0/channels](http://geek.itheima.net/v1_0/channels')

```javascript
// channelStore.js
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// 创建store
const channelStore = createSlice({
  name: 'channel',
  initialState: {
    channelList: []
  },
  reducers: {
    // 同步修改方法
    setChannelList (state, action) {
      state.channelList = action.payload
    }
  }
})

// 异步请求部分
const { setChannelList } = channelStore.actions
const url = 'http://geek.itheima.net/v1_0/channels'
// 封装一个函数 在函数中return一个新函数 在新函数中封装异步
// 得到数据之后通过dispatch函数 触发修改
const fetchChannelList = () => {
  return async (dispatch) => {
    const res = await axios.get(url);
    dispatch(setChannelList(res.data.data.channels))
  }
}

export { fetchChannelList }

const channelReducer = channelStore.reducer
export default channelReducer
```

```jsx
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchChannelList } from './store/channelStore'

function App () {
  // 使用数据
  const { channelList } = useSelector(state => state.channel)
  useEffect(() => {
    dispatch(fetchChannelList())
  }, [dispatch])

  return (
    <div className="App">
      <ul>
        {channelList.map(task => <li key={task.id}>{task.name}</li>)}
      </ul>
    </div>
  )
}

export default App
```

| <img src="02React核心与项目实战.assets/image-20240711203341482.png" alt="image-20240711203341482" style="zoom: 50%;" /> | <img src="02React核心与项目实战.assets/image-20240711203700821.png" alt="image-20240711203700821" style="zoom:50%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

# Day3-06.Redux调试 - devtools

> Redux官方提供了针对于Redux的调试工具，支持实时state信息展示，action提交信息查看等

<img src="02React核心与项目实战.assets/12-172060109577114.png" alt="image.png" style="zoom: 67%;" />

# Day3-07.美团小案例

## 1. 案例演示

<img src="02React核心与项目实战.assets/13-172060109577115.png" alt="image.png" style="zoom:50%;" />

> 基本开发思路：使用 RTK（Redux Toolkit）来管理应用状态, 组件负责 数据渲染 和 dispatch action

## 2. 准备并熟悉环境

1.  克隆项目到本地（内置了基础静态组件和模版）

```bash
git clone http://git.itcast.cn/heimaqianduan/redux-meituan.git 
```

2.  安装所有依赖

```bash
npm i 
```

3.  启动mock服务（内置了json-server）

```bash
npm run serve 
```

4.  启动前端服务

```bash
npm run start 
```

## 3. 分类和商品列表渲染

<img src="02React核心与项目实战.assets/14-172060109577116.png" alt="image.png" style="zoom: 50%;" />

1- 编写store逻辑

```javascript
// 编写store
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const foodsStore = createSlice({
  name: 'foods',
  initialState: {
    // 商品列表
    foodsList: []
  },
  reducers: {
    // 更改商品列表
    setFoodsList (state, action) {
      state.foodsList = action.payload
    }
  }
})

// 异步获取部分
const { setFoodsList } = foodsStore.actions
const fetchFoodsList = () => {
  return async (dispatch) => {
    // 编写异步逻辑
    const res = await axios.get('http://localhost:3004/takeaway')
    // 调用dispatch函数提交action
    dispatch(setFoodsList(res.data))
  }
}

export { fetchFoodsList }

const reducer = foodsStore.reducer

export default reducer
```

2- 组件使用store数据

```jsx
// 省略部分代码
import { useDispatch, useSelector } from 'react-redux'
import { fetchFoodsList } from './store/modules/takeaway'
import { useEffect } from 'react'

const App = () => {
  // 触发action执行
  // 1. useDispatch -> dispatch 2. actionCreater导入进来 3.useEffect
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFoodsList())
  }, [dispatch])

  return (
    <div className="home">
      {/* 导航 */}
      <NavBar />

      {/* 内容 */}
      <div className="content-wrap">
        <div className="content">
          <Menu />
          <div className="list-content">
            <div className="goods-list">
              {/* 外卖商品列表 */}
              {foodsList.map(item => {
                return (
                  <FoodsCategory
                    key={item.tag}
                    // 列表标题
                    name={item.name}
                    // 列表商品
                    foods={item.foods}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* 购物车 */}
      <Cart />
    </div>
  )
}

export default App
```

## 4. 点击分类激活交互实现

<img src="02React核心与项目实战.assets/15-172060109577117.png" alt="image.png" style="zoom: 50%;" />

1- 编写store逻辑

```javascript
// 编写store

import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const foodsStore = createSlice({
  name: 'foods',
  initialState: {
    // 菜单激活下标值
    activeIndex: 0
  },
  reducers: {
    // 更改activeIndex
    changeActiveIndex (state, action) {
      state.activeIndex = action.payload
    }
  }
})

// 导出
const { changeActiveIndex } = foodsStore.actions

export { changeActiveIndex }

const reducer = foodsStore.reducer

export default reducer
```

2- 编写组件逻辑

```jsx
const Menu = () => {
  const { foodsList, activeIndex } = useSelector(state => state.foods)
  const dispatch = useDispatch()
  const menus = foodsList.map(item => ({ tag: item.tag, name: item.name }))
  return (
    <nav className="list-menu">
      {/* 添加active类名会变成激活状态 */}
      {menus.map((item, index) => {
      return (
        <div
          // 提交action切换激活index
          onClick={() => dispatch(changeActiveIndex(index))}
          key={item.tag}
          // 动态控制active显示
          className={classNames(
            'list-menu-item',
            activeIndex === index && 'active'
          )}
          >
          {item.name}
        </div>
      )
    })}
    </nav>
  )
}
```

## 5. 商品列表切换显示

<img src="02React核心与项目实战.assets/16.png" alt="image.png" style="zoom: 50%;" />

```jsx
<div className="list-content">
  <div className="goods-list">
    {/* 外卖商品列表 */}
    {foodsList.map((item, index) => {
      return (
        activeIndex === index && <FoodsCategory
          key={item.tag}
          // 列表标题
          name={item.name}
          // 列表商品
          foods={item.foods}
        />
      )
    })}
  </div>
</div>
```

## 6. 添加购物车实现

<img src="02React核心与项目实战.assets/17.png" alt="image.png" style="zoom:50%;" />

1- 编写store逻辑

```javascript
// 编写store

import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const foodsStore = createSlice({
  name: 'foods',
  reducers: {
    // 添加购物车
    addCart (state, action) {
      // 是否添加过？以action.payload.id去cartList中匹配 匹配到了 添加过
      const item = state.cartList.find(item => item.id === action.payload.id)
      if (item) {
        item.count++
      } else {
        state.cartList.push(action.payload)
      }
    }
  }
})

// 导出actionCreater
const { addCart } = foodsStore.actions

export { addCart }

const reducer = foodsStore.reducer

export default reducer
```

2- 编写组件逻辑

```jsx
<div className="goods-count">
  {/* 添加商品 */}
  <span 
    className="plus" 
    onClick={() => dispatch(addCart({
    id,
    picture,
    name,
    unit,
    description,
    food_tag_list,
    month_saled,
    like_ratio_desc,
    price,
    tag,
    count
  }))}></span>
</div>
```

## 7. 统计区域实现

![image.png](02React核心与项目实战.assets/18.png)

实现思路

1. 基于store中的cartList的length渲染数量
2. 基于store中的cartList累加price * count
3. 购物车cartList的length不为零则高亮

```jsx
// 计算总价 
const totalPrice = cartList.reduce((a, c) => a + c.price * c.count, 0)

{/* fill 添加fill类名购物车高亮*/}
{/* 购物车数量 */}
<div onClick={onShow} className={classNames('icon', cartList.length > 0 && 'fill')}>
  {cartList.length > 0 && <div className="cartCornerMark">{cartList.length}</div>}
</div>
```

## 8. 购物车列表功能实现

![image.png](02React核心与项目实战.assets/19.png)

1-控制列表渲染

```jsx
const Cart = () => {
  return (
    <div className="cartContainer">
      {/* 添加visible类名 div会显示出来 */}
      <div className={classNames('cartPanel', 'visible')}>
        {/* 购物车列表 */}
        <div className="scrollArea">
          {cartList.map(item => {
            return (
              <div className="cartItem" key={item.id}>
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  {/* 数量组件 */}
                  <Count
                    count={item.count}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Cart
```

2- 购物车增减逻辑实现

```javascript
// count增
increCount (state, action) {
  // 关键点：找到当前要修改谁的count id
  const item = state.cartList.find(item => item.id === action.payload.id)
  item.count++
},
// count减
decreCount (state, action) {
  // 关键点：找到当前要修改谁的count id
  const item = state.cartList.find(item => item.id === action.payload.id)
  if (item.count === 0) {
    return
  }
  item.count--
}
```

```jsx
<div className="skuBtnWrapper btnGroup">
  {/* 数量组件 */}
  <Count
    count={item.count}
    onPlus={() => dispatch(increCount({ id: item.id }))}
    onMinus={() => dispatch(decreCount({ id: item.id }))}
    />
</div>
```

3-清空购物车实现

```javascript
// 清除购物车
clearCart (state) {
  state.cartList = []
}
```

```jsx
<div className="header">
  <span className="text">购物车</span>
  <span 
    className="clearCart" 
    onClick={() => dispatch(clearCart())}>
    清空购物车
  </span>
</div>
```

## 9. 控制购物车显示和隐藏

![image.png](02React核心与项目实战.assets/20.png)

```jsx
// 控制购物车打开关闭的状态
const [visible, setVisible] = useState(false)

const onShow = () => {
  if (cartList.length > 0) {
    setVisible(true)
  }
}


{/* 遮罩层 添加visible类名可以显示出来 */}
<div
	className={
     classNames('cartOverlay', visible && 'visible')
  }
	onClick={() => setVisible(false)}
/>
```

# Day4-01.路由快速上手

## 1. 什么是前端路由

一个路径 path 对应一个组件 component 当我们在浏览器中访问一个 path 的时候，path 对应的组件会在页面中进行渲染

<img src="02React核心与项目实战.assets/1-17207535662211.png" alt="image.png" style="zoom: 80%;" />

## 2. 创建路由开发环境

```bash
# 使用CRA创建项目
npm create-react-app react-router-pro

# 安装最新的ReactRouter包
npm i react-router-dom

# 启动项目
npm run start
```

## 3. 快速开始

| <img src="02React核心与项目实战.assets/2-17207535662212.png" alt="image.png" style="zoom: 60%;" /> | <img src="02React核心与项目实战.assets/image-20240712113915878.png" alt="image-20240712113915878" style="zoom:50%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |



```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'

const router = createBrowserRouter([
  {
    path:'/login',
    element: <div>登录</div>
  },
  {
    path:'/article',
    element: <div>文章</div>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
```

# Day4-02.抽象路由模块

<img src="02React核心与项目实战.assets/3-17207535662215.png" alt="image.png" style="zoom: 55%;" />

| <img src="02React核心与项目实战.assets/image-20240712121115972.png" alt="image-20240712121115972" style="zoom:50%;" /> | <img src="02React核心与项目实战.assets/image-20240712121216980.png" alt="image-20240712121216980" style="zoom:50%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

# Day4-03.路由导航

## 1. 什么是路由导航

路由系统中的多个路由之间需要进行路由跳转，并且在跳转的同时有可能需要传递参数进行通信

<img src="02React核心与项目实战.assets/4-17207535662213.png" alt="image.png" style="zoom:50%;" />

## 2. 声明式导航

> 声明式导航是指通过在模版中通过 `<Link/> ` 组件描述出要跳转到哪里去，比如后台管理系统的左侧菜单通常使用这种方式进行

<img src="02React核心与项目实战.assets/5-17207535662214.png" alt="image.png" style="zoom: 40%;" />

| ![image-20240712121734607](02React核心与项目实战.assets/image-20240712121734607.png) | ![image-20240712121752302](02React核心与项目实战.assets/image-20240712121752302.png)![image-20240712121806557](02React核心与项目实战.assets/image-20240712121806557.png) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

语法说明：通过给组件的to属性指定要跳转到路由path，组件会被渲染为浏览器支持的a链接，如果需要传参直接通过字符串拼接的方式拼接参数即可

## 3. 编程式导航

编程式导航是指通过 `useNavigate` 钩子得到导航方法，然后通过调用方法以命令式的形式进行路由跳转，比如想在登录请求完毕之后跳转就可以选择这种方式，更加灵活

<img src="02React核心与项目实战.assets/6-17207535662216.png" alt="image.png" style="zoom:50%;" />

语法说明：通过调用navigate方法传入地址path实现跳转

# Day4-04.导航传参

<img src="02React核心与项目实战.assets/7-17207535662217.png" alt="image.png" style="zoom:50%;" />

| <img src="02React核心与项目实战.assets/image-20240712122854171.png" alt="image-20240712122854171" style="zoom:50%;" /> | <img src="02React核心与项目实战.assets/image-20240712122934849.png" alt="image-20240712122934849" style="zoom:50%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

# Day4-05.嵌套路由配置

## 1. 什么是嵌套路由

在一级路由中又内嵌了其他路由，这种关系就叫做嵌套路由，嵌套至一级路由内的路由又称作二级路由，例如：

<img src="02React核心与项目实战.assets/8-17207535662218.png" alt="image.png" style="zoom: 33%;" />

## 2. 嵌套路由配置

> 实现步骤
>
>     1. 使用 `children`属性配置路由嵌套关系  
>     2. 使用 `<Outlet/>` 组件配置二级路由渲染位置

| <img src="02React核心与项目实战.assets/9-17207535662219.png" alt="image.png" style="zoom: 50%;" /> | <img src="02React核心与项目实战.assets/image-20240712123700460.png" alt="image-20240712123700460" style="zoom:50%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

## 3. 默认二级路由

当访问的是一级路由时，默认的二级路由组件可以得到渲染，只需要在二级路由的位置去掉path，设置index属性为true

<img src="02React核心与项目实战.assets/10-172075356622110.png" alt="image.png" style="zoom:50%;" />

## 4. 404路由配置

场景：当浏览器输入url的路径在整个路由配置中都找不到对应的 path，为了用户体验，可以使用 404 兜底组件进行渲染

实现步骤：

1. 准备一个NotFound组件
2. 在路由表数组的末尾，以*号作为路由path配置路由

<img src="02React核心与项目实战.assets/11-172075356622111.png" alt="image.png" style="zoom: 50%;" />

## 5. 俩种路由模式

各个主流框架的路由常用的路由模式有俩种，history模式和hash模式, ReactRouter分别由 createBrowerRouter 和 createHashRouter 函数负责创建

| 路由模式 | url表现     | 底层原理                    | 是否需要后端支持 |
| -------- | ----------- | --------------------------- | ---------------- |
| history  | url/login   | history对象 + pushState事件 | 需要             |
| hash     | url/#/login | 监听hashChange事件          | 不需要           |

# Day4-09.记账本 环境搭建

<img src="02React核心与项目实战.assets/image-20240712124937276.png" alt="image-20240712124937276" style="zoom: 67%;" />

> 使用CRA创建项目，并安装必要依赖，包括下列基础包

1. Redux状态管理 -  @reduxjs/toolkit 、 react-redux
2. 路由 - react-router-dom
3. 时间处理 - dayjs
4. class类名处理 - classnames
5. 移动端组件库 - antd-mobile
6. 请求插件 - axios

# Day4-10.配置别名路径

## 1. 背景知识

> 1. 路径解析配置（webpack），把 @/ 解析为 src/
> 2. 路径联想配置（VsCode），VsCode 在输入 @/ 时，自动联想出来对应的 src/下的子级目录

![image.png](02React核心与项目实战.assets/12-172075358591213.png)

在使用 Webpack 时，可以通过配置别名路径来简化模块的引用。使用 `@` 符号作为别名路径是一种常见的做法，这样可以方便地引用项目中的特定目录（例如 `src` 目录）。以下是如何在 Webpack 中配置别名路径使用 `@` 符号的具体步骤。

1. **安装必要的依赖项**： 确保你已经安装了必要的依赖项，比如 `webpack` 和 `webpack-cli`。

2. **更新 Webpack 配置文件**：在你的项目根目录下的 `webpack.config.js` 文件中，添加 `resolve.alias` 配置，如下所示：

```javascript
const path = require('path');

module.exports = {
    // 其他配置选项
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    // 其他配置选项
};
```

这里使用 `path.resolve(__dirname, 'src')` 将 `@` 符号映射到项目根目录下的 `src` 目录。你可以根据实际的项目结构调整路径。

3. **使用别名路径**：配置完成后，你可以在你的代码中使用 `@` 符号别名来引用模块。例如：

```javascript
import MyComponent from '@/components/MyComponent';
```

这会被解析为 `src/components/MyComponent`。

这种方式可以使你的模块引用更加简洁和易于维护，特别是在大型项目中有明显的优势。

### 完整示例

假设你的项目结构如下：

```
project-root/
├── src/
│   ├── components/
│   │   └── MyComponent.js
│   └── index.js
├── webpack.config.js
└── package.json
```

在 `src/index.js` 中，你可以这样引用 `MyComponent`：

```javascript
import MyComponent from '@/components/MyComponent';

// 使用 MyComponent
```

通过以上步骤，你已经成功在 Webpack 中配置了别名路径 `@`，并且可以在代码中简洁地引用 `src` 目录下的模块了。
这条消息由Nova生成 - 免费下载:
https://novaappai.page.link/Jh7fZuEbeHN2u7qA7

## 2. 路径解析配置

配置步骤：

1. 安装craco
   npm i -D @craco/craco
2. 项目根目录下创建配置文件
   craco.config.js
3. 配置文件中添加路径解析配置
4. 包文件中配置启动和打包命令

<img src="02React核心与项目实战.assets/13-172075358591215.png" alt="image.png" style="zoom: 67%;" />

## 3. 联想路径配置

配置步骤：

1. 根目录下新增配置文件 - jsconfig.json
2. 添加路径提示配置

```json
{
  "compilerOptions":{
    "baseUrl":"./",
    "paths":{
      "@/*":[
        "src/*"
      ]
    }
  }
}
```

# Day4-11.数据Mock实现

> 在前后端分类的开发模式下，前端可以在没有实际后端接口的支持下先进行接口数据的模拟，进行正常的业务功能开发

## 1. 常见的Mock方式

![image.png](02React核心与项目实战.assets/14-172075358591214.png)

## 2. json-server实现Mock

实现步骤：

1.  项目中安装json-server
     npm i -D json-server 
2.  准备一个json文件 （素材里获取）
3.  添加启动命令 

![image.png](02React核心与项目实战.assets/15-172075358591317.png)

4.  访问接口进行测试 

# Day4-12.整体路由设计

<img src="02React核心与项目实战.assets/16-172075358591316.png" alt="image.png" style="zoom: 50%;" />

1. 俩个一级路由 （Layout / new）2. 俩个二级路由 （Layout - mouth/year）

# Day4-13.antD主题定制

## 1. 定制方案

<img src="02React核心与项目实战.assets/17-172075358591318.png" alt="image.png" style="zoom: 67%;" />

## 2. 实现方式

1. 全局定制

<img src="02React核心与项目实战.assets/18-172075358591319.png" alt="image.png" style="zoom: 60%;" />

2. 局部定制

<img src="02React核心与项目实战.assets/19-172075358591320.png" alt="image.png" style="zoom:60%;" />

## 3. 记账本主题色

```css
:root:root {
  --adm-color-primary: rgb(105, 174, 120);
}
```

# Day4-14.Redux管理账目列表

<img src="02React核心与项目实战.assets/20-172075358591321.png" alt="image.png" style="zoom:50%;" />

```javascript
// 账单列表相关store
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const billStore = createSlice({
  name: 'bill',
  // 数据状态state
  initialState: {
    billList: []
  },
  reducers: {
    // 同步修改方法
    setBillList (state, action) {
      state.billList = action.payload
    }
  }
})

// 解构actionCreater函数
const { setBillList } = billStore.actions
// 编写异步
const getBillList = () => {
  return async (dispatch) => {
    // 编写异步请求
    const res = await axios.get('http://localhost:8888/ka')
    // 触发同步reducer
    dispatch(setBillList(res.data))
  }
}

export { getBillList }
// 导出reducer
const reducer = billStore.reducer

export default reducer
```


```javascript
// 组合子模块 导出store实例

import { configureStore } from '@reduxjs/toolkit'
import billReducer from './modules/billStore'

const store = configureStore({
  reducer: {
    bill: billReducer
  }
})

export default store
```

```jsx
import router from './router'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
```

# Day4-15.TabBar功能实现

![image.png](02React核心与项目实战.assets/21.png)

## 1. 静态布局实现

配套静态模版和样式文件

```jsx
import { TabBar } from "antd-mobile"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { getBillList } from "@/store/modules/billStore"
import './index.scss'
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline
} from 'antd-mobile-icons'

const tabs = [
  {
    key: '/month',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
]

const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])
  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <TabBar>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Layout
```

```css
.layout {
  .container {
    position: fixed;
    top: 0;
    bottom: 50px;
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
```

## 2. 切换路由实现

> 监听change事件，在事件回调中调用路由跳转方法

```jsx
 // 切换菜单跳转路由
  const navigate = useNavigate()
  const swithRoute = (path) => {
    console.log(path)
    navigate(path)
  }

  return (
    <div className="layout">
      <div className="footer">
        <TabBar onChange={swithRoute}>
          {/* 省略... */}
        </TabBar>
      </div>
    </div>
  )
```

# Day5-01.月度账单-统计区域

<img src="02React核心与项目实战.assets/22.png" alt="image.png" style="zoom:67%;" />

## 1. 准备静态结构

```jsx
import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'

const Month = () => {
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">
              2023 | 3月账单
            </span>
            <span className='arrow expand'></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={false}
            max={new Date()}
          />
        </div>
      </div>
    </div >
  )
}

export default Month
```

```css
.monthlyBill {
  --ka-text-color: #191d26;
  height: 100%;
  background: linear-gradient(180deg, #ffffff, #f5f5f5 100%);
  background-size: 100% 240px;
  background-repeat: no-repeat;
  background-color: rgba(245, 245, 245, 0.9);
  color: var(--ka-text-color);

  .nav {
    --adm-font-size-10: 16px;
    color: #121826;
    background-color: transparent;
    .adm-nav-bar-back-arrow {
      font-size: 20px;
    }
  }

  .content {
    height: 573px;
    padding: 0 10px;
    overflow-y: scroll;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }

    > .header {
      height: 135px;
      padding: 20px 20px 0px 18.5px;
      margin-bottom: 10px;
      background-image: url(https://zqran.gitee.io/images/ka/month-bg.png);
      background-size: 100% 100%;

      .date {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        font-size: 16px;

        .arrow {
          display: inline-block;
          width: 7px;
          height: 7px;
          margin-top: -3px;
          margin-left: 9px;
          border-top: 2px solid #121826;
          border-left: 2px solid #121826;
          transform: rotate(225deg);
          transform-origin: center;
          transition: all 0.3s;
        }
        .arrow.expand {
          transform: translate(0, 2px) rotate(45deg);
        }
      }
    }
  }
  .twoLineOverview {
    display: flex;
    justify-content: space-between;
    width: 250px;

    .item {
      display: flex;
      flex-direction: column;

      .money {
        height: 24px;
        line-height: 24px;
        margin-bottom: 5px;
        font-size: 18px;
      }
      .type {
        height: 14px;
        line-height: 14px;
        font-size: 12px;
      }
    }
  }
}
```

## 2. 点击切换时间选择框

> 实现思路：
>
> 1. 准备一个状态数据
> 2. 点击切换状态
> 3. 根据状态控制弹框打开关闭以及箭头样式


```jsx
import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import {  useState } from "react"
import classNames from "classnames"

const Month = () => {
  // 控制时间选择器打开关闭
  const [dateVisible, setDateVisible] = useState(false)
  // 时间选择框确实事件
  const dateConfirm = (date) => {
    // 关闭弹框
    setDateVisible(false)
  }

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            {/* 省略.. */}
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
        
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            max={new Date()}
            onConfirm={dateConfirm}
          />
        </div>
      </div>
    </div >
  )
}

export default Month
```

## 3. 切换时间显示

<img src="02React核心与项目实战.assets/23.png" alt="image.png" style="zoom:67%;" />

> 实现思路：
>
> 1. 以当前时间作为默认值
> 2. 在时间切换时完成时间修改


```jsx
import dayjs from "dayjs"

const [currentMonth, setCurrentMonth] = useState(() => {
    return dayjs().format('YYYY-MM')
})

const dateConfirm = (date) => {
  setDateVisible(false)
  const month = dayjs(date).format('YYYY-MM')
  setCurrentMonth(month)
}
```

## 4. 统计功能实现

> 实现思路：
>
> 1. 按月分组
> 2. 根据获取到的时间作为key取当月的账单数组
> 3. 根据当月的账单数组计算支出、收入、总计

```jsx
// 按月分组
const billList = useSelector(state => state.bill.billList)
const monthGroup = useMemo(() => {
  return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
}, [billList])

// 根据获取到的时间作为key取当月的账单数组
const dateConfirm = (date) => {
  const monthKey = dayjs(date).format('YYYY-MM')
  setMonthList(monthGroup[monthKey])
}

// 计算统计
const overview = useMemo(() => {
  const income = currentMonthList.filter(item => item.type === 'income')
    .reduce((a, c) => a + c.money, 0)
  const pay = currentMonthList.filter(item => item.type === 'pay')
    .reduce((a, c) => a + c.money, 0)
  return {
    income,
    pay,
    total: income + pay
  }
}, [currentMonthList])
```

## 5. 完整代码

```jsx
import { useSelector } from "react-redux"
import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import _ from 'lodash'
import dayjs from "dayjs"
import { useMemo, useState } from "react"
import { useEffect } from "react"
import classNames from "classnames"

const Month = () => {
  // 按月分组
  const billList = useSelector(state => state.bill.billList)
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
  }, [billList])

  // 控制时间选择器打开关闭
  const [dateVisible, setDateVisible] = useState(false)
  const [currentMonthList, setMonthList] = useState([])
  const [currentMonth, setCurrentMonth] = useState(() => {
    return dayjs().format('YYYY-MM')
  })

  const dateConfirm = (date) => {
    setDateVisible(false)
    const monthKey = dayjs(date).format('YYYY-MM')
    setCurrentMonth(monthKey)
    setMonthList(monthGroup[monthKey])
  }

  // 首次加载
  useEffect(() => {
    const list = monthGroup[dayjs().format('YYYY-MM')]
    if(list){
      setMonthList(list)
    }
  }, [monthGroup])

  // 计算统计
  const overview = useMemo(() => {
    if (!currentMonthList) return { income: 0, pay: 0, total: 0 }
    const income = currentMonthList.filter(item => item.type === 'income')
      .reduce((a, c) => a + c.money, 0)
    const pay = currentMonthList.filter(item => item.type === 'pay')
      .reduce((a, c) => a + c.money, 0)
    return {
      income,
      pay,
      total: income + pay
    }
  }, [currentMonthList])

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              {currentMonth} 账单
            </span>
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{overview.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{overview.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{(overview.total).toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            max={new Date()}
            onConfirm={dateConfirm}
          />
        </div>
      </div>
    </div >
  )
}

export default Month
```

# Day5-07.月度账单-单日统计列表实现

<img src="02React核心与项目实战.assets/24.png" alt="image.png" style="zoom: 50%;" />

## 1. 准备组件和配套样式

```jsx
import classNames from 'classnames'
import './index.scss'

const DailyBill = () => {
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{'03月23日'}</span>
          <span className={classNames('arrow')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{100}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{200}</span>
          </div>
          <div className="balance">
            <span className="money">{100}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DailyBill
```

配套样式

```css
.dailyBill {
  margin-bottom: 10px;
  border-radius: 10px;
  background: #ffffff;

  .header {
    --ka-text-color: #888c98;
    padding: 15px 15px 10px 15px;

    .dateIcon {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 21px;
      margin-bottom: 9px;
      .arrow {
        display: inline-block;
        width: 5px;
        height: 5px;
        margin-top: -3px;
        margin-left: 9px;
        border-top: 2px solid #888c98;
        border-left: 2px solid #888c98;
        transform: rotate(225deg);
        transform-origin: center;
        transition: all 0.3s;
      }
      .arrow.expand {
        transform: translate(0, 2px) rotate(45deg);
      }

      .date {
        font-size: 14px;
      }
    }
  }
  .oneLineOverview {
    display: flex;
    justify-content: space-between;

    .pay {
      flex: 1;
      .type {
        font-size: 10px;
        margin-right: 2.5px;
        color: #e56a77;
      }
      .money {
        color: var(--ka-text-color);
        font-size: 13px;
      }
    }

    .income {
      flex: 1;
      .type {
        font-size: 10px;
        margin-right: 2.5px;
        color: #4f827c;
      }
      .money {
        color: var(--ka-text-color);
        font-size: 13px;
      }
    }

    .balance {
      flex: 1;
      margin-bottom: 5px;
      text-align: right;

      .money {
        line-height: 17px;
        margin-right: 6px;
        font-size: 17px;
      }
      .type {
        font-size: 10px;
        color: var(--ka-text-color);
      }
    }
  }

  .billList {
    padding: 15px 10px 15px 15px;
    border-top: 1px solid #ececec;
    .bill {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 43px;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .icon {
        margin-right: 10px;
        font-size: 25px;
      }
      .detail {
        flex: 1;
        padding: 4px 0;
        .billType {
          display: flex;
          align-items: center;
          height: 17px;
          line-height: 17px;
          font-size: 14px;
          padding-left: 4px;
        }
      }
      .money {
        font-size: 17px;

        &.pay {
          color: #ff917b;
        }
        &.income {
          color: #4f827c;
        }
      }
    }
  }
}
.dailyBill.expand {
  .header {
    border-bottom: 1px solid #ececec;
  }
  .billList {
    display: block;
  }
}
```

## 2. 按日分组账单数据

<img src="02React核心与项目实战.assets/25.png" alt="image.png" style="zoom:50%;" />

```javascript
// 把当前月按日分组账单数据
  const dayGroup = useMemo(() => {
    const group = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
    return {
      dayKeys: Object.keys(group),
      group
    }
  }, [currentMonthList])
  console.log(dayGroup)
```

## 3. 遍历日账单组件并传入参数

```jsx
 {/* 日账单 */}
{dayGroup.dayKeys.map(dayKey => (
  <DailyBill key={dayKey} date={dayKey} billList={dayGroup.group[dayKey]} />
))}
```

## 4. 接收数据计算统计渲染页面

```jsx
const DailyBill = ({ date, billList }) => {
  const dayResult = useMemo(() => {
    // 支出  /  收入  / 结余
    const pay = billList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }
  }, [billList])
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyBill
```

# Day5-08.月度账单-单日账单列表展示（看到这一节处）

<img src="02React核心与项目实战.assets/26.png" alt="image.png" style="zoom:50%;" />

## 1. 渲染基础列表

```jsx
{/* 单日列表 */}
<div className="billList">
  {billList.map(item => {
    return (
      <div className="bill" key={item.id}>
        <div className="detail">
          <div className="billType">{item.useFor}</div>
        </div>
        <div className={classNames('money', item.type)}>
          {item.money.toFixed(2)}
        </div>
      </div>
    )
  })}
</div>
```

## 2. 适配Type

1-准备静态数据

```javascript
export const billListData = {
  pay: [
    {
      type: 'foods',
      name: '餐饮',
      list: [
        { type: 'food', name: '餐费' },
        { type: 'drinks', name: '酒水饮料' },
        { type: 'dessert', name: '甜品零食' },
      ],
    },
    {
      type: 'taxi',
      name: '出行交通',
      list: [
        { type: 'taxi', name: '打车租车' },
        { type: 'longdistance', name: '旅行票费' },
      ],
    },
    {
      type: 'recreation',
      name: '休闲娱乐',
      list: [
        { type: 'bodybuilding', name: '运动健身' },
        { type: 'game', name: '休闲玩乐' },
        { type: 'audio', name: '媒体影音' },
        { type: 'travel', name: '旅游度假' },
      ],
    },
    {
      type: 'daily',
      name: '日常支出',
      list: [
        { type: 'clothes', name: '衣服裤子' },
        { type: 'bag', name: '鞋帽包包' },
        { type: 'book', name: '知识学习' },
        { type: 'promote', name: '能力提升' },
        { type: 'home', name: '家装布置' },
      ],
    },
    {
      type: 'other',
      name: '其他支出',
      list: [{ type: 'community', name: '社区缴费' }],
    },
  ],
  income: [
    {
      type: 'professional',
      name: '其他支出',
      list: [
        { type: 'salary', name: '工资' },
        { type: 'overtimepay', name: '加班' },
        { type: 'bonus', name: '奖金' },
      ],
    },
    {
      type: 'other',
      name: '其他收入',
      list: [
        { type: 'financial', name: '理财收入' },
        { type: 'cashgift', name: '礼金收入' },
      ],
    },
  ],
}

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
  billListData[key].forEach(bill => {
    bill.list.forEach(item => {
      prev[item.type] = item.name
    })
  })
  return prev
}, {})
```

2-适配type

```javascript
 <div className="billType">{billTypeToName[item.useFor]}</div>
```

# Day5-08.月度账单-切换打开关闭

![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1680169396175-a10287d1-cc4a-4464-b295-aea0becb3805.png#averageHue=%23fcfcfc&clientId=u4bda8888-0a67-4&from=paste&height=98&id=u1d780ff6&name=image.png&originHeight=196&originWidth=736&originalType=binary&ratio=2&rotation=0&showTitle=false&size=15931&status=done&style=none&taskId=uc682e670-0453-45ac-9d64-b891c330814&title=&width=368)

![image.png](02React核心与项目实战.assets/27.png)

```jsx
// 声明状态
const [visible, setVisible] = useState(false)

// 控制箭头
 <span 
   className={classNames('arrow', !visible && 'expand')} 
   onClick={() => setVisible(!visible)}></span>
     
// 控制列表显示
<div className="billList" style={{ display: !visible && 'none' }}></div>
```

# Day5-08.月度账单-Icon组件封装

![image.png](02React核心与项目实战.assets/28.png)

## 1. 准备静态结构

```jsx
const Icon = () => {
  return (
    <img
      src={`https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/food.svg`}
      alt="icon"
      style={{
        width: 20,
        height: 20,
      }}
      />
  )
}

export default Icon
```

## 2. 设计参数

```jsx
const BASE_URL = 'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/'

const Icon = ({ type }) => {
  return (
    <img
      src={`${BASE_URL + type}.svg`}
      alt="icon"
      style={{
        width: 20,
        height: 20,
      }}
    />
  )
}

export default Icon
```

## 3. 使用组件

```jsx
<div className="billList" style={{ display: visible ? 'block' : 'none' }}>
    {billList.map(item => {
      return (
        <div className="bill" key={item.id}>
          <Icon type={item.useFor} />
        </div>
      )
    })}
  </div>
```

# Day5-08.记账功能

## 记账 - 结构渲染

```jsx
import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'

const New = () => {
  const navigate = useNavigate()
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames('selected')}
          >
            支出
          </Button>
          <Button
            className={classNames('')}
            shape="rounded"
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{'今天'}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData['pay'].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        ''
                      )}
                      key={item.type}

                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save">
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New
```

配套样式

```css
.keepAccounts {
  --ka-bg-color: #daf2e1;
  --ka-color: #69ae78;
  --ka-border-color: #191d26;

  height: 100%;
  background-color: var(--ka-bg-color);

  .nav {
    --adm-font-size-10: 16px;
    color: #121826;
    background-color: transparent;
    &::after {
      height: 0;
    }

    .adm-nav-bar-back-arrow {
      font-size: 20px;
    }
  }

  .header {
    height: 132px;

    .kaType {
      padding: 9px 0;
      text-align: center;

      .adm-button {
        --adm-font-size-9: 13px;

        &:first-child {
          margin-right: 10px;
        }
      }
      .selected {
        color: #fff;
        --background-color: var(--ka-border-color);
      }
    }

    .kaFormWrapper {
      padding: 10px 22.5px 20px;

      .kaForm {
        display: flex;
        padding: 11px 15px 11px 12px;
        border: 0.5px solid var(--ka-border-color);
        border-radius: 9px;
        background-color: #fff;

        .date {
          display: flex;
          align-items: center;
          height: 28px;
          padding: 5.5px 5px;
          border-radius: 4px;
          // color: #4f825e;
          color: var(--ka-color);
          background-color: var(--ka-bg-color);

          .icon {
            margin-right: 6px;
            font-size: 17px;
          }
          .text {
            font-size: 16px;
          }
        }

        .kaInput {
          flex: 1;
          display: flex;
          align-items: center;

          .input {
            flex: 1;
            margin-right: 10px;
            --text-align: right;
            --font-size: 24px;
            --color: var(--ka-color);
            --placeholder-color: #d1d1d1;
          }

          .iconYuan {
            font-size: 24px;
          }
        }
      }
    }
  }

  .container {
  }
  .kaTypeList {
    height: 490px;
    padding: 20px 11px;
    padding-bottom: 70px;
    overflow-y: scroll;
    background: #ffffff;
    border-radius: 20px 20px 0 0;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }

    .kaType {
      margin-bottom: 25px;
      font-size: 12px;
      color: #333;

      .title {
        padding-left: 5px;
        margin-bottom: 5px;
        font-size: 13px;
        color: #808080;
      }
      .list {
        display: flex;

        .item {
          width: 65px;
          height: 65px;
          padding: 9px 0;
          margin-right: 7px;
          text-align: center;
          border: 0.5px solid #fff;
          &:last-child {
            margin-right: 0;
          }

          .icon {
            height: 25px;
            line-height: 25px;
            margin-bottom: 5px;
            font-size: 25px;
          }
        }
        .item.selected {
          border: 0.5px solid var(--ka-border-color);
          border-radius: 5px;
          background: var(--ka-bg-color);
        }
      }
    }
  }

  .btns {
    position: fixed;
    bottom: 15px;
    width: 100%;
    text-align: center;

    .btn {
    width: 200px;
    --border-width: 0;
    --background-color: #fafafa;
    --text-color: #616161;
    &:first-child {
    margin-right: 15px;
    }
    }
    .btn.save {
    --background-color: var(--ka-bg-color);
    --text-color: var(--ka-color);
    }
    }
  }

```

## 记账 - 支出和收入切换

```jsx
const new = ()=>{
  // 1. 区分账单状态
  const [billType, setBillType] = useState('income')
  return (
     <div className="keepAccounts">
      <div className="kaType">
        {/* 2. 点击切换状态 */}
        <Button
          shape="rounded"
          className={classNames(billType==='pay'?'selected':'')}
          onClick={() => setBillType('pay')}
        >
          支出
        </Button>
        <Button
          className={classNames(billType==='income'?'selected':'')}
          onClick={() => setBillType('income')}
          shape="rounded"
        >
          收入
        </Button>
      </div>
      {/* 2. 适配数据 */}
      <div className="kaTypeList">
          {billListData[billType].map(item => {
            
          })}
      </div>
    </div>
  )
}
```

## 记账 - 新增一笔

```jsx
import { useDispatch } from 'react-redux'

const New = () => {
  // 收集金额
  const [money, setMoney] = useState(0)
  const moneyChange = (value) => {
    setMoney(value)
  }

  // 收集账单类型
  const [useFor, setUseFor] = useState('')
  const dispatch = useDispatch()
  // 保存账单
  const saveBill = () => {
    // 收集表单数据
    const data = {
      type: billType,
      money: billType === 'pay' ? -money : +money,
      date: new Date(),
      useFor: useFor
    }
    console.log(data)
    dispatch(addBillList(data))
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected' : '')}
            onClick={() => setBillType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => setBillType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{'今天'}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* 数据区域 */}
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        ''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New
```

# Day6-01.项目搭建

## 基于CRA创建项目

> CRA是一个底层基于webpack快速创建React项目的脚手架工具

```bash
# 使用npx创建项目
npx create-react-app react-jike

# 进入到项
cd react-jike

# 启动项目
npm start
```

<img src="02React核心与项目实战.assets/01-17210196519621.png" alt="image.png" style="zoom: 25%;" />

## 调整项目目录结构 

```bash
-src
  -apis           项目接口函数
  -assets         项目资源文件，比如，图片等
  -components     通用组件
  -pages          页面组件
  -store          集中状态管理
  -utils          工具，比如，token、axios 的封装等
  -App.js         根组件
  -index.css      全局样式
  -index.js       项目入口
```

<img src="02React核心与项目实战.assets/image-20240715132849797.png" alt="image-20240715132849797" style="zoom: 67%;" />

`src/index.js`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import './App.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)
```

`src/App.js`

```jsx
const App = () => {
  return <div>this is app</div>
}

export default App
```

# Day6-02.使用scss预处理器

> `SASS` 是一种预编译的 CSS，支持一些比较高级的语法，可以提高编写样式的效率，CRA接入scss非常简单只需要我们装一个sass工具


**实现步骤**

1.  安装解析 sass 的包：`npm i sass -D` 
2.  创建全局样式文件：`index.scss` 

```css
body {
  margin: 0;
  div {
    color: blue;
  }
}
```

# Day6-03.组件库antd使用

> 我们的项目是一个传统的PC管理后台，有现成的组件库可以使用，帮助我们提升开发效率，其中使用最广的就是antD

[Ant Design of React - Ant Design](https://ant.design/docs/react/introduce-cn)
**实现步骤**

1. 安装 antd 组件库：`npm i antd`
2. 导入 Button 组件
3. 在 Login 页面渲染 Button 组件进行测试

**测试Button**
`pages/Login/index.jsx`

```jsx
import { Button } from 'antd'

const Login = () => {
  return <div>this is login<Button type='primary'>test</Button></div>
}
export default Login
```

![image.png](02React核心与项目实战.assets/02-17210196519632.png)

# Day6-03.配置基础路由

> 单页应用需要对应的路由支持，我们使用 `react-router-dom` 最新版本
>
> `react-router-dom` 是 React 的一个库，用于在 React 应用程序中实现客户端路由。它提供了一组组件和钩子，帮助你在单页应用程序（SPA）中实现导航和路由。
>
> [React Router 中文文档](https://react-guide.github.io/react-router-cn/)

**实现步骤**

1. 安装路由包  `npm i react-router-dom`
2. 准备 `Layout`和 `Login`俩个基础组件
3. 配置路由

**代码实现**
`pages/Layout/index.js`

```jsx
const Layout = () => {
  return <div>this is layout</div>
}
export default Layout
```

`pages/Login/index.js`

```jsx
const Login = () => {
  return <div>this is login</div>
}
export default Login
```

`router/index.js`

```jsx
import { createBrowserRouter } from 'react-router-dom'

import Login from '../pages/Login'
import Layout from '../pages/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
```

`index.js`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import router from './router'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
```

> react-router-dom和react-router有什么区别？
>
> `react-router-dom` 和 `react-router` 是 React 应用程序中实现路由功能的两个不同的包，它们之间有一些区别和用途上的不同。下面是它们的主要区别和使用场景：
>
> ### 1. `react-router`
>
> `react-router` 是一个核心库，它提供了所有路由的基础功能。它可以用于任何 React 项目，无论是 Web 端还是原生应用（React Native）。`react-router` 包含了所有实现路由功能所需的基本组件和钩子，但它不包含任何与浏览器或平台相关的功能。
>
> **主要组件和钩子**：
>
> - `<Router>`
> - `<Route>`
> - `<Switch>`
> - `<Redirect>`
> - `useHistory`
> - `useLocation`
> - `useParams`
> - `useRouteMatch`
>
> ### 2. `react-router-dom`
>
> `react-router-dom` 是基于 `react-router` 的一个扩展包，专门为 Web 应用程序提供路由功能。它在 `react-router` 的基础上添加了一些特定于 DOM（Document Object Model）的功能和组件，例如 `<BrowserRouter>` 和 `<Link>`。这些组件和功能是为了与浏览器环境配合使用而设计的。
>
> **主要组件**：
>
> - `<BrowserRouter>`：使用 HTML5 的 History API 实现客户端路由。
> - `<HashRouter>`：使用 URL 哈希部分（window.location.hash）实现客户端路由。
> - `<Link>`：用于创建导航链接，避免使用 `<a>` 标签引起的页面刷新。
> - `<NavLink>`：类似于 `<Link>`，但可以添加样式或标记当前活动的链接。
>
> ### 示例对比
>
> #### 使用 `react-router` 的基本示例：
>
> ```jsx
> import React from 'react';
> import { Router, Route, Switch } from 'react-router';
> import { createBrowserHistory } from 'history';
> 
> const history = createBrowserHistory();
> 
> const Home = () => <h2>Home</h2>;
> const About = () => <h2>About</h2>;
> 
> function App() {
>   return (
>     <Router history={history}>
>       <Switch>
>         <Route path="/about">
>           <About />
>         </Route>
>         <Route path="/">
>           <Home />
>         </Route>
>       </Switch>
>     </Router>
>   );
> }
> 
> export default App;
> ```
>
> #### 使用 `react-router-dom` 的基本示例：
>
> ```jsx
> import React from 'react';
> import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
> 
> const Home = () => <h2>Home</h2>;
> const About = () => <h2>About</h2>;
> 
> function App() {
>   return (
>     <Router>
>       <div>
>         <nav>
>           <ul>
>             <li>
>               <Link to="/">Home</Link>
>             </li>
>             <li>
>               <Link to="/about">About</Link>
>             </li>
>           </ul>
>         </nav>
> 
>         <Switch>
>           <Route path="/about">
>             <About />
>           </Route>
>           <Route path="/">
>             <Home />
>           </Route>
>         </Switch>
>       </div>
>     </Router>
>   );
> }
> 
> export default App;
> ```
>
> ### 选择使用哪个包？
>
> - 如果你在开发一个 Web 应用程序，那么你应该使用 `react-router-dom`。它提供了所有 `react-router` 的核心功能，并且增加了一些专门为浏览器环境设计的组件。
> - 如果你在开发一个非 Web 应用程序，例如 React Native 应用程序，那么你应该使用 `react-router` 或者其他适用于该平台的路由库（例如 `react-navigation`）。
>
> ### 总结
>
> `react-router` 是基础路由库，适用于任何 React 应用程序。`react-router-dom` 是 `react-router` 的扩展，专门为 Web 应用程序提供路由功能。如果你在开发 Web 应用，使用 `react-router-dom` 是更合适的选择

# Day6-04.配置别名路径

> 项目背景：在业务开发过程中文件夹的嵌套层级可能会比较深，通过传统的路径选择会比较麻烦也容易出错，设置路径别名可以简化这个过程

## 路径编译配置

1. 安装 `craco` 工具包
2. 增加 `craco.config.js` 配置文件
3. 修改 `scripts 命令`
4. 测试是否生效

```bash
npm i @craco/craco -D
```

```javascript
const path = require('path')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    }
  }
}
```

```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "react-scripts eject"
}
```

```javascript
import { createBrowserRouter } from 'react-router-dom'

import Login from '@/pages/Login'
import Layout from '@/pages/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
```

## VsCode提示配置

**实现步骤**

1. 在项目根目录创建 `jsconfig.json` 配置文件
2. 在配置文件中添加以下配置

**代码实现**

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

:::warning
说明：VSCode会自动读取`jsconfig.json` 中的配置，让vscode知道@就是src目录
:::

# 使用gitee管理项目

# Day6-07.基本结构搭建

<img src="02React核心与项目实战.assets/03-17210300976863.png" alt="image.png" style="zoom:50%;" />

**实现步骤**

1. 在 `Login/index.js` 中创建登录页面基本结构
2. 在 Login 目录中创建 index.scss 文件，指定组件样式
3. 将 `logo.png` 和 `login.png` 拷贝到 assets 目录中

**代码实现**
`pages/Login/index.js`

```jsx
import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'

const Login = () => {
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form>
          <Form.Item>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
```

`pages/Login/index.scss`

```css
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: center/cover url('~@/assets/login.png');

  .login-logo {
    width: 200px;
    height: 60px;
    display: block;
    margin: 0 auto 20px;
  }

  .login-container {
    width: 440px;
    height: 360px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 50px rgb(0 0 0 / 10%);
  }

  .login-checkbox-label {
    color: #1890ff;
  }
}

```

# Day6-08.表单校验实现

<img src="02React核心与项目实战.assets/04-17210300976874.png" alt="image.png" style="zoom: 43%;" />

**实现步骤**

1. 为 Form 组件添加 `validateTrigger` 属性，指定校验触发时机的集合
2. **为 Form.Item 组件添加 name 属性**
3. 为 Form.Item 组件添加 `rules` 属性，用来添加表单校验规则对象

**代码实现**
`page/Login/index.js`

```jsx
const Login = () => {
  return (
    <Form validateTrigger={['onBlur']}>
      <Form.Item
        name="mobile"
        rules={[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号码格式不对'
          }
        ]}
      >
        <Input size="large" placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item
        name="code"
        rules={[
          { required: true, message: '请输入验证码' },
        ]}
      >
        <Input size="large" placeholder="请输入验证码" maxLength={6} />
      </Form.Item>
    
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
```

# Day6-09.获取登录表单数据

**实现步骤**

1. 为 Form 组件添加 `onFinish` 属性，该事件会在点击登录按钮时触发
2. 创建 onFinish 函数，通过函数参数 values 拿到表单值
3. Form 组件添加 `initialValues` 属性，来初始化表单值

**代码实现**
`pages/Login/index.js`

```jsx
// 点击登录按钮时触发 参数values即是表单输入数据
const onFinish = formValue => {
  console.log(formValue)
}

<Form
  onFinish={ onFinish }
>...</Form>
```

<img src="02React核心与项目实战.assets/05-17210300976875.png" alt="image.png" style="zoom: 50%;" />

# Day6-10.封装request工具模块

> 业务背景: 前端需要和后端拉取接口数据，axios是使用最广的工具插件，针对于项目中的使用，我们需要做一些简单的封装

<img src="02React核心与项目实战.assets/image-20240715162821026.png" alt="image-20240715162821026" style="zoom:67%;" />

**实现步骤**

1. 安装 axios 到项目  
2. 创建 utils/request.js 文件
3. 创建 axios 实例，配置 `baseURL，请求拦截器，响应拦截器` 
4. 在 utils/index.js 中，统一导出request

```bash
npm i axios
```

```javascript
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use((config)=> {
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

export { http }
```

```javascript
import { request } from './request'
export { request }
```

[Axios](https://axios-http.com/zh/)

# Day6-11.使用Redux管理token

## 安装Redux相关工具包 

```bash
npm i react-redux @reduxjs/toolkit
```

## 配置Redux

```javascript
// src/store/modules/user.js
import { createSlice } from '@reduxjs/toolkit'
import { http } from '@/utils'
const userStore = createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    token:''
  },
  // 同步修改方法
  reducers: {
    setUserInfo (state, action) {
      state.userInfo = action.payload
    }
     setToken (state, action) {
      state.token = action.payload
    }
  }
})

// 解构出actionCreater
const { setUserInfo, setToken } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法封装
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await http.post('/authorizations', loginForm)
    dispatch(setUserInfo(res.data.token))
  }
}

export { fetchLogin }

export default userReducer
```

```javascript
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit'

import userReducer from './modules/user'

export default configureStore({
  reducer: {
    // 注册子模块
    user: userReducer
  }
})
```

# Day6-13.实现登录逻辑

> 业务逻辑：
>
> 1. 跳转到首页
> 2. 提示用户登录成功

```jsx
import { message } from 'antd'
import useStore from '@/store'
import { fetchLogin } from '@/store/modules/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async formValue => {
    await dispatch(fetchLogin(formValue))
    navigate('/')
    message.success('登录成功')
  }
  return (
    <div className="login">
     <!-- 省略... -->
    </div>
  )
}

export default Login
```

# Day6-14.token持久化

> 业务背景: Token数据具有一定的时效时间，通常在几个小时，有效时间内无需重新获取，而基于Redux的存储方式又是基于内存的，刷新就会丢失，为了保持持久化，我们需要单独做处理

<img src="02React核心与项目实战.assets/image-20240715171318028.png" alt="image-20240715171318028" style="zoom:50%;" />

## 封装存取方法

```javascript
// 封装存取方法
const TOKENKEY = 'token_key'

function setToken (token) {
  return localStorage.setItem(TOKENKEY, token)
}

function getToken () {
  return localStorage.getItem(TOKENKEY)
}

function clearToken () {
  return localStorage.removeItem(TOKENKEY)
}

export {
  setToken,
  getToken,
  clearToken
}
```

## 实现持久化逻辑

```javascript
import { getToken, setToken } from '@/utils'
const userStore = createSlice({
  name: 'user',
  // 数据
  initialState: {
    token: getToken() || ''
  },
  // 同步修改方法
  reducers: {
    setUserInfo (state, action) {
      state.token = action.payload
      // 存入本地
      setToken(state.token)
    }
  }
})
```

刷新浏览器，通过Redux调试工具查看token数据
![image.png](02React核心与项目实战.assets/06-17210300976876.png)

# Day7-01.请求拦截器注入token

> 业务背景: Token作为用户的数据标识，在接口层面起到了接口权限控制的作用，也就是说后端有很多接口都需要通过查看当前请求头信息中是否含有token数据，来决定是否正常返回数据

<img src="02React核心与项目实战.assets/image-20240715174140983.png" alt="image-20240715174140983" style="zoom:50%;" />

<img src="02React核心与项目实战.assets/07-17210300976877.png" alt="token.png" style="zoom:50%;" />

> 拼接方式：config.headers.Authorization = `Bearer ${token}}`


`utils/request.js`

```javascript
// 添加请求拦截器
request.interceptors.request.use(config => {
  // if not login add token
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

![image-20240715174610354](02React核心与项目实战.assets/image-20240715174610354.png)

> headers.Authorization
>
> 在Web开发中，`headers.Authorization` 通常用于在HTTP请求中传递身份验证信息。这个头部（header）字段通常包含一个令牌（token），该令牌用来验证请求的合法性。最常见的用法是在使用Bearer Token的身份验证机制中。以下是一些常见的用法和示例：
>
> ### 1. 使用 Fetch API 发送带有 Authorization 头部的请求
>
> ```javascript
> const token = 'your-token-here';
> 
> fetch('https://api.example.com/protected-resource', {
>   method: 'GET', // 或者 'POST', 'PUT', 'DELETE', 等等
>   headers: {
>     'Authorization': `Bearer ${token}`,
>     'Content-Type': 'application/json'
>   }
> })
> .then(response => response.json())
> .then(data => console.log(data))
> .catch(error => console.error('Error:', error));
> ```
>
> ### 2. 使用 Axios 发送带有 Authorization 头部的请求
>
> ```javascript
> const axios = require('axios');
> 
> const token = 'your-token-here';
> 
> axios.get('https://api.example.com/protected-resource', {
>   headers: {
>     'Authorization': `Bearer ${token}`
>   }
> })
> .then(response => console.log(response.data))
> .catch(error => console.error('Error:', error));
> ```
>
> ### 3. 使用 XMLHttpRequest 发送带有 Authorization 头部的请求
>
> ```javascript
> const token = 'your-token-here';
> 
> const xhr = new XMLHttpRequest();
> xhr.open('GET', 'https://api.example.com/protected-resource', true);
> xhr.setRequestHeader('Authorization', `Bearer ${token}`);
> xhr.setRequestHeader('Content-Type', 'application/json');
> 
> xhr.onload = function() {
>   if (xhr.status >= 200 && xhr.status < 300) {
>     console.log(JSON.parse(xhr.responseText));
>   } else {
>     console.error('Error:', xhr.statusText);
>   }
> };
> 
> xhr.send();
> ```
>
> ### Authorization 头部的格式
>
> - **Basic Authentication**：使用基本身份验证时，`Authorization` 头部包含 `Basic` 关键字，后面跟着一个Base64编码的用户名和密码的组合。
>   
>   ```javascript
>   const username = 'your-username';
>   const password = 'your-password';
>   const base64Credentials = btoa(`${username}:${password}`);
>   
>   const headers = new Headers();
>   headers.append('Authorization', `Basic ${base64Credentials}`);
>   ```
>
> - **Bearer Token Authentication**：使用 Bearer Token 时，`Authorization` 头部包含 `Bearer` 关键字，后面跟着Token。
>   
>   ```javascript
>   const token = 'your-token-here';
>   const headers = new Headers();
>   headers.append('Authorization', `Bearer ${token}`);
>   ```
>
> ### 示例应用场景
>
> #### 1. 访问受保护的API端点
> 许多API提供商要求在请求中包含`Authorization`头部来访问受保护的资源。例如，GitHub的API要求在请求头中包含OAuth令牌。
>
> #### 2. 验证用户身份
> 在应用程序中，可以使用JWT（JSON Web Token）来验证用户身份。服务器在用户登录时生成一个JWT，并在后续请求中将该JWT包含在`Authorization`头部，以验证用户身份。
>
> 通过使用 `headers.Authorization`，你可以在HTTP请求中传递必要的身份验证信息，从而确保请求的安全性和合法性。

# [Day7-02.路由鉴权实现——高阶组件](https://www.bilibili.com/video/BV1ZB4y1Z7o8?p=97&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

> 业务背景：封装 `AuthRoute` 路由鉴权高阶组件，实现未登录拦截，并跳转到登录页面
> 实现思路：判断本地是否有token，如果有，就返回子组件，否则就重定向到登录Login

| <img src="02React核心与项目实战.assets/image-20240715185757793.png" alt="image-20240715185757793" style="zoom:50%;" /> | <img src="02React核心与项目实战.assets/image-20240715185941443.png" alt="image-20240715185941443" style="zoom: 67%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

**实现步骤**

1. 在 components 目录中，创建 `AuthRoute/index.jsx` 文件
2. 登录时，直接渲染相应页面组件
3. 未登录时，重定向到登录页面
4. 将需要鉴权的页面路由配置，替换为 AuthRoute 组件渲染

**代码实现**
`components/AuthRoute/index.jsx`

```jsx
// 高阶组件
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

// 传过来的children是路由组件
const AuthRoute = ({ children }) => {
  const isToken = getToken()
  if (isToken) {
    return <>{children}</>
  } else {
    // 重定向组件
    return <Navigate to="/login" replace />
  }
}

export default AuthRoute
```

`src/router/index.jsx`

```jsx
import { createBrowserRouter } from 'react-router-dom'

import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import AuthRoute from '@/components/Auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
```

# Day7-03.基本结构和样式reset（看到此处。。。。。。。）

## 结构创建

<img src="02React核心与项目实战.assets/08-17210417197488.png" alt="image.png" style="zoom: 33%;" />

**实现步骤**

1. 打开 `antd/Layout` 布局组件文档，找到示例：顶部-侧边布局-通栏
2. 拷贝示例代码到我们的 Layout 页面中
3. 分析并调整页面布局

**代码实现**
`pages/Layout/index.js`

```jsx
import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'

const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '1',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '2',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '3',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">柴柴老师</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          内容
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout
```

`pages/Layout/index.scss`

```css
.ant-layout {
  height: 100%;
}

.header {
  padding: 0;
}

.logo {
  width: 200px;
  height: 60px;
  background: url('~@/assets/logo.png') no-repeat center / 160px auto;
}

.layout-content {
  overflow-y: auto;
}

.user-info {
  position: absolute;
  right: 0;
  top: 0;
  padding-right: 20px;
  color: #fff;
  
  .user-name {
    margin-right: 20px;
  }
  
  .user-logout {
    display: inline-block;
    cursor: pointer;
  }
}
.ant-layout-header {
  padding: 0 !important;
}
```

## 样式reset

```bash
npm install normalize.css
```

```css
html,
body {
  margin: 0;
  height: 100%;
}

#root {
  height: 100%;
}
```

# 二级路由配置

**使用步骤**

1. 在 pages 目录中，分别创建：Home（数据概览）/Article（内容管理）/Publish（发布文章）页面文件夹
2. 分别在三个文件夹中创建 index.jsx 并创建基础组件后导出
3. 在`router/index.js` 中配置嵌套子路由，在`Layout`中配置二级路由出口
4. 使用 Link 修改左侧菜单内容，与子路由规则匹配实现路由切换

**代码实现**
`pages/Home/index.js`

```jsx
const Home = () => {
  return <div>Home</div>
}
export default Home
```

`pages/Article/index.js`

```jsx
const Article = () => {
  return <div>Article</div>
}
export default Article
```

`pages/Publish/index.js`

```jsx
const Publish = () => {
  return <div>Publish</div>
}
export default Publish
```

`router/index.js`

```jsx
import { createBrowserRouter } from 'react-router-dom'

import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Publish from '@/pages/Publish'
import Article from '@/pages/Article'
import Home from '@/pages/Home'
import { AuthRoute } from '@/components/Auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'article',
        element: <Article />,
      },
      {
        path: 'publish',
        element: <Publish />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
```

配置二级路由出口

```jsx
<Layout className="layout-content" style={{ padding: 20 }}>
  <Outlet />
</Layout>
```

# 路由菜单点击交互实现

![image.png](02React核心与项目实战.assets/09-17210417197489.png)

## 点击菜单跳转路由

```jsx
import { Outlet, useNavigate } from 'react-router-dom'

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  const navigate = useNavigate()
  const menuClick = (route) => {
    navigate(route.key)
  }
  return (
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={selectedKey}
        items={items}
        style={{ height: '100%', borderRight: 0 }}
        onClick={menuClick}
      /> 
  )
}
export default GeekLayout
```

## 菜单反向高亮

```tsx
const GeekLayout = () => {
  // 省略部分代码
  const location = useLocation()
  const selectedKey = location.pathname
  
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            onClick={menuClickHandler}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
```

# 展示个人信息

![image.png](02React核心与项目实战.assets/10-172104171974810.png)
**实现步骤**

1. 在Redux的store中编写获取用户信息的相关逻辑
2. 在Layout组件中触发action的执行
3. 在Layout组件使用使用store中的数据进行用户名的渲染

**代码实现**
`store/userStore.js`

```javascript
import { createSlice } from '@reduxjs/toolkit'
import { http } from '@/utils/request'
import { getToken, setToken } from '@/utils'
const userStore = createSlice({
  name: 'user',
  // 数据
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  // 同步修改方法
  reducers: {
    setUserToken (state, action) {
      state.token = action.payload
      // 存入本地
      setToken(state.token)
    },
    setUserInfo (state, action) {
      state.userInfo = action.payload
    }
  }
})

// 解构出actionCreater
const { setUserToken, setUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await http.post('/authorizations', loginForm)
    dispatch(setUserToken(res.data.token))
  }
}


const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await http.get('/user/profile')
    dispatch(setUserInfo(res.data))
  }
}

export { fetchLogin, fetchUserInfo }

export default userReducer
```

`pages/Layout/index.js`

```jsx
// 省略部分代码
import { fetchUserInfo } from '@/store/modules/user'
import { useDispatch, useSelector } from 'react-redux'


const GeekLayout = () => {
  const dispatch = useDispatch()
  const name = useSelector(state => state.user.userInfo.name)
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout
```

# 退出登录实现

![image.png](C:/Users/chaipeng/Desktop/md/assets/11.png)
**实现步骤**

1. 为气泡确认框添加确认回调事件
2. 在`store/userStore.js` 中新增退出登录的action函数，在其中删除token
3. 在回调事件中，调用userStore中的退出action
4. 清除用户信息，返回登录页面

**代码实现**
`store/modules/user.js`

```javascript
import { createSlice } from '@reduxjs/toolkit'
import { http } from '@/utils/request'
import { clearToken, getToken, setToken } from '@/utils'
const userStore = createSlice({
  name: 'user',
  // 数据
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  // 同步修改方法
  reducers: {
    setUserToken (state, action) {
      state.token = action.payload
      // 存入本地
      setToken(state.token)
    },
    setUserInfo (state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo (state) {
      state.token = ''
      state.userInfo = {}
      clearToken()
    }
  }
})

// 解构出actionCreater
const { setUserToken, setUserInfo, clearUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer


export { fetchLogin, fetchUserInfo, clearUserInfo }

export default userReducer
```

`pages/Layout/index.js`

```jsx
const GeekLayout = () => {
  // 退出登录
  const loginOut = () => {
    dispatch(clearUserInfo())
    navigator('/login')
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm 
              title="是否确认退出？" 
              okText="退出" 
              cancelText="取消" 
              onConfirm={loginOut}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            onClick={menuClickHandler}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
```

![image.png](02React核心与项目实战.assets/12-172104171974811.png)

# 处理Token失效

> 业务背景：如果用户一段时间不做任何操作，到时之后应该清除所有过期用户信息跳回到登录


```javascript
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.dir(error)
  if (error.response.status === 401) {
    clearToken()
    router.navigate('/login')
    window.location.reload()
  }

  return Promise.reject(error)
})
```

# 首页Home图表展示

![home.png](02React核心与项目实战.assets/13-172104171974812.png)

## 图表基础Demo实现

> 图表类业务渲染，我们可以通过下面的顺序来实现
>
> 1. 跑通基础DEMO
> 2. 按照实际业务需求进行修改



**安装echarts**

```bash
npm i echarts
```

**实现基础Demo**

```jsx
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const Home = () => {
  const chartRef = useRef(null)
  useEffect(() => {
    // 1. 生成实例
    const myChart = echarts.init(chartRef.current)
    // 2. 准备图表参数
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    }
    // 3. 渲染参数
    myChart.setOption(option)
  }, [])

  return (
    <div>
      <div ref={chartRef} style={{ width: '400px', height: '300px' }} />
    </div >
  )
}

export default Home
```

![image.png](02React核心与项目实战.assets/14-172104171974813.png)

## 组件封装

基础抽象

```jsx
import { useRef, useEffect } from 'react'
import * as echarts from 'echarts'

const BarChart = () => {
  const chartRef = useRef(null)
  useEffect(() => {
    // 1. 生成实例
    const myChart = echarts.init(chartRef.current)
    // 2. 准备图表参数
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    }
    // 3. 渲染参数
    myChart.setOption(option)
  }, [])
  return <div ref={chartRef} style={{ width: '400px', height: '300px' }}></div>
}

export { BarChart }
```

抽象可变参数

```tsx
import { useRef, useEffect } from 'react'
import * as echarts from 'echarts'

const BarChart = ({ xData, sData, style = { width: '400px', height: '300px' } }) => {
  const chartRef = useRef(null)
  useEffect(() => {
    // 1. 生成实例
    const myChart = echarts.init(chartRef.current)
    // 2. 准备图表参数
    const option = {
      xAxis: {
        type: 'category',
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: sData,
          type: 'bar'
        }
      ]
    }
    // 3. 渲染参数
    myChart.setOption(option)
  }, [sData, xData])
  return <div ref={chartRef} style={style}></div>
}

export { BarChart }
```

```jsx
import { BarChart } from './BarChart'

const Home = () => {
  return (
    <div>
      <BarChart
        xData={['Vue', 'React', 'Angular']}
        sData={[2000, 5000, 1000]} />

      <BarChart
        xData={['Vue', 'React', 'Angular']}
        sData={[200, 500, 100]}
        style={{ width: '500px', height: '400px' }} />
    </div >
  )
}

export default Home
```

# Day9-09.项目打包

```bash
npm run build
```

<img src="02React核心与项目实战.assets/25-172104194976414.png" alt="image.png" style="zoom:50%;" />

# Day9-09.项目本地预览

> 本地预览是指在本地通过静态服务器模拟生产服务器运行项目的过程

**实现步骤**

1. 全局安装本地服务包 `npm i -g serve`  该包提供了serve命令，用来启动本地服务器
2. 在项目根目录中执行命令 `serve -s ./build`  在build目录中开启服务器
3. 在浏览器中访问：`http://localhost:3000/` 预览项目

<img src="02React核心与项目实战.assets/26-172104194976415.png" alt="image.png" style="zoom:50%;" />

# 优化-路由懒加载（看到此处）

**使用步骤**

1. 使用 lazy 方法导入路由组件
2. 使用内置的 Suspense 组件渲染路由组件

**代码实现**
`router/index.js`

```jsx
import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'

import AuthRoute from '@/components/Auth'

const Publish = lazy(() => import('@/pages/Publish'))
const Article = lazy(() => import('@/pages/Article'))
const Home = lazy(() => import('@/pages/Article'))


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={'加载中'}>
            <Home />
          </Suspense>
        )
      },
      {
        path: 'article',
        element: (
          <Suspense fallback={'加载中'}>
            <Article />
          </Suspense>
        )
      },
      {
        path: 'publish',
        element: (
          <Suspense fallback={'加载中'}>
            <Publish />
          </Suspense>
        )
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
```

**查看效果**
我们可以在打包之后，通过切换路由，监控network面板资源的请求情况，验证是否分隔成功

# 打包-打包体积分析

**业务背景**
通过分析打包体积，才能知道项目中的哪部分内容体积过大，方便知道哪些包如何来优化
**使用步骤**

1. 安装分析打包体积的包：`npm i source-map-explorer`
2. 在 package.json 中的 scripts 标签中，添加分析打包体积的命令
3. 对项目打包：`npm run build`（如果已经打过包，可省略这一步）
4. 运行分析命令：`npm run analyze`
5. 通过浏览器打开的页面，分析图表中的包体积

**核心代码**：

```json
"scripts": {
  "analyze": "source-map-explorer 'build/static/js/*.js'",
}
```

![image.png](02React核心与项目实战.assets/27-172104194976516.png)

# 优化-配置CDN

**分析说明**：通过 craco 来修改 webpack 配置，从而实现 CDN 优化
**核心代码**
`craco.config.js`

```javascript
// 添加自定义对于webpack的配置

const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    },
    // 配置webpack
    // 配置CDN
    configure: (webpackConfig) => {
      let cdn = {
        js:[]
      }
      whenProd(() => {
        // key: 不参与打包的包(由dependencies依赖项中的key决定)
        // value: cdn文件中 挂载于全局的变量名称 为了替换之前在开发环境下
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
        // 配置现成的cdn资源地址
        // 实际开发的时候 用公司自己花钱买的cdn服务器
        cdn = {
          js: [
            'https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js',
          ]
        }
      })

      // 通过 htmlWebpackPlugin插件 在public/index.html注入cdn资源url
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )

      if (isFound) {
        // 找到了HtmlWebpackPlugin的插件
        match.userOptions.files = cdn
      }

      return webpackConfig
    }
  }
}
```

`public/index.html`

```html
<body>
  <div id="root"></div>
  <!-- 加载第三发包的 CDN 链接 -->
  <% htmlWebpackPlugin.options.files.js.forEach(cdnURL => { %>
    <script src="<%= cdnURL %>"></script>
  <% }) %>
</body>
```

