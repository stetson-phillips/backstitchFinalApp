import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/addcontent",
      name: "addcontent",
      component: () => import("./components/addContent")
    }
  ]
});
