
const routes = [
  {
    path: '/',
    redirect: '/advice-generator',
    component: () => import('layouts/MainLayout.vue')
  },
  {
    path: '/advice-generator',
    name: '/advice-generator',
    component: () => import('../pages/AdviceGenerator.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
