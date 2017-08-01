const bulk = {
  getPrice(unitPrice, amount, rule) {
    if (rule.minAmount <= amount) {
      return amount * rule.discountPrice
    }
    return unitPrice * amount
  }
}

const twoForOne = {
  getPrice(unitPrice, amount) {
    return Math.ceil(amount/2) * unitPrice
  }
}

export default {
  bulk,
  twoForOne
}