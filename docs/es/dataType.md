## typeof 数据类型检测

- 依赖于 二进制 地址进行 判断
- 对 `数组, 对象, 日期, 正则, null` 输出都为 `Object`

```javascript
     console.log(typeof 1);                 // number
     console.log(typeof '1');               // string
     console.log(typeof false);             // boolean
     console.log(typeof undefined);         // undefined
     console.log(typeof function(){});      // function

     // 特殊:因为 依赖于二进制地址进行判断 这些的地址是0000开始
     console.log(typeof {name:1});          // object
     console.log(typeof [1,2, 3, 0, 0, 0]); // object
     console.log(typeof null);              // object
     console.log(typeof new Date);					// object

```



## instanceof 数据类型检测

- 不能检测基本数据类型
- 检测是 依据原型连上的类型来判断, 由于可以修改原型指向所以不准确, 判断继承 关系和实例 

```javascript
/// instanceof 实现原理 
function instance_of(obj,classFunc) {
  if (classFunc ===null) return false;
  if (Object.getPrototypeOf(obj) === classFunc.prototype) 
    return true;
  instance_of(Object.getPrototypeOf(obj),classFunc.prototype);
}
```



## Object.prototype.toString.call() 数据类型检测

+ 可以判断(除自定义对象外的)js 的所有类型

```javascript
    Object.prototype.toString.call('字符串') 	        // "[object String]"
    Object.prototype.toString.call(1) 				        // "[object Number]"
    Object.prototype.toString.call(false) 		        // "[object Boolren]"
    Object.prototype.toString.call(Symbol(1))         // "[object Symbol]"
    Object.prototype.toString.call(null) 							// "[object Null]"
    Object.prototype.toString.call(undefined) 				// "[object Undefined]"
    Object.prototype.toString.call(function(){}) 			// "[object Function]"
    Object.prototype.toString.call({name: 'name'}) 		// "[object Object]"

// 弊端
		function f(){}
		const a = new f();
		Object.prototype.toString.call(a)  								// "[object Object]"
```

+ 这些类型就继承自 Object Object类中可以拿到 真实的数据类型

+ 这些类型又都重写了父类的 toString() 函数
+ 所以使用原始Object.prototype.toString 在调用call 或者 apply 修改 原始类的指向 跳过了 父类 也就是 自己是自己的爹 这样就拿到了 真实的数据类型

[浅谈Object.prototype.toString.call(obj)功能及原理_寒烟说的博客-CSDN博客](https://blog.csdn.net/hanyanshuo/article/details/104620122)

## constructor 数据类型检测

+ 改函数叫构造函数 也可以用来做数据检测 前置条件必须是对象构建出来的 也就是说 null 和 undefined 不可以 省下的都可以, 但是弊端也很明显 既然是对象 构建那么 如果修改了引用 那么类型也就变了 所以也是不准确的

```javascript
		function f(){}
		const a = new f();
		f1.constructor()
```



## 自定义

```javascript
 (function(){
        let typeObj = {};
        ['String', 'Number', 'Boolean', 'Date', 'RegExp', 'Object', 	'Function','Symbol','Error','Array'].forEach(name =>{
            typeObj[`[object ${name}]`] = name.toLowerCase();
        })
        function totype(obj){
          /// undefined 和 null 是相等的
            if(obj == null) return obj+'';
          /// 参照 typeof 的 规则  object 和 function 
            return typeof obj === 'object' || typeof obj === 'function' ?
            typeObj[toString.call(obj)] || 'object' : typeof obj
        }
        window.totype = totype;
    })()
    window.totype(function(){})
```

