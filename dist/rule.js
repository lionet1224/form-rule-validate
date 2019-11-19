(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.Rule = mod.exports;
  }
})(this, function (exports, module) {
  /**
   * 入口类
   * @param {string} elem 元素类名/id
   * @param {boolean} type 是否禁止表单提交，默认为true
   */
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var Rule = (function () {
    function Rule(el) {
      var type = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      _classCallCheck(this, Rule);

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

    _createClass(Rule, [{
      key: 'load',
      value: function load() {
        var _this = this;

        var elems = this.query('[l-validate]', true, this.$dom);
        elems.forEach(function (elem) {
          console.log(elem);
          if (_this.data[elem.name]) {
            console.warn('field ' + elem.name + ' exist!');
            return;
          }
          _this.data[elem.name] = new Field(elem);
        });
      }

      /**
       * 获取dom元素
       * @param {string} elem 元素类名/id
       * @param {boolean} s 是否获取所有这个元素，默认为false
       * @param {object} parent 父级元素，默认为document
       */
    }, {
      key: 'query',
      value: function query(elem) {
        var s = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        var parent = arguments.length <= 2 || arguments[2] === undefined ? document : arguments[2];

        if (s) {
          return parent.querySelectorAll(elem);
        } else {
          return parent.querySelector(elem);
        }
      }
    }, {
      key: 'create',
      value: function create() {}
    }, {
      key: 'passes',
      value: function passes() {}
    }, {
      key: 'errors',
      value: function errors() {}
    }, {
      key: 'get',
      value: function get() {}
    }]);

    return Rule;
  })();

  var Field = (function () {
    function Field(elem) {
      _classCallCheck(this, Field);

      this.$dom = elem;

      this.loadValidate(elem.getAttribute('l-validate'));
    }

    /**
     * 解析l-validate里面的规则
     * @param {string} v 规则字符串
     */

    _createClass(Field, [{
      key: 'loadValidate',
      value: function loadValidate(v) {
        var arr = v.split('|').map(function (item) {
          return item.replace(/(^\s*)|(\s*$)/g, '');
        });
        console.log(arr);
      }
    }]);

    return Field;
  })();

  module.exports = Rule;
});
