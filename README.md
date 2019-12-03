# Rule - 快速处理表单数据

从零造一个快速验证表单数据的轮子。

目前实现的功能有：

- [x] 自定义规则
- [x] 简单明确的数据匹配
- [x] 可以配置的错误信息
- [x] 快捷获取表单数据
- [x] 快速验证数据



# 使用

引入`rule.js`即可直接使用，在页面上，通过`new Rule(form)`创建一个实例，关联一个表单。

简单使用: 

```html
<html>
  <form id="test" method="get" action="#">
    <div class="form-item">
      <!-- name和l-validate为必须值，name是最后获取数据的key，l-validate是验证规则以及获取这个字段的key -->
      <input 
        name="number" 
        l-validate=
          "required
          |min:1,3,4
          |max:5
          |number
          |include:1,3,4,5,6,7
          "
        type="text"
      >
    </div>
    <button type="submit">Submit</button>
  </form>
    
  <script>
    // 创建一条表单验证实例
    let rule = new Rule('#test');

    // 表单如果提交了，会在上传之前执行，如果有报错将不会上传，参数为错误信息
    rule.submit(errors => {
        // 获取所有的字段信息
        rule.get();
    })
  </script>
</html>
```

在`l-validate`中编写验证规则，每个规则以管道符分隔，`:`之后的数据为参数，可以在验证规则中获取。

默认拥有的规则有: `require`/`filled`/`min:*`/`max:*`/`number`/`include`/`dbpassword`

具体的功能在下面介绍。



# 创建新规则

```javascript
// 创建一条新的规则
rule.validator.create('key|errorInfo', (val) => {
    // 在这里里面验证，返回true就是通过
});

// 如果有参数，可以写成
rule.validator.create('key:value1,value2,value3|errorInfo {{value1}} {{value2}}', (val, ...arg) => {
    // 在这里里面验证，返回true就是通过
});
```



# 所有方法介绍

## 创建实例

`new Rule(elem, [flag])`

创建`Rule`实例有两个参数, 第一个为元素的选择器，第二个为布尔值，默认为false。

flag:

* true 表单禁止提交，用于ajax提交
* flase 表单数据正确将自动提交



实例上的方法有:

* `get([string])` 提交后，获取字段数据，如果有参数就为单独获取字段`name='string'`的数据
* `setErrorInfo(key, errorInfo)` 关联到验证器的这个方法，具体可以看下面
* `submit(fn)` 表单提交后的回调函数，回调函数会给一个`errors`参数，为提交后的所有错误信息



## 验证器

实例上有一个验证器`validator`，通过`rule.validator`调用，验证器用于保存规则，修改规则。

规则器方法有`create`/`setErrorInfo`

* `create(key, callback)` 用于创建规则，key可以通过`|`分隔创建名称以及错误信息，示例: `test|this is a test`，key还可以给`l-validate`中的参数定义名称`test:value`，这样就可以在错误信息中，通过`{{value}}`来动态修改错误信息。
* `setErrorInfo(key, info)` 修改已有规则的错误信息

















