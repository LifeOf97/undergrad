import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/staff',
    name: 'staff',
    component: () => import(/* webpackChunkName: "authview" */ '../views/Staff.vue'),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "authview" */ '../components/AppStaffDashBoard.vue'),
      },
      {
        path: "myschedule",
        name: "myschedules",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "authview" */ '../components/AppStaffSchedule.vue'),
      },
      {
        path: "mystudents",
        name: "mystudents",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "authview" */ '../components/AppStaffStudents.vue'),
      },
      {
        path: "signout",
        name: "signout",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "authview" */ '../components/AppStaffSignout.vue'),
      },
    ]
  },
  {
    path: '/play',
    name: 'play',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "authview" */ '../views/play.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
