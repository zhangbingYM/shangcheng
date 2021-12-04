import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/index',
    component: () => import('../views/index.vue'),
    children: [
      // {
      //   path:'/',
      //   redirect:'data'
      // },
      // 用户
      {
        path: 'user',
        component: () => import('../views/index/user.vue'),
        children: [{
            path: '/',
            redirect: 'user_list'
          },
          {
            path: 'user_list',
            component: () => import('../components/user_list.vue')
          }
        ]
      },
      // 数据
      {
        path: 'data',
        component: () => import('../views/index/data.vue'),
        children: [{
            path: '/',
            redirect: 'data_list'
          },
          {
            path: 'data_list',
            component: () => import('../components/data_list.vue')
          }
        ]
      },
      //权限
      {
        path: 'permissions',
        component: () => import( /* webpackChunkName: "permissions" */ '../views/index/permissions.vue'),
        children: [{
            path: '/',
            redirect: 'the_role_list'
          },
          {
            path: 'the_role_list',
            component: () => import( /* webpackChunkName: "permissions" */ '../components/the_role_list.vue')
          },
          {
            path: 'the_power_list',
            component: () => import( /* webpackChunkName: "permissions" */ '../components/the_power_list.vue')
          },
        ]
      },
      // 商品管理
      {
        path: 'shop',
        component: () => import( /* webpackChunkName: "shop" */ '../views/index/shop.vue'),
        children: [{
            path: 'list',
            component: () => import( /* webpackChunkName: "shop" */ '../components/list.vue')
          },
          {
            path: 'parameter',
            component: () => import( /* webpackChunkName: "shop" */ '../components/parameter.vue')
          },
          {
            path: 'sort',
            component: () => import( /* webpackChunkName: "shop" */ '../components/sort.vue')
          },
        ]
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router