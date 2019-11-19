/**
 * 
 * 入口类，所有的方法在这里面
 * 
 * @param (string) 元素类名/id
 */

console.log(`123${"asdf"}`)
class Rule{
  constructor(el){
    // 保存dom
    this.$dom = this.query(el);

    // 加载dom中的存在l-validate的元素
    this.load();
  }

  // 加载元素
  load(){
    
  }

  // 获取一个dom元素
  query(elem){
    return document.querySelector(elem);
  }
}

module.exports = Rule;