```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- onkeyup="keyup(event)" -->
    <input type="text" name="" id="input1" >
    <script>
        // function keyup (event) {
        //     console.log('kkk:',event.target.value)
        // }
        let input = document.getElementById('input1');
        input.onkeyup = function () {
            console.log('this:',this.value)
            if (this.value.length > 4) {
                console.log('dayu1')
                console.log(input.style)
                input.style.border = "1px solid red";
                input.style.outline="none"
                input.style.backgroundColor="red"
            }
        }
    </script>
</body>
</html>
```

