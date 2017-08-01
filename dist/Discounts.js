"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var bulk = {
  getPrice: function getPrice(unitPrice, amount, rule) {
    if (rule.minAmount <= amount) {
      return amount * rule.discountPrice;
    }
    return unitPrice * amount;
  }
};

var twoForOne = {
  getPrice: function getPrice(unitPrice, amount) {
    return Math.ceil(amount / 2) * unitPrice;
  }
};

exports.default = {
  bulk: bulk,
  twoForOne: twoForOne
};