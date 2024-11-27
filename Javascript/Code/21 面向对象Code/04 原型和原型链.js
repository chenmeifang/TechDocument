function fun(){
  this.a = 0
  this.b = function(){
    console.log('this.a1:', this.a);
  }
}

fun.prototype = {
  b: function(){
      this.a = 20
      console.log('this.a2:', this.a);
  },
  c: function (){
      this.a = 30
      console.log('this.a3:', this.a);
  }
}

var my_fun = new fun()

my_fun.b() // a1:0
my_fun.c() // a3:30
