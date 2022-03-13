https://www.bilibili.com/video/BV1Zp4y1e72U

# 第一节 Vue2 vs Vue3 main.js

![截屏2021-02-18 下午5.04.46](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-18 下午5.04.46.png)

### 什么是Composition API？

以前的watch变成了vue里面的函数叫watch，可以直接解构出来。

```javascript
{watch} from 'vue';
```

以前的mounted变成了onMounted函数。

 http://vue-composition-api-rfc.netlify.app/api.html#setup

![截屏2021-02-18 下午5.28.26](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-18 下午5.29.26.png)

ref生成的响应式数据必须通过value来取值。

# 第二节



![截屏2021-02-20 下午3.03.12](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午3.03.12.png)

![截屏2021-02-20 下午3.03.45](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午3.03.45.png)





子组件：

![截屏2021-02-20 下午3.05.57](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午3.05.57.png)

父组件：

![截屏2021-02-20 下午3.07.20](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午3.07.20.png)



在模版中要使用的任意值或者方法除开props以外，都必须在setup里面return出去

![截屏2021-02-20 下午3.08.30](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午3.08.30.png)

watch和watchEffect有什么区别？

watch接收两个回调函数

子组件：

![截屏2021-02-20 下午3.13.48](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午3.13.48.png)

不要解构，否则会失去响应式

# 第三节

。

props不可变

![截屏2021-02-20 下午6.32.26](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午6.32.26.png)

会抛出一个错误：

![截屏2021-02-20 下午6.32.40](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午6.32.40.png)

第二个参数：提供执行器上下文

# 第四节

















