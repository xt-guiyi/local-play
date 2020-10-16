import { floatObj } from "utils/floatObj.js"

export default {
namespaced: true,
state:{
  shopCart: new Map(),
  foodList: []
},

getters: {
  cartProducts(state) {
    let products = []
    for (const items of state.shopCart.values()) {
      const currentTypeFood =  state.foodList.find((foodItem)=> foodItem.type === items.type)
      let currentFoodInfo = currentTypeFood.data.find(foodItem=> foodItem.id === items.id)
      products.push({
        productInfo: currentFoodInfo,
        quantity: items.quantity
      })
    } 
    return products
  },
  cartTotalPrice(state,getters) {
    // console.log(getters.cartProducts)
    return getters.cartProducts.reduce((total, items) => {
      // console.log(items)
      const originalTotal = floatObj.add(total, floatObj.multiply(items.productInfo.price, items.quantity))
      const discountToTal = items.productInfo.Discount?  floatObj.add(total, floatObj.multiply(floatObj.multiply(items.productInfo.price, items.productInfo.Discount), items.quantity))  : originalTotal
      return discountToTal.toFixed(2)
    }, 0)
  },
  cartDefaultTotalPrice(state,getters) {
    return getters.cartProducts.reduce((total, items) => {
      const originalTotal = floatObj.add(total, floatObj.multiply(items.productInfo.price, items.quantity))
      return originalTotal.toFixed(2)
    }, 0)
  }
},

mutations: {
  SET_FOOD_LIst({ foodList }, payload) {
    foodList.push(...payload)
  },
  // 添加食物到购物车
  ADD_FOOD_TO_SHOP_CART({ shopCart }, {id, type} ) {
      shopCart.set(id, {id, type, quantity: 1})
      
  },
  // 添加食物数量
  SET_CART_QUANTITY({ shopCart }, {id, isAdd} ) {

    const cartItem = shopCart.get(id)
    console.log(cartItem)
    if (isAdd) {
      cartItem.quantity++ 
    }else {
      cartItem.quantity--
      // 如果为零则从购物车中删除
      if(cartItem.quantity === 0) {
        shopCart.delete(id)
        return
      }
    }
    shopCart.set(id, cartItem)
  },
},

actions: {
  // 保存食物列表
  setFoodList({ commit }, payload){
    commit('SET_FOOD_LIst', payload)
  },
  // 添加到购物车
  addToShopCart({ commit, state }, { id, type,isAdd }){
    const cartItem = state.shopCart.get(id)
    // console.log(cartItem)
      if(!cartItem) {
        commit('ADD_FOOD_TO_SHOP_CART', {id,type})
      } else{
        commit('SET_CART_QUANTITY', {id, isAdd})
      }
  },
}
}
