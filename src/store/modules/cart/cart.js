import { floatObj } from 'utils/floatObj.js'

export default {
  namespaced: true,
  state: {
    shopCart: new Map(), // 购物车
    foodList: [] // 商店食物列表
  },

  getters: {
    // 查找购物车对应的食物产品
    cartProducts(state) {
      let products = []
      for (const items of state.shopCart.values()) {
        // 查找与购物车食品分类对应的食品列表数据
        const currentTypeFood = state.foodList.find(
          foodItem => foodItem.type === items.type
        )
        // 再查找与购物车食品id对应的食品数据
        let currentFoodInfo = currentTypeFood.data.find(
          foodItem => foodItem.id === items.id
        )
        products.push({
          productInfo: currentFoodInfo,
          quantity: items.quantity
        })
      }
      return products
    },
    // 计算购物车总价（含折扣价）
    cartTotalPrice(state, getters) {
      return getters.cartProducts.reduce((total, items) => {
        // 原价
        const originalTotal = floatObj.add(
          total,
          floatObj.multiply(items.productInfo.price, items.quantity)
        )
        // 如果有折扣则
        const discountToTal = items.productInfo.Discount
          ? floatObj.add(
              total,
              floatObj.multiply(
                floatObj.multiply(
                  items.productInfo.price,
                  items.productInfo.Discount
                ),
                items.quantity
              )
            )
          : originalTotal
        return discountToTal.toFixed(2)
      }, 0)
    },
    // 计算购物车总价（不含折扣）
    cartDefaultTotalPrice(state, getters) {
      return getters.cartProducts.reduce((total, items) => {
        const originalTotal = floatObj.add(
          total,
          floatObj.multiply(items.productInfo.price, items.quantity)
        )
        return originalTotal.toFixed(2)
      }, 0)
    },

    // 食物分类
    foodClassify(state) {
      return state.foodList.map(item => item.type)
    },

    // 食物分类计数总量
    foodClassifyNumber(state, getters) {
      let ClassifyNumber = { total: 0 } // 食物分类对象
      let foodClassifyArray = getters.foodClassify // 食物类别数组
      // 添加类别
      foodClassifyArray.forEach(element => {
        ClassifyNumber[element] = 0
      })
      // 遍历添加不同分类的数量
      for (let index = 0; index < foodClassifyArray.length; index++) {
        for (const iterator of state.shopCart.values()) {
          if (foodClassifyArray[index] === iterator.type) {
            // 添加购物车中的数量到此
            ClassifyNumber[foodClassifyArray[index]] += iterator.quantity
            // 添加总价
            ClassifyNumber.total += iterator.quantity
          }
        }
      }
      return ClassifyNumber
    }
  },

  mutations: {
    // 提交商店食物列表
    SET_FOOD_LIst({ foodList }, payload) {
      foodList.push(...payload)
    },

    // 添加食物到购物车
    ADD_FOOD_TO_SHOP_CART({ shopCart }, { id, type }) {
      shopCart.set(id, { id, type, quantity: 1 })
    },

    // 添加食物数量
    SET_CART_QUANTITY({ shopCart }, { id, isAdd }) {
      const cartItem = shopCart.get(id)
      if (isAdd) {
        cartItem.quantity++
      } else {
        cartItem.quantity--
        // 如果为零则从购物车中删除
        if (cartItem.quantity === 0) {
          shopCart.delete(id)
          return
        }
      }
      shopCart.set(id, cartItem)
    }
  },

  actions: {
    // 保存食物列表
    setFoodList({ commit }, payload) {
      commit('SET_FOOD_LIst', payload)
    },

    // 添加到购物车
    addToShopCart({ commit, state }, { id, type, isAdd }) {
      const cartItem = state.shopCart.get(id)
      // console.log(cartItem)
      if (!cartItem) {
        commit('ADD_FOOD_TO_SHOP_CART', { id, type })
      } else {
        commit('SET_CART_QUANTITY', { id, isAdd })
      }
    }
  }
}
