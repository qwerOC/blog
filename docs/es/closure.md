# 什么是闭包?

`闭包`  是 函数及其上文, 封装起来的整体,叫做闭包,也就是说闭包让你在一个 内层函数 可以访问 外层函数的作用域

封装起来的内容例如(变量 事件绑定等),此时当前上下文`不能被释放`,内部存储的`私有变量`和对应的`值`也会被保留 

## 应用场景

- 单例模式
- 惰性函数
- 柯理化函数
- compose组合函数

## 柯理化函数

柯理化函数是一种思想: `预先存储`

1. 把一些信息存储到不被释放的上下文中
2. 之后基于作用域链,可以让其`下级`访问到存储的信息值

```javascript
    function fn(){
        let params = Array.from(arguments);
        return function closure(){
            let args = Array.from(arguments);
            return params.concat(args);
        }
    }
    let bind = fn(10,20);
    let eg1 = bind(30,40);
    let eg2 = bind(50,60);
    console.log('柯理化',eg1); // 10 20 30 40
    console.log('柯理化',eg2); // 10 20 50 60
```

## 组合函数

组合函数是柯理化函数的一种特殊函数组合, 简单说就是把函数链接起来,也叫函数式编程

```javascript
    const add = x => x+1;
    const mul = x => x*2;
    const divide = x => x/3;
    console.log('组合函数:'+ divide(mul(add(2)))); // 2
```

上述例子 会出现非常复杂的嵌套关系,可以利用`compose`来规避掉

- 执行compose需要预先出来函数柯理化,并返回一个函数
- 当把返回的函数执行时,换照,传递的顺序依次执行

```javascript
    const add = x => x+1;
    const mul = x => x*2;
    const divide = x => x/3;   
		const compose = (...funs)=>{
        return x =>{
            // x 是执行函数的值
         return funs.reduceRight((result,item) =>{
                return item(result);
           },x)
        }
    }
    const result = compose(divide,mul,add);
    console.log('compose:'+ result(2));//2
```