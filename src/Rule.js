/**
 * 入口类
 * @param {string} elem 元素类名/id
 * @param {boolean} type 是否禁止表单提交，默认为true
 */
class Rule{
  constructor(el, type = true){
    // 保存表单
    this.$dom = this.query(el);
    // 维护的字段数据
    this.data = {};

    // 加载dom中的存在l-validate的元素
    this.load();
  }

  /**
   * 处理v-validate元素，将其保存至data
   */
  load(){
    let elems = this.query('[l-validate]', true, this.$dom);
    elems.forEach(elem => {
      console.log(elem)
      if(this.data[elem.name]) {
        console.warn(`field ${elem.name} exist!`);
        return;
      }
      this.data[elem.name] = new Field(elem);
    });
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

  create(){
    
  }

  passes(){

  }

  errors(){

  }

  get(){

  }
}

class Field{
  constructor(elem){
    this.$dom = elem;

    this.loadValidate(elem.getAttribute('l-validate'));
  }

  /**
   * 解析l-validate里面的规则
   * @param {string} v 规则字符串
   */
  loadValidate(v){
    let arr = v.split('|').map(item => item.replace(/(^\s*)|(\s*$)/g, ''));
    console.log(arr)
  }
}

export default Rule;