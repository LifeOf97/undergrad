import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: "Welcome | Career Guidance"
    },
    beforeEnter: (to) => {
      document.title = to.meta.title;
    },
  },
  {
    path: '/:staffId',
    name: 'staff',
    redirect: {name: 'dashboard'},
    component: () => import(/* webpackChunkName: "staff" */ '../views/Staff.vue'),
    props: true,
    meta: {
      requiresAth: true,
      title: "Dashboard | Career Guidance"
    },
    beforeEnter: (to) => {
      if (to.meta.requiresAth && !store.state.isAuthenticated) {
        return {name: 'signin'}
      }
      else {
        document.title = to.meta.title;
        return true
      }
    },
    children: [ // nested routes
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/AppStaffDashBoard.vue'),
      },
      {
        path: "myschedule",
        name: "myschedules",
        component: () => import(/* webpackChunkName: "schedules" */ '../components/AppStaffSchedule.vue'),
        meta: {
          title: "Schedules | Career Guidance"
        },
        beforeEnter: (to) => {
          document.title = to.meta.title;
        }
      },
      {
        path: "mystudents",
        name: "mystudents",
        component: () => import(/* webpackChunkName: "students" */ '../components/AppStudent.vue'),
        meta: {
          title: "Students | Career Guidance"
        },
        beforeEnter: (to) => {
          document.title = to.meta.title;
        }
      },
      {
        path: "mystudents/details",
        name: "details",
        redirect: {name: 'studentdata'},
        component: () => import(/* webpackChunkName: "details" */ '../components/AppStudentDetail.vue'),
        children: [ // nested routes
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
    ]
  },
  {
    path: "/signin",
    name: "signin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "signout" */ '../views/Signin.vue'),
    meta: {
      title: "Sign in | Career Guidance"
    },
    beforeEnter: (to) => {
      document.title = to.meta.title;
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
