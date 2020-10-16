// 店家食物类型
export const foodType = [
      "折扣",
      "盖浇饭",
      "凉菜",
      "炒粉/面/饭",
      "饮料",
      "炒菜"
    ]


// 店家食物模拟数据
export const foodData = [
  {
    type: "折扣",
    data: [
      { id: 110, foodName: "凉拌木耳", price: 24.8, alreadySell: 63, Discount: 0.8 },
      { id: 111, foodName: "炒面", price: 10.4, alreadySell: 138, Discount: 0.95 },
      { id: 112, foodName: "炒粉", price: 10.4, alreadySell: 138, Discount: 0.95 },
      {
        id: 113,
        foodName: "洋葱炒肉",
        price: 15.6,
        alreadySell: 91,
        Discount: 0.72,
        purchaseLimits: 1
      }
    ]
  },
  {
    type: "盖浇饭",
    data: [
      { id: 114, foodName: "手撕包菜", price: 12.4, alreadySell: 87 },
      { id: 115, foodName: "家常豆腐", price: 12.4, alreadySell: 61 },
      { id: 116, foodName: "酸辣藕丁", price: 12.4, alreadySell: 51 },
      { id: 117, foodName: "土豆片", price: 12.6, alreadySell: 92 },
      { id: 118,  foodName: "土豆丝", price: 12.4, alreadySell: 58 },
      { id: 119, foodName: "青椒香干", price: 12.4, alreadySell: 21 },
      { id: 120, foodName: "外婆菜炒鸡蛋", price: 12.4, alreadySell: 40 },
      { id: 121, foodName: "青椒炒蛋", price: 12.4, alreadySell: 40 },
      { id: 122, foodName: "菲菜炒蛋", price: 14.4, alreadySell: 49 },
      { id: 123, foodName: "西红柿炒鸡蛋", price: 16.4, alreadySell: 46 },
      { id: 124, foodName: "青菜炒肉", price: 12.4, alreadySell: 43 },
      { id: 125, foodName: "胡罗卜炒肉", price: 18.4, alreadySell: 40 },
      { id: 126, foodName: "香干回锅肉", price: 18.4, alreadySell: 70 },
      { id: 127, foodName: "肉末粉丝", price: 22.4, alreadySell: 44 },
      { id: 128, foodName: "千张炒肉", price: 22.4, alreadySell: 36 },
      { id: 129, foodName: "青椒炒肉", price: 18.4, alreadySell: 45 },
      { id: 130, foodName: "土豆片炒肉", price: 22.4, alreadySell: 41 }
    ]
  },
  {
    type: "凉菜",
    data: [
      { id: 131, foodName: "花生米", price: 15.6, alreadySell: 86 },
      { id: 132, foodName: "凉皮鸡蛋", price: 18.4, alreadySell: 18.8 },
      { id: 133, foodName: "凉拌黄瓜", price: 18.4, alreadySell: 25 },
      { id: 134, foodName: "凉拌木耳", price: 24.8, alreadySell: 63 },
      { id: 135, foodName: "毛豆", price: 26, alreadySell: 63 }
    ]
  },
  {
    type: "炒粉/面/饭",
    data: [
      { id: 136, foodName: "米饭", price: 1, alreadySell: 116 },
      { id: 137, foodName: "炒饭", price: 10.4, alreadySell: 81 },
      { id: 138, foodName: "炒粉", price: 10.4, alreadySell: 138 },
      { id: 139, foodName: "炒面", price: 10.4, alreadySell: 138 }
    ]
  },
  {
    type: "饮料",
    data: [
      { id: 140, foodName: "怡宝", price: 2, alreadySell: 55 },
      { id: 141, foodName: "特制啤酒", price: 3, alreadySell: 94 },
      { id: 142, foodName: "菠萝啤", price: 3, alreadySell: 29 },
      { id: 143, foodName: "绿茶", price: 3, alreadySell: 65 },
      { id: 144, foodName: "红茶", price: 3, alreadySell: 44 },
      { id: 145, foodName: "可乐", price: 3, alreadySell: 32 },
      { id: 146, foodName: "雪碧", price: 3, alreadySell: 48 },
      { id: 147, foodName: "绿茶（1L）", price: 4, alreadySell: 37 },
      { id: 148, foodName: "红茶（1L）", price: 4, alreadySell: 42 }
    ]
  },
  {
    type: "炒菜",
    data: [
      { id: 149, foodName: "肉末粉丝", price: 2, alreadySell: 55 },
      { id: 150, foodName: "手撕包菜", price: 3, alreadySell: 94 },
      { id: 151, foodName: "千叶豆腐", price: 3, alreadySell: 29 },
      { id: 152, foodName: "农家小炒肉", price: 3, alreadySell: 65 },
      { id: 153, foodName: "回锅牛肉", price: 3, alreadySell: 44 },
      { id: 154, foodName: "小炒顺风", price: 3, alreadySell: 32 },
      { id: 155, foodName: "菲菜炒蛋", price: 3, alreadySell: 48 },
      { id: 156, foodName: "鱼香肉丝", price: 4, alreadySell: 37 },
      { id: 157, foodName: "苦瓜炒蛋", price: 4, alreadySell: 42 },
      { id: 158, foodName: "香干炒肉", price: 4, alreadySell: 42 },
      { id: 159, foodName: "青椒肉丝", price: 4, alreadySell: 42 },
      { id: 160, foodName: "辣子鸡", price: 4, alreadySell: 42 },
      { id: 161, foodName: "土豆烧鸡", price: 4, alreadySell: 42 },
      { id: 162, foodName: "麻辣豆腐", price: 4, alreadySell: 42 }
    ]
  }
];
