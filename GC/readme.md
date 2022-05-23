1.v8的GC算法
分代垃圾回收
2.对象管理
2.1 持有不同分配器的两种类
-Malloced类
-Object类


基本数据类型（不可变） 栈 
引用数据类型  堆
GC原理：根可达的数据是活动对象，根不可达的数据是不活动的对象，会被回收
ps: 调用栈、寄存器以及全局变量空间都是根。

闭包：由函数创造的一个词法作用域，函数中创建的变量被引用后。可以在这个词法作用域之外自由使用
使用：通常被使用来创造内部变量。使得这些变量不被外部随意修改，同时又可以通过指定的函数接口修改读取

### 执行上下文和执行上下文堆栈
JavaScript中可执行代码 函数，代码块，`<script>`脚本, 在代码执行时会生成一个关联的执行上下文用于保存代码执行过程的相关信息
`执行上下文`是一个内部数据结构，它包含有关 函数，代码块，`<script>`脚本执行时的详细细节：
1.当前控制流所在的位置
2.词法作用域（词法环境）

`执行上下文栈`是一个栈数据结构，它用于保存代码执行时关联的执行上下文
```javascript
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}
pow(2,3)
// 用一个数组来模拟这个栈
const ESC = []
ESC.push(script.context)
ESC.push(pow(2,3).context)
ESC.push(pow(2,2).context)
ESC.push(pow(2,1).context)
ESC.pop(pow(2,1).context)
ESC.pop(pow(2,2).context)
ESC.pop(pow(2,3).context)
ESC.pop(script.context)
```

### 词法作用域（词法环境）
在javascript中，每一个执行上下文中，都有一个与它关联的词法环境（Lexical Environment）
词法环境是一个内部隐藏的对象，由两部分组成
- 环境记录（Environment Record）： 一个储存所有局部变量的对象
- 对外部环境环境的引用： 与外部代码相关联

1.变量
一个‘变量’只是环境记录这个对象的一个属性，操作变量实际上是该对象的属性
![image](https://user-images.githubusercontent.com/15076445/169675652-bf8b2c4d-0aeb-4d50-9e7c-e0dc4696785f.png)
代码执行过程中词法环境的变化
1.脚本开始执行，词法环境预先填充了所有变量声明
- 最初，它们处于“未初始化（Uninitialized）”状态。这是一种特殊的内部状态，这意味着引擎知道变量，但是在用 let 声明前，不能引用它。几乎就像变量不存在一样。
2.然后 let phrase 定义出现了。它尚未被赋值，因此它的值为 undefined。从这一刻起，我们就可以使用变量了。
3.phrase 被赋予了一个值。
4.phrase 的值被修改。

ps: ‘词法环境’这个对象是一个规范对象，是‘理论上’存在的

2.函数声明
函数也是一个值，也是环境记录的一个属性
不同之处在于函数声明的初始化会立即完成（即函数声明提升）
这就是为什么我们可以在（函数声明）的定义之前调用函数声明

例如，这是添加一个函数时全局词法环境的初始状态：
![image](https://user-images.githubusercontent.com/15076445/169675831-ae06c200-7b2f-4624-8ced-49ec65325a6f.png)

3.内部和外部的词法环境
在一个函数“诞生”时，都有名为 `[[Environment]]` 的隐藏属性，该属性保存了对创建该函数的词法环境的引用。
在一个函数“运行”时，会创建一个词法环境用于存储这个函数调用的局部变量和参数。
当代码要访问一个变量时——首先会搜索内部词法环境，然后外部词法环境，直到全局词法环境。

4.返回函数
```javascript
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
```
在每次 `makeCounter()` 调用的开始，都会创建一个词法环境对象，用于存储该函数运行时的变量
因此，我们有两层嵌套的词法环境：
![image](https://user-images.githubusercontent.com/15076445/169676669-8297b1f1-483c-455d-b62f-4211ac15045f.png)

在执行 `makeCounter()` 的过程中创建了一个仅占一行的嵌套函数：return count++。我们尚未运行它，仅创建了它。
![image](https://user-images.githubusercontent.com/15076445/169676724-02ce9f0b-1550-4b44-a7c1-1d5511bdad2b.png)

因此`counter.[[Environment]]`有对`{count： 0}`词法环境的引用。这就是函数记住创建于何处的方式，与函数在何处被调用无关。`[[Environment]]`引用在函数被创建时被设置并永久保存。

稍后，当调用`counter()`时，会创建一个新的词法环境，并且通过`counter.[[Environment]]`获取其外部词法环境
![image](https://user-images.githubusercontent.com/15076445/169677198-20490944-0621-4b59-a3ab-9d1e0d037a28.png)

现在，当`counter()`在查找count变量时，查找本地词法环境为空,因为没有，则在外部`makeCounter()`的词法环境，并且在哪里找到就在哪里修改。

**在变量所在的词法环境中更新变量。**
这是执行后的状态：
![image](https://user-images.githubusercontent.com/15076445/169677307-b4c55e9c-7d60-4615-a899-9764807fb6b9.png)


闭包：由函数创造的一个词法作用域，函数中创建的变量被引用后。可以在这个词法作用域之外自由使用
使用：通常被使用来创造内部变量。使得这些变量不被外部随意修改，同时又可以通过指定的函数接口修改读取



this: 
1.词法作用域中的一个属性，它是动态的。
2、谁.的或谁[]的就谁。
3、call 、apply、bind 谁就是谁。
4、自己没有 this 的一直找上层的，直到返回 Global。

函数调用时候把this当作形参，实参根据规则该传啥传啥。说白了就是个 call 调用func(a,b,...) --> func.call(this, a,b, ....)这在使用层是看不到的，隐式的传参，最为直白（不严谨）的例子就是func(a,b) 实际调用时候引擎是 func(this,arguments, ... a, b) 这种方式
