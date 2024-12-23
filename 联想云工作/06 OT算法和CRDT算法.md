https://zhuanlan.zhihu.com/p/425284127

# 1. 什么是OT算法

Operation Transformation

是在线协作系统中经常使用的操作合并算法。一开始它只是用来解决在线文档多人操作的合并问题，后来随着它理论知识的完善应用到了更多领域，不过在线文档仍然是典型的场景之一，Google Doc、腾讯文档、石墨文档等产品也都使用OT算法解决在线文档操作合并的问题

> OT算法是一种操作合并指导思想，是一类算法，在不同的应用场景下有不同实现。

# 2. 为什么多人编辑需要OT算法

假设小贾和小王同时编辑一个文档，文档的初始内容是“123”

这时小贾先在123后面添加一个4，小王后在123后面添加一个5

如果没有合并算法，小贾本地文档的内容变化过程是：

1. 小贾把“123”改成了“1234”。
2. 接收到消息，小王在3后面加了一个5。
3. 小贾本地的字符串变成了“12354”。

小王本地文档的内容变化过程是：

1. 小王把“123”改成了“1235”。
2. 接收到消息，小贾在3后面加了一个4。
3. 小王本地的字符串变成了“12345”。

此时，小王看到的字符串是正确的，小贾看到的字符串是错误的。所以我们需要一种合并算法，保证小贾和小王看到的最终结果都正确。当更多人同时编辑文档时，需要所有人的本地操作结果都是正确的，OT算法刚好适用于解决此问题。

# 3. OT算法的重要思想

以下三个示例参考：[https://www3.ntu.edu.sg/scse/st](https://link.zhihu.com/?target=https%3A//www3.ntu.edu.sg/scse/staff/czsun/projects/otfaq/)

## 3.1 保持内容一致性的基本思想

![img](https://pic4.zhimg.com/80/v2-8d7ca66740cb45303ccb6982370f72d7_720w.webp)

如上图，两个用户在浏览器中打开了同一个在线文档，文档的初始内容是“123”。

1. 用户1和用户2同时操作，用户1的操作是`O1=Insert(0,"X")`，表示在位置0，插入字符串X；用户2的操作是`O2=Delete(2,1)`，表示从第二个位置开始删除元素，删除长度是1。
2. 用户1浏览器中字符串先变成“X123”，O2操作到达用户1的浏览器之后，和O1发生转换`O2'=Transform(O2,O1)= Delete(3,1)`，O2'虽然也是执行删除操作，但是因为O1已经插入了X字符串，所以删除的位置+1，O2'变成了删除起始位置为3的元素，删除长度是1。对“X123”执行O2'操作，用户1本地的字符串变成“X12”。
3. 用户2浏览器中字符串先变成“12”，O1操作到达用户2的浏览器之后，和O2发生转换`O1'=Transform(O1,O2)=Insert(0,"X")`，因为O2删除的元素是从第二个位置开始的，对O1'添加元素没有影响，所以`O1'=O1`。对“12”执行O1'操作，用户2本地的字符串变成“X12”。

总之，OT通过**转换方法**产生一个新的操作，使当前字符串应用到转换算法之后两个浏览器的内容保持一致。

## 3.2 撤销操作的基本思想

![img](https://pic1.zhimg.com/80/v2-0c04838e9df372864c90854ea8acc14c_720w.webp)

如上图，两个用户在浏览器中打开了同一个在线文档，文档的初始内容是“12”。

1. 用户2执行操作`O1=Insert(2,"Y")`，在位置2插入字符串Y，用户2本地的字符串变成了“12Y”。
2. 用户2的操作到达用户1的浏览器，此时用户1没有做任何操作，所以O1原样执行，用户1浏览器的字符串也变成了“12Y”。
3. 用户1执行操作`O2=Insert(0,"X")`，在位置0插入字符串“X”，用户1本地的字符串变成了“X12Y”。
4. 用户1的操作到达用户2的浏览器，此时用户2没有其他操作，所以O2原样执行，用户2浏览器的字符串变成了“X12Y”。
5. 随后用户2执行撤销操作，此时撤销操作表示为`Undo(O1)=T(!O1,O2) = Delete(3)`。!O1是O1的逆向操作，本来应该是Delete(2)，因为O2在字符串中增加了一个字符，所以此时的撤销操作是Delete(3)，删除位置是3的元素，所以用户2本地的字符串变成了“X12”。
6. 用户2的操作到达用户1的浏览器，用户1执行Delete(3)之后本地的字符串也变成了“X12”。

总之，撤销操作需要正确执行自己操作的逆向操作，还要保留其他客户端传来的执行结果。

## 3.3 操作压缩的基本思想

![img](https://pic2.zhimg.com/80/v2-8b6fa6d0cf83eb6a65d86ad5cc77ed85_720w.webp)

如上图，用户1和用户2看到的初始字符串是“123”。用户1依次进行了4次操作：

1. `O1=Insert(2,"X")`
2. `O2=Insert(1,"abc")`
3. `O3=Insert(2,"Y")`
4. `O4=Delete(7)`

我们在传输之前，先压缩这四次操作，我们用`L=(O1,O2,O3,O4)`表示对4次操作的压缩。
压缩的步骤是从右往左，相邻两个操作依次进行换位（transpose）。具体步骤如下：

1. O4和O3换位，`transpose(O3,O4) = (O4',O3')`，此时`O4‘=Delete(6)`,`O3' = O3`，`L'=(O1,O2,O4’,O3)`。 O4‘和O3’是如何计算出来的呢？因为O4是删除位置为7的元素，也就是“1aYbc2X3”中的“X”，O3是在位置2插入字符串“Y”。交换两个操作之后先进行O4'再进行O3'。为了保证结果一致，O4'需要删除位置是6的元素，因为要删除的字符串“X”在6的位置。O3是在位置2插入字符串“Y”，和O4交换执行顺序后不受影响，所以`O3'=O3`。
2. 继续执行，O4'和O2换位操作，`transpose(O2,O4') = (O4'',O2')`，为了保持结果一致，也就是O4''还是要删除“Y”字符串，此时`O4''=Delete(3)`,O2'还是在位置1开始插入字符串“abc”，语意保持不变，`O2'=O2`。此时`L'=(O1,O4'',O2,O3)`。
3. 继续执行，O4''和O1比较发现，这两个操作是互斥的，O1在位置2后添加了字符串“X”，O4''又删除了此字符串，所以两个操作互相抵消，此时`L'=(O2,O3)` 。
4. 继续执行，O2是在位置1后面添加字符串“abc”，O3是在位置2后面添加字符串“Y”，两个插入操作可以合并为在位置1后面添加“aYbc”，可以用`O2'=Insert(1,"aYbc")`表示，`L'=(O2')`。
5. 最终合并完的操作就变成了O2'。数据传输时，把O2'直接发送给用户2就等价于发送O1，O2，O3，O4四步操作。

总之，数据合并的基本思想就是从右向左，通过操作的两两换位（transpose），寻找到可以合并或淘汰的操作，达到compose的目的。

以上是以文档为例，说明OT算法中三个重要思想，更多OT算法的设计思路大家可以参照：[https://www3.ntu.edu.sg/scse/staff/czsun/projects/otfaq/#transformation_function](https://link.zhihu.com/?target=https%3A//www3.ntu.edu.sg/scse/staff/czsun/projects/otfaq/%23transformation_function)

# 4. OT算法的实战案例

我们分析一个文档OT算法的例子，源码地址：[https://github.com/Operational-Transformation/ot.js](https://link.zhihu.com/?target=https%3A//github.com/Operational-Transformation/ot.js) 我们把用户对文档的操作分为三类：

1. `reatin` 保持不变
2. `insert` 插入字符串
3. `delete` 删除字符串

操作对象：`TextOperation`

```js
function TextOperation () {
    if (!this || this.constructor !== TextOperation) {
      // => function was called without 'new'
      return new TextOperation();
    }

    // this.ops表示具体的操作，正数表示保持不变、负数表示要删除的字符长度，字符串表示要插入的字符串。
    // 举例说明一下，[10,"-3",abcd"]表示前10个字符保持不变，然后删除三个字符，然后插入“abcd”字符串。
    this.ops = [];

    // 表示操作之前字符串的长度
    this.baseLength = 0;
    // 表示操作完成字符串的长度
    this.targetLength = 0;
}
```

`TextOperation`的核心方法：`transform`。把两个同时发生的冲突操作A和B转换为A'和B'使`apply(apply(S, A), B') = apply(apply(S, B), A')`

```js
// 方法的传入参数operation1，operation2，分别表示操作A、B；
// operation1prime，operation2prime分别表示操作A'和B'。
TextOperation.transform = function (operation1, operation2) {
    if (operation1.baseLength !== operation2.baseLength) {
        throw new Error("Both operations have to have the same base length");
    }

    var operation1prime = new TextOperation();
    var operation2prime = new TextOperation();
    var ops1 = operation1.ops, ops2 = operation2.ops;
    var i1 = 0, i2 = 0;
    var op1 = ops1[i1++], op2 = ops2[i2++];
    while (true) {
        // 每一轮迭代保证operation1和operation2操作字符串的相同位置，这样转换操作才有意义。
        
        if (typeof op1 === 'undefined' && typeof op2 === 'undefined') {
            // end condition: both ops1 and ops2 have been processed
            break;
        }

        // 接下来的两种情况：如果A、B中的一个或者两个都是insert操作。
        // 在相应的运算中插入字符串，然后跳过插入字符串的长度。
        // 比如：A是insert操作，那么A'也是insert操作，B'先 retain A插入字符串的长度；
        // A、B都是insert操作时，A'就是insert操作，B'就是retain A插入字符串的长度之后再插入B字符串。
        
        if (isInsert(op1)) {
            operation1prime.insert(op1);
            operation2prime.retain(op1.length);
            op1 = ops1[i1++];
            continue;
        }
        if (isInsert(op2)) {
            operation1prime.retain(op2.length);
            operation2prime.insert(op2);
            op2 = ops2[i2++];
            continue;
        }

        if (typeof op1 === 'undefined') {
            throw new Error("Cannot compose operations: first operation is too short.");
        }
        if (typeof op2 === 'undefined') {
            throw new Error("Cannot compose operations: first operation is too long.");
        }

        var minl;
        
        if (isRetain(op1) && isRetain(op2)) {
            // 如果A、B都是retain操作：
            // 比较A、B的长度，合并后A'和B'都变成了长度较小的retain操作。
            // 当A>B时，A'就变成了retain B的大小，A操作变成了retain(B-A),
            // 等下一轮循环再和B中
            // 相同位置的字符串合并操作。 
            // 反之B>A时，同理。
            if (op1 > op2) {
                minl = op2;
                op1 = op1 - op2;
                op2 = ops2[i2++];
            } else if (op1 === op2) {
                minl = op2;
                op1 = ops1[i1++];
                op2 = ops2[i2++];
            } else {
                minl = op1;
                op2 = op2 - op1;
                op1 = ops1[i1++];
            }
            operation1prime.retain(minl);
            operation2prime.retain(minl);
        } else if (isDelete(op1) && isDelete(op2)) {
            // 如果A、B都是delete操作，我们合并时，
            // 不需要记录delete（其实记也可以、不过A、B都delete的话没有必要）。
            // 我们需要做的是把delete内容较少的忽略，保留住delete内容多的操作等下一次迭代，
            // 和上面的retain道理相同。
            if (-op1 > -op2) {
                op1 = op1 - op2;
                op2 = ops2[i2++];
            } else if (op1 === op2) {
                op1 = ops1[i1++];
                op2 = ops2[i2++];
            } else {
                op2 = op2 - op1;
                op1 = ops1[i1++];
            }
            
        } else if (isDelete(op1) && isRetain(op2)) {
            // 如果A是delete，B是retain，比较A和B的绝对值大小。
            // 如果delete的内容比retain多，那A'的delete就是B的值，A的delete长度变成A+B，
            // 也就是删除内容的长度减小了；
            // 如果删除和保持的内容一样多，那B'的delete等于A、B都可以；
            // 如果delete的内容比retain少，那A'的delete就是A的值，B的retain长度变成A+B，
            // 也就是保持的内容减少了。
            if (-op1 > op2) {
                minl = op2;
                op1 = op1 + op2;
                op2 = ops2[i2++];
            } else if (-op1 === op2) {
                minl = op2;
                op1 = ops1[i1++];
                op2 = ops2[i2++];
            } else {
                minl = -op1;
                op2 = op2 + op1;
                op1 = ops1[i1++];
            }
            operation1prime['delete'](minl);
        } else if (isRetain(op1) && isDelete(op2)) {
            // 如果A是retain，B是delete，同上。
            if (op1 > -op2) {
                minl = -op2;
                op1 = op1 + op2;
                op2 = ops2[i2++];
            } else if (op1 === -op2) {
                minl = op1;
                op1 = ops1[i1++];
                op2 = ops2[i2++];
            } else {
                minl = op1;
                op2 = op2 + op1;
                op1 = ops1[i1++];
            }
            operation2prime['delete'](minl);
        } else {
            throw new Error("The two operations aren't compatible");
        }
    }

    return [operation1prime, operation2prime];
};
```

逆操作：`invert`，通过执行逆操作可以恢复操作的效果，逆操作主要用来实现撤销功能。

```js
// 计算操作的逆操作，通过执行逆操作可以恢复操作的效果，逆操作主要用来实现撤销功能。
TextOperation.prototype.invert = function (str) {
    var strIndex = 0;
    var inverse = new TextOperation();
    var ops = this.ops;
    for (var i = 0, l = ops.length; i < l; i++) {
        var op = ops[i];
        if (isRetain(op)) {
            // retain的逆操作还是retain，
            // 因为逆操作的目的是为了恢复操作效果，retain相当于没有操作所以逆操作也就保持不变就好了。
            inverse.retain(op);
            strIndex += op;
        } else if (isInsert(op)) {
            // insert的逆操作是delete
            inverse['delete'](op.length);
        } else { // delete op
            // delete的逆操作是insert
            inverse.insert(str.slice(strIndex, strIndex - op));
            strIndex -= op;
        }
    }
    return inverse;
};
```

合并操作：`compose`，`compose`方法借鉴前面`transform`方法的思路应该很容易理解。

```js
// 合并两个连续的操作为一个操作，合并后保持apply(apply(S, A), B) = apply(S, compose(A, B))成立
TextOperation.prototype.compose = function (operation2) {
    var operation1 = this;
    if (operation1.targetLength !== operation2.baseLength) {
        throw new Error("The base length of the second operation has to be the target length of the first operation");
    }

    // 合并之后返回的操作
    var operation = new TextOperation(); 
    var ops1 = operation1.ops, ops2 = operation2.ops; // for fast access
    var i1 = 0, i2 = 0; // current index into ops1 respectively ops2
    var op1 = ops1[i1++], op2 = ops2[i2++]; // current ops
    while (true) {
        // 每一轮迭代保证operation1和operation2操作字符串的相同位置，这样合并操作才有意义。
        
        // 根据op1和op2的操作类型选择如何合并。
       
        if (typeof op1 === 'undefined' && typeof op2 === 'undefined') {
            // 结束条件是ops1和ops2都已经遍历完成。
            break;
        }
        
        // 以下内容可以参照transform方法理解，就不详细注释了。

        if (isDelete(op1)) {
            operation['delete'](op1);
            op1 = ops1[i1++];
            continue;
        }
        if (isInsert(op2)) {
            operation.insert(op2);
            op2 = ops2[i2++];
            continue;
        }

        if (typeof op1 === 'undefined') {
            throw new Error("Cannot compose operations: first operation is too short.");
        }
        if (typeof op2 === 'undefined') {
            throw new Error("Cannot compose operations: first operation is too long.");
        }

        if (isRetain(op1) && isRetain(op2)) {
            if (op1 > op2) {
                operation.retain(op2);
                op1 = op1 - op2;
                op2 = ops2[i2++];
            } else if (op1 === op2) {
                operation.retain(op1);
                op1 = ops1[i1++];
                op2 = ops2[i2++];
            } else {
                operation.retain(op1);
                op2 = op2 - op1;
                op1 = ops1[i1++];
            }
        } else if (isInsert(op1) && isDelete(op2)) {
            if (op1.length > -op2) {
                op1 = op1.slice(-op2);
                op2 = ops2[i2++];
            } else if (op1.length === -op2) {
                op1 = ops1[i1++];
                op2 = ops2[i2++];
            } else {
                op2 = op2 + op1.length;
                op1 = ops1[i1++];
            }
        } else if (isInsert(op1) && isRetain(op2)) {
            if (op1.length > op2) {
                operation.insert(op1.slice(0, op2));
                op1 = op1.slice(op2);
                op2 = ops2[i2++];
            } else if (op1.length === op2) {
                operation.insert(op1);
                op1 = ops1[i1++];
                op2 = ops2[i2++];
            } else {
                operation.insert(op1);
                op2 = op2 - op1.length;
                op1 = ops1[i1++];
            }
        } else if (isRetain(op1) && isDelete(op2)) {
            if (op1 > -op2) {
                operation['delete'](op2);
                op1 = op1 + op2;
                op2 = ops2[i2++];
            } else if (op1 === -op2) {
                operation['delete'](op2);
                op1 = ops1[i1++];
                op2 = ops2[i2++];
            } else {
                operation['delete'](op1);
                op2 = op2 + op1;
                op1 = ops1[i1++];
            }
        } else {
            throw new Error(
                "This shouldn't happen: op1: " +
                JSON.stringify(op1) + ", op2: " +
                JSON.stringify(op2)
            );
        }
    }
    return operation;
};
```

操作转字符 [具体日期](具体日期) 串：`apply`，此方法的作用是把操作应用到字符串中，得到新的字符串。

```js
// 根据原始字符串和操作返回新的字符串
TextOperation.prototype.apply = function (str)
```

# 5. 相关链接

[1][https://en.wikipedia.org/wiki/Operational_transformation](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Operational_transformation)
[2][https://www3.ntu.edu.sg/scse/staff/czsun/projects/otfaq/](https://link.zhihu.com/?target=https%3A//www3.ntu.edu.sg/scse/staff/czsun/projects/otfaq/)
[3][https://github.com/share/sharedb](https://link.zhihu.com/?target=https%3A//github.com/share/sharedb) [4][https://www.shangmayuan.com/a/eaa92ee4dce945f4b733a372.html](https://link.zhihu.com/?target=https%3A//www.shangmayuan.com/a/eaa92ee4dce945f4b733a372.html) [5][https://github.com/Operational-](https://link.zhihu.com/?target=https%3A//github.com/Operational-Transformation/ot.js)

# 6. Writer中的OT

# 7. CRDT算法

