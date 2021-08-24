import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5b1b85f8 = () => interopDefault(import('..\\pages\\allCources.vue' /* webpackChunkName: "pages/allCources" */))
const _6586e9c8 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _97d2748a = () => interopDefault(import('..\\pages\\myCources.vue' /* webpackChunkName: "pages/myCources" */))
const _e55f0bd8 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _c841729e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/allCources",
    component: _5b1b85f8,
    name: "allCources"
  }, {
    path: "/login",
    component: _6586e9c8,
    name: "login"
  }, {
    path: "/myCources",
    component: _97d2748a,
    name: "myCources"
  }, {
    path: "/register",
    component: _e55f0bd8,
    name: "register"
  }, {
    path: "/",
    component: _c841729e,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
