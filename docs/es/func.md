## 函数

函数 是由 function 关键定义 一次为 

- 函数名称
- 参数列表用 , 隔开
- {} 函数体

## 普通函数

谁调用 函数 关键字 `this` 就指向谁

`谁.`的函数 this 就指向谁

```js
function fun1(){
    console.log('this',this); // 输出 window
}
fun1();
```

```js
const obj = {
  name:'xiaoming',
  age:18,
  run(){
      console.log('run-this:',this); // obj
  },
  eat(){
    console.log('eat-this:',this); // obj
    setTimeout(function(){
    		    console.log('name:',this.name); // 空
          console.log('setTimeout-this:',this); // window
    },1000);
    let self = this;
    setTimeout(function(){
         console.log('self.name:',self.name); // xiaoming
          console.log('setTimeout-self:',self); // obj
    },1000);
  }
}
obj.run();
obj.eat();
```

```javascript
const obj = {
  	name:'xxx',
  	prop:{
    	getAge:function(){
          console.log('name'+ this.name); 
    }
  }
}
    console.log('1'+obj.prop.getAge()); // unfedined this=> obj.prop
const a = obj.prop.getAge;
    console.log('2'+a()); // undefined this=> window

```

## 箭头函数(ES6)

1. 箭头函数中`没有this`
2. 外层函数中的 `this` 指向谁 箭头函数中的 `this` 就指向谁 
3. 箭头函数还没有自己的argments,有也只是父作用域的

```js
const obj = {
  name:'xiaoming',
  age:20,
  eat(){
      console.log('eat-this',this); // obj
    setTimeout(()=>{
          console.log('name:'+ this.name); // 小明
      	  console.log('箭头函数this:'+this); // obj

    },1000);
	},
  play:()=>{
       console.log('play-this',this); // window
    setTimeout(()=>{
          console.log('play-name:'+ this.name); // 空
      	  console.log('play-箭头函数this:'+this); // window

    },1000);
  }
}
obj.eat();
obj.play();

// 第三点补充
const func = ()=>{
     console.log('args:'+ args);// ReferenceError: args is not defined
}
const func2 = (...args)=>{
     const [a,b,c] = args; // 分开打印
     console.log('args:'+ args);// args:1,2,3
}
func(1,2,3)
```

## new 关键字做了什么

new `创建对象` 将构造函数中的对象绑定到 `this`

### Dom 中的元素 绑定函数 

```
<button>按钮</button>
const btn = document.querySelector('button');
btn.onclick = function(){
      console.log('this',this);// button
}
```

