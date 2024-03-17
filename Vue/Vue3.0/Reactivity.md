https://www.bilibili.com/video/BV1ry4y1y7AK

# 一 reactive

Vue2: 这里的observable是用Object.defineProperty实现的。

![截屏2021-02-20 下午6.50.49](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午6.50.49.png)



Vue3: 被proxy代理过的a，b：

![截屏2021-02-20 下午6.53.27](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午6.53.27.png)

是深拷贝：（每一层都会被代理）

![截屏2021-02-20 下午6.59.51](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午6.59.51.png)











