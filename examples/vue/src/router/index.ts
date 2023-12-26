import Vue from 'vue'
import VueRouter, { RawLocation, Route, RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push as unknown as Promise<Route>
const originalReplace = VueRouter.prototype.replace as unknown as Promise<Route>
VueRouter.prototype.push = function push(location: RawLocation) {
  return (originalPush as any).call(this, location).catch((err: Error) => err)
}
VueRouter.prototype.replace = function replace(location: RawLocation) {
  return (originalReplace as any)
    .call(this, location)
    .catch((err: Error) => err)
}

// 应用路由
export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: () => import('../views/monitor.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes,
})
export default router
