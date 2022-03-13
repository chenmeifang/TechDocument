https://www.bilibili.com/video/BV1Zt411T7zE?p=2

![截屏2020-12-20 下午9.47.09](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2020-12-20 下午9.47.09.png)

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2020-12-20 下午9.48.15.png" alt="截屏2020-12-20 下午9.48.15" style="zoom:33%;" />

mac查看安装的python是什么版本？

```bash
chenmeifang@chenmeifangdeMacBook-Air-2 ~ % python -V
Python 2.7.16
chenmeifang@chenmeifangdeMacBook-Air-2 ~ % source ~/.bash_profile
chenmeifang@chenmeifangdeMacBook-Air-2 ~ % python -V             
Python 3.6.3 :: Anaconda, Inc.
chenmeifang@chenmeifangdeMacBook-Air-2 ~ % 
```



![截屏2020-12-20 下午9.51.46](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2020-12-20 下午9.51.46.png)



![截屏2020-12-20 下午9.52.26](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2020-12-20 下午9.52.26.png)

https://www.jb51.net/softs/592673.html#downintro2

https://blog.csdn.net/weixin_38705903/article/details/86533863

![截屏2020-12-21 下午12.40.32](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2020-12-21 下午12.40.32.png)

# 正式



![截屏2020-12-20 下午9.55.12](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2020-12-20 下午9.55.12.png)

如果计算机没有NVIDIA显卡，就只能装CPU版本。

安装GPU版本必须有GPU硬件的支持

第一步：升级pip版本（pip版本需要大于19.0）

```
pip -V // 先查看pip版本
```

```javascript
python -m pip install --upgrade pip
```

第二步：安装tensorflow2.3的CPU版本

```
pip install tensorflow-cpu==2.3.0 -i https://pypi.douban.com/simple/
```

第三步：测试有没有安装成功

```python
python // 进入python
import tensorflow as tf // 导入一下tensorflow，如果没报错，就说明安装成功
print(tf.__version__) // 查看tensorflow的版本
```

安装一些其他的包：

```
pip install matplotlib notebook -i https://pypi.douban.com/simple/  // 绘图包  基于web的开发环境
```

进入notebook：

```
jupyter notebook
```

![截屏2020-12-22 下午11.38.42](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2020-12-22 下午11.38.42.png)

如果感觉上面那些命令都不太好使用，就先执行以下 source ~/.bash_profile

---

https://blog.csdn.net/qq_38193902/article/details/107214357?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-13.control&dist_request_id=1328602.27043.16150146402853213&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-13.control



安装miniconda![截屏2021-03-06 下午3.37.46](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-06 下午3.37.46.png)

https://blog.csdn.net/weixin_38109583/article/details/93376954