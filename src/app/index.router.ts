import Vue from "vue";
import Router, { Route, RouteConfig } from "vue-router";
import * as PageLoading from "./pages/factory.page"
Vue.use(Router);

// route-level code splitting

export function createRouter() {
  return new Router({
    mode: "history",
    fallback: false,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    routes: [
      { path: "/", component: PageLoading.demoPagePreloading },

      { path: "/", redirect: "/top" }
    ]
  });
}
