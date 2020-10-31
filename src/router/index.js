import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'
import TopVideos from '../views/TopVideos'
import Favorites from '../views/Favorites'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "top-videos",
    component: TopVideos
  },
  {
    path: "/favorites",
    name: "favorites",
    component: Favorites
  },
  {
    path: "/video/:id",
    name: "video",
    component: ()=> import("../views/PlayVideo")
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
