import Vue from "vue";
import Router from "vue-router";
import Home from './main'
import {
  NODE_ENV
} from "@assets/config/config";
import cookie from "@assets/utils/cookie.js";
Vue.use(Router);
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      redirect: "/home",
      components:Home
    },
  ]
});
router.beforeEach((to, from, next) => {

  next();
});
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
  // 或
  // window.scroll(0, 0);
});
export default router;