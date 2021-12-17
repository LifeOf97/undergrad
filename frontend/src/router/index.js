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
    redirect: {name: 'dashboard'},
    component: () => import(/* webpackChunkName: "staff" */ '../views/Staff.vue'),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/AppStaffDashBoard.vue'),
      },
      {
        path: "myschedule",
        name: "myschedules",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "schedules" */ '../components/AppStaffSchedule.vue'),
      },
      {
        path: "mystudents",
        name: "mystudents",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "students" */ '../components/AppStudent.vue'),
      },
      {
        path: "mystudents/details",
        name: "details",
        redirect: {name: 'studentdata'},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "details" */ '../components/AppStudentDetail.vue'),
        children: [
          {
            path: "data",
            name: "studentdata",
            component: () => import(/* webpackChunkName: "studentdata" */ '../components/AppStudentData.vue'),
          },
          {
            path: "observation",
            name: "studentobservation",
            component: () => import(/* webpackChunkName: "studentobservation" */ '../components/AppStudentObservation.vue'),
          },
        ]
      },
      {
        path: "mystudents/data/observation",
        name: "observation",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
      },
      {
        path: "signout",
        name: "signout",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "signout" */ '../components/AppStaffSignout.vue'),
      },
    ]
  },
  {
    path: '/play',
    name: 'play',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "play" */ '../views/play.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
