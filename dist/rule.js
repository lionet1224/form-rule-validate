/**
 * 
 * 入口类，所有的方法在这里面
 * 
 * @param (string) 元素类名/id
 */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log("123" + "asdf");

var Rule = (function () {
  function Rule(el) {
    _classCallCheck(this, Rule);

    // 保存dom
    this.$dom = this.query(el);

    // 加载dom中的存在l-validate的元素
    this.load();
  }

  // 加载元素

  _createClass(Rule, [{
    key: "load",
    value: function load() {}

    // 获取一个dom元素
  }, {
    key: "query",
    value: function query(elem) {
      return document.querySelector(elem);
    }
  }]);

  return Rule;
})();

module.exports = Rule;
