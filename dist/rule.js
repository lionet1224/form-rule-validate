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
  // regexp
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var STARTENDSPACE = /(^\s*)|(\s*$)/g;

  /**
   * 入口类
   * @param {string} elem 元素类名/id
   * @param {boolean} type 禁用表单提交
   */

  var Rule = (function () {
    function Rule(el) {
      var type = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      _classCallCheck(this, Rule);

      // 保存表单
      this.$dom = this.query(el);
      // 维护的字段数据
      this.data = {};
      // 验证器
      // 如果dom的l-validate在验证器中没有对应的字段，将默认拒绝访问
      this.validator = new Validator();

      // 加载dom中的存在l-validate的元素
      this.load();
      // 监听form的提交事件
      this.listen(type);
    }

    /**
     * 保存分析每个字段数据
     * @param {object} dom元素
     */

    /**
     * 处理v-validate元素，将其保存至data
     */

    _createClass(Rule, [{
      key: 'load',
      value: function load() {
        var _this = this;

        var elems = this.query('[l-validate]', true, this.$dom);
        elems.forEach(function (elem) {
          if (_this.data[elem.name]) {
            console.warn('field ' + elem.name + ' exist!');
            return;
          }
          _this.data[elem.name] = new Field(elem);
        });
      }

      /**
       * 默认false禁用表单提交
       * @param {boolean} type 是否为ajax请求。
       */
    }, {
      key: 'listen',
      value: function listen(type) {
        var _this2 = this;

        type && this.$dom.setAttribute('novalidate', true);
        // 判断数据是否正确，再提交数据
        this.$dom.onsubmit = function () {
          var verify = _this2.validate();
          // 如果type为false，将可以表单提交，如果为true，将不能表单提交
          if (verify && !type) return true;
          return false;
        };
      }

      /**
       * 验证数据是否正确
       */
    }, {
      key: 'validate',
      value: function validate() {
        // 报错信息
        var errors = {};
        for (var key in this.data) {
          var field = this.data[key];
          for (var i = 0; i < field.validate.length; i++) {
            var _name = field.validate[i];
            var f = this.validator.validates[_name];
            if (f) {
              var v = f.fn(field.$dom.value);
              if (!v) {
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
    }, {
      key: 'submit',
      value: function submit(fn) {
        this.validateCallBack = fn;
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

      /**
       * 获取字段数据
       * @param {string} key 值的key
       */
    }, {
      key: 'get',
      value: function get(key) {
        var _this3 = this;

        if (key) {
          return this.data[key].$dom.value;
        } else {
          var _ret = (function () {
            var data = {};
            Object.keys(_this3.data).map(function (key) {
              data[key] = _this3.data[key].$dom.value;
            });
            return {
              v: data
            };
          })();

          if (typeof _ret === 'object') return _ret.v;
        }
      }
    }]);

    return Rule;
  })();

  var Field = (function () {
    function Field(elem) {
      _classCallCheck(this, Field);

      this.$dom = elem;
      this.name = elem.name;

      this.loadValidate(elem.getAttribute('l-validate'));
    }

    /**
     * 验证器，所有的规则保存其中
     */

    /**
     * 解析l-validate里面的规则
     * @param {string} v 规则字符串
     */

    _createClass(Field, [{
      key: 'loadValidate',
      value: function loadValidate(v) {
        var arr = v.split('|').map(function (item) {
          return item.replace(STARTENDSPACE, '');
        });
        this.validate = arr.filter(function (i) {
          return i.length;
        });
      }
    }]);

    return Field;
  })();

  var Validator = (function () {
    function Validator() {
      _classCallCheck(this, Validator);

      this.validates = {};

      this.load();
    }

    /**
     *  加载默认规则
     */

    _createClass(Validator, [{
      key: 'load',
      value: function load() {
        // 必须存在值，可以为空字符串->"    "
        this.create('required|Value cannot be empty', function (val) {
          if (val.length > 0) return true;
          return false;
        });
        // 值不能为空字符串
        this.create('filled|Value cannot be an empty string', function (val) {
          val = val.replace(STARTENDSPACE, '');
          if (val > 0) return true;
          return false;
        });
        // 值为数字
        this.create('number|Value cannot be not number', function (val) {
          if (val.length > 0 && !isNaN(val)) return true;
          return false;
        });
      }

      /**
       * 创建一条规则
       * @param {string} 规则键值以及错误说明, 以管道符分隔，例子: test|test
       * @param {function} 验证函数，给一个形参val为字段的值，验证成功返回true，失败反之
       */
    }, {
      key: 'create',
      value: function create(key, fn) {
        if (!key) {
          console.error("rule name dont't exists");
          return;
        }
        if (!fn) {
          console.error("validate function dont't exists");
          return;
        }

        var keyArr = key.split('|');
        // 规则键值
        var name = keyArr[0];
        // 错误说明
        var errorInfo = keyArr[1];

        // 判断是否存在这条规则
        if (this.validates[name]) {
          console.error('create ' + name + ' fail, this a validate exists');
          return;
        }

        this.validates[name] = {
          errorInfo: errorInfo,
          fn: fn
        };
      }

      /**
       * 修改错误信息
       * @param {string} key 规则key
       * @param {string} info 错误信息
       */
    }, {
      key: 'setErrorInfo',
      value: function setErrorInfo(key, info) {
        this.validates[key].errorInfo = info;
      }
    }]);

    return Validator;
  })();

  module.exports = Rule;
});
