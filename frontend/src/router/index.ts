import { createWebHistory, createRouter } from "vue-router"

import HomeView from "../views/HomeView.vue";
import EditorView from "../views/EditorView.vue";
import User from "../views/UserView.vue"
import NotFound from "../views/NotFound.vue";


const routes  = [
  { 
    path: "/editor", 
    name: "editor",
    component: EditorView ,
  },
  {
    path: "/user/:id",
    name: "profile",
    component: User,
  },
  { 
    path: "/:pathMatch(.*)*", 
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active-link"
})