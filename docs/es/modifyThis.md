# call
 - 在`运行时`修改 `this`
 - 只是临时修改 也就是`一次性`的,`立即执行`
 - 第一个参数为 this 要指向的目标,剩下的是位数就和普通参数一样 逗号分隔 传递参数
```javascript
let obj = {
      name: '我是obj',
      say: function(...args) {
          alert('obj 此时的this 指向:'+ JSON.stringify(this));
          alert('传递的参数：'+ args);
          alert('指向的：：'+this.name);
      }
        }
let obj2 = {
    name: '我是obj2'
}
const callBtn = document.querySelector('.callBtn');
callBtn.addEventListener('click', ()=>{
    obj.say.call(obj2,'call修改this指向 我是传递的参数 是参数列表','我是第二个');
});
```
## apply

- 在运行时修改
- 也是一次性的 `立即执行`
- 第一个参数是 this 指向的目标,第二个参数为一个`数组`传递参数

```javascript
let obj = {
      name: '我是obj',
      say: function(...args) {
          alert('obj 此时的this 指向:'+ JSON.stringify(this));
          alert('传递的参数：'+ args);
          alert('指向的：：'+this.name);
      }
        }
let obj2 = {
    name: '我是obj2'
}
const applyBtn = document.querySelector('.applyBtn');
applyBtn.addEventListener('click', ()=>{
  obj.say.apply(obj2,['apply 修改this指向，我是传递的参数 是个数组','数组第二个']);
});
```

## bind

- 在`运行时`修改
- 该方法在修改后并不会立即执行,而是`返回一个函数`,所以是`永久的`
- bind 传递参数可以分多次

```javascript
let obj = {
      name: '我是obj',
      say: function(...args) {
          alert('obj 此时的this 指向:'+ JSON.stringify(this));
          alert('传递的参数：'+ args);
          alert('指向的：：'+this.name);
      }
        }
let obj2 = {
    name: '我是obj2'
}
const bindBtn = document.querySelector('.bindBtn');
bindBtn.addEventListener('click', ()=>{
   const  bindFunc =  obj.say.bind(obj2,'bind修改this指向这是参数');
   bindFunc('第二个参数','第三个参数');
});
```

## 结论

1. 修改 `this` 指向 在 `运行时  ` 修改

2. `bind` `apply` `call` 都可以修改 this 使用时第一个参数是修改this 的指向,

    如果为 `null` 或者 `undefined` 那么就指向 `window`

3. `call` 和 `apply` 是修改后立即执行该函数  `bind` 则是返回一个函数

4. 传递参数时:

   `call` 其余参数是 参数列表 

   `apply` 第二个参数是`数组` 备注:多个数组不报错 之有第一个有效，

   `bind` 也是参数列表 bind 可以分多次传入

## 如何自己实现bind,call,apply

```javascript
Function.prototype.bind2 = function(){
    let [ctx, ...args] = arguments;
    return (...arguments)=>{
        return this.apply(ctx,[...args,...arguments]);
    }
}
Function.prototype.apply2 = function(){
    let [ctx, arry] = arguments;
    ctx = ctx || window;
    ctx.fn = this;
    const result = ctx.fn(arry);
    delete ctx.fn;
    return result
}
Function.prototype.call2 = function(){
    let [ctx, ...args] = arguments;
    ctx = ctx || window;
    ctx.fn = this;
    const result = ctx.fn(...args);
    delete ctx.fn;
    return result
}
```
## 文档查阅

[Call 和 apply 实现](https://github.com/mqyqingfeng/Blog/issues/11 )

[Bind 实现](https://github.com/mqyqingfeng/Blog/issues/12)