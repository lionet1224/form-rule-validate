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

