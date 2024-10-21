// 1.原生的call是怎么调用的

function a() {
  console.log(this.name)
}

let b = {
  name: 'cmf'
}

a.call(b);

// call2这个方法应该放在哪个位置呢？？？
// 一开始会很自然的想要在函数a上面做文章，但实际上要在b上面做文章
// 让b上面有一个a方法

// 不过想在函数a上面做文章也是对的，因为要将call2方法挂在函数的原型上面
// 是将call2方法挂在函数原型上，所以实际跟函数a确实没多大关系

Function.prototype.call2 = function (newThis, ...arguments) {
  // newThis是b
  // this是a
  // 要让b对象上面含有a方法
  // b.a = a;
  newThis[this] = this;
  console.log('newThis:', newThis);
  newThis[this](...arguments);
  delete newThis[this];
  console.log('newThis:', newThis);
}

a.call2(b);


