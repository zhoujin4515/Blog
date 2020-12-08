### require.js
require.js加载方案

项目目录：
```javascript
* requirejs/
    * index.html
    * vender/
        * main.js
        * require.js
        * add.js
        * square.js
        * multiply.js
```

index.html
```javascript
<!DOCTYPE html>
<html>
    <head>
        <title>require.js</title>
    </head>
    <body>
        <h1>Content</h1>
        <script data-main="vender/main" src="vender/require.js"></script>
        <!-- ps: data-* https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/data-* -->
        <div data-myname="zhoujin">data-</div>
    </body>
</html>
```

main.js
```javascript

require(['./add', './square'], function(addModule, squareModule) {
    console.log(addModule.add(1, 1))
    console.log(squareModule.square(3))
})

console.log('main.js context')
```
require 函数有两个参数 加载的模块id数组 及包含加载结果的参数的回调函数
define 函数有两个参数 与 require 函数相同

add.js
```javascript
define(function() {
    
    console.log('load add module')

    var add = function(x, y) {
        return x + y
    }

    return {
        add: add
    }
})
```

square.js
```javascript
define(['./mutiply'], function(multiplyModule) {

    console.log('load square module')

	return {
        square: function(num) {
            return multiplyModule.multiply(num, num)
        }
    }
})
```

mutiply.js
```javascript
console.log('load mutiply module')
export var multiply = function(x, y) {
    return x * y
}
```

> `requirejs` 为全局添加了 `define` 函数，你只要按照这种约定的方式书写这个模块即可。

这个约定方式就是The Asynchronous Module Definition (AMD) 规范。
`AMD` 是将需要使用的模块先加载完再执行**回调函数**代码, 是一个异步加载模块的方式

如果在浏览器打开`index.html`
```javascript
main.js context
load add module
load multiply module
load square module
2
9
```
### seajs
seajs加载方案

使用seajs模块加载方案实现上面的例子
文件目录与 requirejs 项目目录相同:
```javascript
* requirejs/
    * index.html
    * vender/
        * main.js
        * sea.js
        * add.js
        * square.js
        * multiply.js
```

index.html
```javascript
<!DOCTYPE html>
<html>

<head>
    <title>sea.js</title>
</head>

<body>
    <h1>Content</h1>
    <script src="vender/sea.js"></script>
    <script>
    seajs.use("./vender/main");
    </script>
</body>

</html>
```

main.js
```javascript
define(function(require, exports, module) {
    var addModule = require('./add');
    console.log(addModule.add(1, 1))

	var squareModule = require('./square');
	console.log(squareModule.square(3))
});
```
> `sea.js` 全局定义了 `define` 函数，你只要按照这种约定的方式书写这个模块即可。

与 `AMD` 一样，`CMD` 其实就是 SeaJS 在推广过程中对模块定义的规范化产出。

你去看 CMD 规范的内容，主要内容就是描述该如何定义模块，如何引入模块，如何导出模块，只要你按照这个规范书写代码，sea.js 就能正确的进行解析

add.js
```javascript
define(function(require, exports, module) {

	console.log('load add module')

    var add = function(x, y) {　
        return x + y;
    };

    module.exports = {　　　　　　
        add: add
    };

});
```

square.js
```javascript
define(function(require, exports, module) {

	console.log('load square module')

	var multiplyModule = require('./multiply');

    module.exports = {　　　　　　
        square: function(num) {
        	return multiplyModule.multiply(num, num)
        }
    };

});
```

multiply.js
```javascript
define(function(require, exports, module) {

	console.log('load multiply module')

	var multiply = function(x, y) {　
	    return x * y;
	};

    module.exports = {　　　　　　
        multiply: multiply
    };

});
```

如果在浏览器打开`index.html`
```javascript
load add module
2
load square module
load multiply module
9
main.js context
```

### AMD 与 CMD
AMD 是将需要使用的模块先加载完再执行代码，而 CMD 是在 require 的时候才去加载模块文件，加载完再接着执行。

### ES6 
ECMAScript2015 规定了新的模块加载方案。
