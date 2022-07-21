## let && var
---
1. `let` 声明的属性 不会作用到 `window` 而 `var` 可以
```js
<script>
let age = 10;
console.log(window.age);// undefined
var sex = '男'
console.log(window.sex);// 男
</script>
```
2. `var` 允许在相同作用域中声明 `同名` 变量 `let` 不可以
```js
var a = 10;
var a = 20;
console.log(a); // 20

let b = 10;
let b /// 报错SyntaxError: Identifier 'me' has already been declared
```
3. `let` 是`块级作用域`   `var` 是 `函数作用域`
```js
// 块级别 作用域
function  aFun1(){
    // i 对于for循环外的范围是不可见的(i is not defined)
    for(let i = 1; i<5; i++){
        //  i只有在这里是可见的
    }
    // i 对于for循环外的范围是不可见的(i is not defined)
    // console.log('let' + i); // Uncaught ReferenceError: i is not defined
}
function aFun2(){
    // i 对于for循环外的范围是可见的
    for(var i = 1;i<5; i++){
        // i 在for 在整个函数体内都是可见的
    }
    // i 对于for循环外的范围是可见的
    console.log('var' + i);
}
aFun1();
aFun2()
```

## let && const
---
1. **let** 修饰的对象可以修改 不用立即 赋值
2. **const** 修饰的常量不可改变 需要立即赋值
```js
    // const a; // Uncaught SyntaxError: Missing initializer in const declaration
    // a = 10;
    // console.log(a);
    const b = 10;
    console.log(b);// 10
    // b = 20;
    // console.log(b); //Uncaught TypeError: Assignment to constant variable.
```
**const** 创建对象时 对象里边的属性可以修改
```js
    const c = {
        name: 'zhangsan',
        age: 18
    };
    console.log(c.name);
    c.name = '李四';
    console.log(c.name);
    // c = {
    //     sex: 1
    // }//   Uncaught TypeError: Assignment to constant variable.

    // 为什么对象可以修改呢
    // 个人理解 常量 存储 位置不同 对象 存储在堆区 而 c 变量只是指向栈区的的的 指针 栈区指向堆区 修改时改的堆区
    // 常量是直接存储在栈区的内存由系统管理
```

## let const 暂时性死区
---
总结一下浅淡的理解,**ES6** 之后出现的 **块级作用域**, 解决了一些问题,先说明一下块级作用域的特性

1. 不允许 **未声明的变量/常量** 提前使用

2. 不允许 **同名变量/常量** 在 **相同作用域**

3. **typeof** 不再是一个 安全的操作

```
// 未初始化前不能访问变量a
typeof a // ReferenceError: Cannot access 'a' before initialization
let a
```

## var 函数作用
```js
   var v1 = 1;// 此时该变量在window对象上 任何地方都可以访问
    function vfun(){
      var v2 = 2; // 此时改变量 不再window上边而在vfun的原型上
         v2 = 2; // 此时改变量window 上边
        console.log('v1='+v1);
        console.log('v2='+v2);
        
    }
    vfun();
// v2 在 window 都正常输出

    console.log('v1+v1='+v1);
    console.log(this.window);
    console.log('v2+v2='+v2);// v2 不再window上边 报错找不到v2

    console.log('v2+v2='+window.v2);// v2 不再window上边  undefind
```
