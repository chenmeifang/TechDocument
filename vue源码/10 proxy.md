在vue中（潜规则），

​	凡是以下划线开头的数据，认为它是私有数据，不要去访问它

​	以$开头的数据，代表只读数据

![截屏2020-11-30 下午8.03.23](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2020-11-30 下午8.03.23.png)

![截屏2020-11-30 下午8.05.21](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2020-11-30 下午8.05.21.png)

#### 将属性的操作转换为参数

![截屏2020-11-30 下午8.08.39](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2020-11-30 下午8.08.39.png)

引发的问题：

在vue中，不仅仅只有data属性，还有properties属性，methods等都会挂载到vue实例上。

就表示不仅仅有_data，还会有别的。

所以要把_data抽成一个参数-----》prop

![截屏2020-11-30 下午8.24.40](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2020-11-30 下午8.24.40.png)



![截屏2020-11-30 下午8.25.53](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2020-11-30 下午8.25.53.png)









