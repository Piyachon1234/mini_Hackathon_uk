import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Welcome.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/welcome",
    name: "Welcome",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Welcome.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
  },
  {
    path: "/personalProfile",
    name: "personalProfile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PersonalProfile"),
  },
  {
    path: "/recommendedUsers",
    name: "RecommendedUsers",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/RecUser"),
  },
  {
    path: "/editProfile",
    name: "EditProfile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditProfile"),
  },
  {
    path: "/logout",
    name: "Logout",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: {
      async beforeRouteEnter() {
        let response2 = await Vue.axios.get("/api/logout");
        if (response2.data.success) {
          this.$flashMessage.success({
            status: "Success",
            title: "Logged out",
            message: "Successfully logged out.",
          });
        } else {
          this.$flashMessage.error({
            status: "Failure",
            title: "Failed to log out",
            message: "Failed to log out.",
          });
          router.next({ name: "Welcome" });
        }
      },
    },
  },
];

const router = new VueRouter({
  routes,
});

const notIn = ["Welcome", "Login", "Signup"];

// Setup beforeEach hook to check the logged in syncs with backend logged in
router.beforeEach(async (to, from, next) => {
  // get  login state using whoami and axios
  let response = await Vue.axios.get("/api/whoami");
  // response.data is payload
  await store.dispatch("setLoggedInUser", response.data);
  let isLoggedIn = store.state.isLoggedIn;
  if (to.name === "Login" && isLoggedIn) {
    next({ name: "Home" });
  }
  // Need authorisation if not logged in
  if (!notIn.includes(to.name) && !isLoggedIn) {
    next({ name: "Welcome" });
  } else {
    next();
  }
});

export default router
