import PricingRules from './PricingRules'

const _store = new WeakMap()
const _pricingRules = new WeakMap()
const _cart = new WeakMap()
const _currency = new WeakMap()

export default class Checkout {
  constructor(pricingRules) {
    const store = new Map()
    store.set('VOUCHER', { name: 'Cabify Voucher', unitPrice: 5 })
    store.set('TSHIRT', { name: 'Cabify T-Shirt', unitPrice: 20 })
    store.set('MUG', { name: 'Cabify Coffee Mug', unitPrice: 7.5 })
    _store.set(this, store)
    _pricingRules.set(this, pricingRules)
    _cart.set(this, new Map())
  }

  scan(itemCode) {
    const store = _store.get(this)
    
    if (!store.has(itemCode)) {
      return this
    }

    const cart = _cart.get(this)
    const currentAmount = cart.get(itemCode) || 0
    cart.set(itemCode, currentAmount + 1)
    _cart.set(this, cart)
    return this
  }

  total() {
    const currency = _currency.get(this)
    const cart = _cart.get(this)
    const store = _store.get(this)
    const pricingRules = _pricingRules.get(this)
    let checkoutSum = 0

    cart.forEach((itemAmount, itemCode) => {
      const itemUnitPrice = store.get(itemCode).unitPrice
      const itemPricingRule = pricingRules.get(itemCode)
      if (itemPricingRule) {
        checkoutSum += PricingRules[itemPricingRule.type].getPrice(itemUnitPrice, itemAmount, itemPricingRule)
      } else {
        checkoutSum += itemUnitPrice * itemAmount
      }
    })
    return checkoutSum
  }
}
