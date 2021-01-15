# GPU版本安装

安装GPU版本必须有GPU硬件的支持

TensorFlow对NVIDA显卡的支持较为完备

使用conda来安装GPU版本

对于NVIDA显卡，要求其CUDA Compute Capability（算力）须不低于3.5

算力参考：http://developer.nvida.com/cuda-gpus（详细的列出了各种显卡型号对应的算力）

驱动版本注意：NVIDIA驱动程序需要418.x或更高版本。

可在命令行中执行查看驱动版本：

```
nvidia-smi
// zsh: command not found: nvidia-smi
```

MAC电脑怎么查看用的是什么显卡？

https://www.zhihu.com/question/267189142/answer/1013521287（关于MAC NIVID显卡）

GPU版本有两个依赖库

安装依赖库：

conda install cudatoolkit=10.1

conda install cudnn = 7.6.5

https://www.jianshu.com/p/0511decff9f8