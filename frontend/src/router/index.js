import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';
import Cookies from "js-cookie";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: "Welcome | WEB-CGIMS",
      transition: 1,
      transitionName: "",
    },
  },
  {
    path: '/staffs/:staffId',
    name: 'staff',
    redirect: {name: 'dashboard'},
    component: () => import(/* webpackChunkName: "staff" */ '../views/Staff.vue'),
    props: true,
    meta: {
      requiresAth: true,
      title: "Dashboard | Staff | WEB-CGIMS",
      transition: 3,
      transitionName: "",
    },
    children: [ // nested routes
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/AppStaffDashBoard.vue'),
      },
      {
        path: "myschedules",
        name: "myschedules",
        component: () => import(/* webpackChunkName: "schedules" */ '../components/AppStaffSchedule.vue'),
        meta: {title: "Schedules | WEB-CGIMS"},
      },
      {
        path: "mystudents",
        name: "mystudents",
        component: () => import(/* webpackChunkName: "students" */ '../components/AppStudent.vue'),
        meta: {title: "Students | WEB-CGIMS"},
      },
      {
        path: "mystudents/:regNo",
        name: "details",
        props: true,
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
          {
            path: "result",
            name: "studentcounsel",
            component: () => import(/* webpackChunkName: "studentcounsel" */ '../components/AppStaffCounsel.vue'),
          },
        ]
      },
    ]
  },
  {
    path: '/students/:department/:level/:regNo',
    name: 'student',
    redirect: {name: 'mydashboard'},
    component: () => import(/* webpackChunkName: "staff" */ '../views/Student.vue'),
    props: true,
    meta: {
      requiresAth: true,
      title: "Dashboard | Student | WEB-CGIMS",
      transition: 3,
      transitionName: "",
    },
    children: [ // nested routes
      {
       path: "mydashboard", 
       name: "mydashboard",
       component: () => import(/* webpackChunkName: "dashboard" */ '../components/AppStudentDashBoard.vue'),
      },
      {
        path: "mycounsel", 
        name: "mycounsel",
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/AppStudentCounsel.vue'),
       },
       {
        path: "brochure", 
        name: "brochure",
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/AppStudentBrochure.vue'),
       },
    ]
  },
  {
    path: "/aboutus",
    name: "aboutus",
    component: () => import(/* webpackChunkName: "signout" */ '../views/AboutUs.vue'),
    meta: {title: "About Us | WEB-CGIMS", transition: 2, transitionName: ""},
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import(/* webpackChunkName: "signout" */ '../views/Signin.vue'),
    meta: {
      title: "Sign in | WEB-CGIMS",
      transition: 2,
      transitionName: ""
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue'),
    meta: {transition: 10, title: "404 | Page not found"},
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  document.title = to.meta.title;

  if (to.meta.requiresAth && !Cookies.get("authToken")) {
    return {name: 'signin'}
  }
  else if (to.fullPath.includes("staffs")) {
    store.dispatch("actionFetchStaffData", {username: Cookies.get("authUser")})
    store.dispatch("actionFetchSchedule")
    store.dispatch("actionFetchStudents")
    store.dispatch("actionFetchObservation")
    store.dispatch("actionFetchCounsel")
  }
  else if (to.fullPath.includes("students")) {
    store.dispatch("actionFetchStudentData")
    // store.dispatch("actionFetchStudentCounsel")
  }
  else {
    return true
  }
})

router.afterEach((to, from) => {
  // set the transition name of the incoming route, base on the
  // the direction of the route
  to.meta.transitionName = to.meta.transition > from.meta.transition ? "slide-left":"slide-right";
})

export default router
