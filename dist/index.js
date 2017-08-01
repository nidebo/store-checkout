'use strict';

var _Checkout = require('./Checkout');

var _Checkout2 = _interopRequireDefault(_Checkout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pricingRules = new Map();
pricingRules.set("VOUCHER", { type: 'twoForOne' });
pricingRules.set("TSHIRT", { type: 'bulk', minAmount: 3, discountPrice: 19 });

// Items: VOUCHER, TSHIRT, MUG
// Total: 32.50€
var co = new _Checkout2.default(pricingRules);
co.scan("VOUCHER").scan("TSHIRT").scan("MUG");
var price = co.total();
console.log("VOUCHER, TSHIRT, MUG", price);

// Items: VOUCHER, TSHIRT, VOUCHER
// Total: 25.00€
co = new _Checkout2.default(pricingRules);
co.scan("VOUCHER").scan("TSHIRT").scan("VOUCHER");
price = co.total();
console.log("VOUCHER, TSHIRT, VOUCHER", price);

// Items: TSHIRT, TSHIRT, TSHIRT, VOUCHER, TSHIRT
// Total: 81.00€
co = new _Checkout2.default(pricingRules);
co.scan("TSHIRT").scan("TSHIRT").scan("TSHIRT").scan("VOUCHER").scan("TSHIRT");
price = co.total();
console.log("TSHIRT, TSHIRT, TSHIRT, VOUCHER, TSHIRT", price);

// Items: VOUCHER, TSHIRT, VOUCHER, VOUCHER, MUG, TSHIRT, TSHIRT
// Total: 74.50€
co = new _Checkout2.default(pricingRules);
co.scan("VOUCHER").scan("TSHIRT").scan("VOUCHER").scan("VOUCHER").scan("MUG").scan("TSHIRT").scan("TSHIRT");
price = co.total();
console.log("VOUCHER, TSHIRT, VOUCHER, VOUCHER, MUG, TSHIRT, TSHIRT", price);