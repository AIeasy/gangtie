import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/vue-Login.vue'
import Home from '../components/vue-Home.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})
// 路由守卫
/* eslint-disable  */

router.beforeEach((to, from, next) => {
  if(to.path === '/login') return next();
  const mytoken = window.sessionStorage.getItem('token');
  if (!mytoken) return next('/login');
  next()
})
/* eslint-enable  */
export default router
