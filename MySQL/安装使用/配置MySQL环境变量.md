https://blog.csdn.net/weixin_41948075/article/details/89737324

command not found 的错误，是因为还没有配置环境变量

配置环境变量,首先要知道你使用的Mac OS X是什么样的Shell

打开终端，输入：echo $SHELL 回车执行

如果输出的是：csh或者是tcsh，那么你用的就是C Shell。

如果输出的是：bash，sh，zsh，那么你的用的可能就是Bourne Shell的一个变种

Mac OS X 10.2之前默认的是C Shell。

Mac OS X 10.3之后默认的是Bourne Shell。

输入：cd /usr/local/mysql，回车执行

然后输入：sudo vim .bash_profile，回车执行