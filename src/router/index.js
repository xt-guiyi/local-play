import { createRouter, createWebHashHistory } from "vue-router";
import ShopDetails from "../views/ShopDetails.vue";
const ShopFoodDetails = ()=> import(/* webpackChunkName: "FoodDetails" */ "../views/ShopFoodDetails.vue")
const routes = [
  {
    path: "/",
    name: "shopDetails",
    component: ShopDetails,
  },
  {
    path: "/shopFoodDetails/",
    name: "shopFoodDetails",
    component: ShopFoodDetails
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,

});

// 路由动画
router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transitionName = toDepth > fromDepth ? 'animated fadeInRight' : 'animated fadeInLeft'
})
export default router;
