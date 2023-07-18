
const routes = [
  {
    path: '/',
    redirect: {
      path: '/advice-generator'
    },
    component: () => import('layouts/MainLayout.vue'),
    // children: [
    //   { 
    //     path: 'my-listOfUser',
    //     name: 'my-listOfUser', 
    //     component: () => import('pages/listOfUser.vue'),
    //    },
    //   { 
    //     path: 'my-addUser',
    //     name: 'my-addUser', 
    //     component: () => import('pages/addUser.vue'),
    //    }

    // ]
  },

  {
    path: '/advice-generator',
    name: '/advice-generator',
    component: () => import('../pages/AdviceGenerator.vue')
  },

  // {
  //   path: '/example',
  //   name: '/example',
  //   component: () => import('../pages/MyExample.vue')
  // },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
