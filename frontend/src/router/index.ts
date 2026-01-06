import { createWebHistory, createRouter } from "vue-router"

import HomeView from "../views/HomeView.vue";
import EditorView from "../views/EditorView.vue";
import CollectionsView from "../views/CollectionsView.vue";
import LibraryView from "../views/LibraryView.vue";
import User from "../views/UserView.vue"
import NotFound from "../views/NotFound.vue";
import PrivateLibraryView from "../views/PrivateLibraryView.vue";



const routes  = [
  {
    path: "/editor",
    name: "editor",
    component: EditorView,
  },
  {
    path: "/collections",
    name: "collections",
    component: CollectionsView,
  },
  {
    path: "/library",
    name: "library",
    component: LibraryView,
  },
  {
    path: "/library/myicons",
    name: "privateLibrary",
    component: PrivateLibraryView,
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