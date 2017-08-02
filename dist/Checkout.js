'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PricingRules = require('./PricingRules');

var _PricingRules2 = _interopRequireDefault(_PricingRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _store = new WeakMap();
var _pricingRules = new WeakMap();
var _cart = new WeakMap();

var Checkout = function () {
  function Checkout(pricingRules) {
    _classCallCheck(this, Checkout);

    var store = new Map();
    store.set('VOUCHER', { name: 'Cabify Voucher', unitPrice: 5 });
    store.set('TSHIRT', { name: 'Cabify T-Shirt', unitPrice: 20 });
    store.set('MUG', { name: 'Cabify Coffee Mug', unitPrice: 7.5 });
    _store.set(this, store);
    _pricingRules.set(this, pricingRules);
    _cart.set(this, new Map());
  }

  _createClass(Checkout, [{
    key: 'scan',
    value: function scan(itemCode) {
      var store = _store.get(this);

      if (!store.has(itemCode)) {
        return this;
      }

      var cart = _cart.get(this);
      var currentAmount = cart.get(itemCode) || 0;
      cart.set(itemCode, currentAmount + 1);
      _cart.set(this, cart);
      return this;
    }
  }, {
    key: 'total',
    value: function total() {
      var cart = _cart.get(this);
      var store = _store.get(this);
      var pricingRules = _pricingRules.get(this);
      var checkoutSum = 0;

      cart.forEach(function (itemAmount, itemCode) {
        var itemUnitPrice = store.get(itemCode).unitPrice;
        var itemPricingRule = pricingRules.get(itemCode);
        if (itemPricingRule) {
          checkoutSum += _PricingRules2.default[itemPricingRule.type].getPrice(itemUnitPrice, itemAmount, itemPricingRule);
        } else {
          checkoutSum += itemUnitPrice * itemAmount;
        }
      });
      return checkoutSum;
    }
  }]);

  return Checkout;
}();

exports.default = Checkout;