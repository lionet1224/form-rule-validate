// regexp
const STARTENDSPACE = /(^\s*)|(\s*$)/g;

/**
 * 入口类
 * @param {string} elem 元素类名/id
 * @param {boolean} type 禁用表单提交
 */
class Rule{
  constructor(el, type = false){
    // 保存表单
    this.$dom = this.query(el);
    // 维护的字段数据
    this.data = {};
    // 验证器
    // 如果dom的l-validate在验证器中没有对应的字段，将默认拒绝访问
    this.validator = new Validator;

    // 加载dom中的存在l-validate的元素
    this.load();
    // 监听form的提交事件
    this.listen(type);
  }

  /**
   * 处理v-validate元素，将其保存至data
   */
  load(){
    let elems = this.query('[l-validate]', true, this.$dom);
    elems.forEach(elem => {
      if(this.data[elem.name]) {
        console.warn(`field ${elem.name} exist!`);
        return;
      }
      this.data[elem.name] = new Field(elem);
    });
  }

  /**
   * 默认false禁用表单提交
   * @param {boolean} type 是否为ajax请求。
   */
  listen(type){
    type && this.$dom.setAttribute('novalidate', true);
    // 判断数据是否正确，再提交数据
    this.$dom.onsubmit = () => {
      const verify = this.validate();
      // 如果type为false，将可以表单提交，如果为true，将不能表单提交
      if(verify && !type) return true;
      return false;
    }
  }

  /**
   * 验证数据是否正确
   */
  validate(){
    // 报错信息
    let errors = {};
    for(let key in this.data){
      let field = this.data[key];
      for(let i = 0; i < field.validate.length; i++){
        let name = field.validate[i];
        let f = this.validator.validates[name];
        if(f){
          let v = f.fn(field.$dom.value);
          if(!v){
            !errors[field.name] && (errors[field.name] = []);
            errors[field.name].push(f.errorInfo || "no error info");
          }
        }
      }
    }

    this.validateCallBack && this.validateCallBack(errors);

    // 如果有报错信息就不通过
    return !Object.keys(errors).length;
  }

  /**
   * 验证后回调
   * @param {function} fn 验证后回调
   */
  submit(fn){
    this.validateCallBack = fn;
  }

  /**
   * 获取dom元素
   * @param {string} elem 元素类名/id
   * @param {boolean} s 是否获取所有这个元素，默认为false
   * @param {object} parent 父级元素，默认为document
   */
  query(elem, s = false, parent = document){
    if(s){
      return parent.querySelectorAll(elem);
    } else {
      return parent.querySelector(elem);
    }
  }

  /**
   * 获取字段数据
   * @param {string} key 值的key
   */
  get(key){
    if(key){
      return this.data[key].$dom.value;
    } else {
      let data = {};
      Object.keys(this.data).map(key => {
        data[key] = this.data[key].$dom.value;
      })
      return data;
    }
  }
}

/**
 * 保存分析每个字段数据
 * @param {object} dom元素
 */
class Field{
  constructor(elem){
    this.$dom = elem;
    this.name = elem.name;

    this.loadValidate(elem.getAttribute('l-validate'));
  }

  /**
   * 解析l-validate里面的规则
   * @param {string} v 规则字符串
   */
  loadValidate(v){
    let arr = v.split('|').map(item => item.replace(STARTENDSPACE, ''));
    this.validate = arr.filter(i => i.length);
  }
}

/**
 * 验证器，所有的规则保存其中
 */
class Validator{
  constructor(){
    this.validates = {};

    this.load();
  }

  /**
   *  加载默认规则
   */
  load(){
    // 必须存在值，可以为空字符串->"    "
    this.create('required|Value cannot be empty', val => {
      if(val.length > 0) return true;
      return false;
    });
    // 值不能为空字符串
    this.create('filled|Value cannot be an empty string', val => {
      val = val.replace(STARTENDSPACE, '');
      if(val > 0) return true;
      return false;
    })
    // 值为数字
    this.create('number|Value cannot be not number', val => {
      if(val.length > 0 && !isNaN(val)) return true;
      return false;
    })
  }

  /**
   * 创建一条规则
   * @param {string} 规则键值以及错误说明, 以管道符分隔，例子: test|test
   * @param {function} 验证函数，给一个形参val为字段的值，验证成功返回true，失败反之
   */
  create(key, fn){
    if(!key){
      console.error("rule name dont't exists");
      return;
    }
    if(!fn){
      console.error("validate function dont't exists");
      return;
    }

    let keyArr = key.split('|');
    // 规则键值
    let name = keyArr[0];
    // 错误说明
    let errorInfo = keyArr[1];

    // 判断是否存在这条规则
    if(this.validates[name]) {
      console.error(`create ${name} fail, this a validate exists`);
      return;
    }

    this.validates[name] = {
      errorInfo,
      fn
    };
  }

  /**
   * 修改错误信息
   * @param {string} key 规则key
   * @param {string} info 错误信息
   */
  setErrorInfo(key, info){
    this.validates[key].errorInfo = info;
  }
}

export default Rule;