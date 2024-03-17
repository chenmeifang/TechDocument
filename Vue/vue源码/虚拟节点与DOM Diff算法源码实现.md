 https://www.bilibili.com/video/BV1zk4y1y7sD

# 第一节：了解diff算法的特征，虚拟节点，创建项目

Dom diff 其实就是对比两个虚拟节点，然后找出它们的差异。然后对应到真实dom上面去做==打补丁==这样一个过程。

目的：找到这些差异，以最小的代价去操作dom。

因为操作dom本身很损耗性能。

因此引出一个概念：虚拟节点——理解为普通对象（把真实的节点用对象的方式模拟出来）

![截屏2021-03-28 下午9.00.30](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-28 下午9.00.30.png)

特点：

1. ==平级对比==
2. ==会找索引==
3. 位置交替的情况：可以替换，不用重新渲染li节点——span和p的父元素。 是比较好的优化的策略
   1. ![截屏2021-03-28 下午9.04.53](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-28 下午9.04.53.png)
4. dom diff是一个深度遍历的过程（==深度优先==）
   1. ![截屏2021-03-28 下午9.08.25](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-28 下午9.08.25.png)
5. 

![截屏2021-03-28 下午9.09.32](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-28 下午9.09.32.png)

上面这段代码执行完之后的效果：

![截屏2021-03-28 下午9.12.00](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-28 下午9.12.00.png)

每一个虚拟节点都有三个东西：

1. type：标签名
2. props：属性——比如class和style
3. children

```js
const vDom = createElement('ul', 
    {
        class:'list', 
        style: 'width:300px;height:300px;background-color:orange'
    }, [
        createElement('li', {class: 'item', 'data-index': 0}, [
            createElement('p', {class: 'text'}, ['第1个列表项'])
        ]),
        createElement('li', {class: 'item', 'data-index': 1}, [
            createElement('p', {class: 'text'}, [
                createElement('span', {class: 'title'}, ['第2个列表项'])
            ])
        ]),
        createElement('li', {class: 'item', 'data-index': 2}, ['第3个列表项'])
    ]
)
```

createElement: 

1. 把虚拟节点转换成能在控制台里面打印出来的虚拟节点
2. 再转换成真实的dom节点

# 第二节 构建虚拟节点  转换真实DOM  渲染DOM节点

虚拟dom 到 真实dom 这个过程，是需要一个渲染函数去支撑的

# 第三步 虚拟节点差异分析 创建补丁包

![截屏2021-03-28 下午9.00.30](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-28 下午9.00.30.png)

补丁：patches

补丁大概长这样：

![截屏2021-03-28 下午11.06.15](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-28 下午11.06.15.png)

![截屏2021-03-28 下午11.07.40](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-28 下午11.07.40.png)

# 第四节 给真实DOM打补丁



![截屏2021-03-28 下午11.50.33](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-28 下午11.50.33.png)







































