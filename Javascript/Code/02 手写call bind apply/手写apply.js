function greet(name, age) {
  console.log(name, age);
}

const person = {
  name: 'cmf',
  age: 24
}

greet.apply(person, ['ln', 27])

Function.prototype.apply2 = function (newThis, arguments) {
  // newThis是person
  // this是greet

  // newThis[this] = this;
  // newThis[this](...arguments)
  // delete newThis[this]

  newThis.test = this;
  newThis.test(...arguments)
  delete newThis.test
}

greet.apply(person, ['ln', 27])
