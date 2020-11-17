import { createRouter, createWebHistory } from "vue-router";
import jwtDecode from "jwt-decode";

const routes = [
  {
    path: "/",
    component: () => import("./../views/HomeTemplate"),
    children: [
      {
        path: "/",
        component: () => import("./../views/HomeTemplate/HomePage"),
      },
      {
        path: "/about",
        component: () => import("./../views/HomeTemplate/AboutPage"),
      },
      {
        path: "/stations",
        component: () => import("./../views/HomeTemplate/StationPage"),
      },
      {
        path: "/stations/:stationId",
        component: () => import("./../views/HomeTemplate/DetailStationPage")
      }
    ]
  },
  {
    path: "/admin",
    redirect: "/admin/dashboard"
  },
  {
    path: "/admin",
    component: () => import("./../views/AdminTemplate"),
    beforeEnter(to, from, next) {
      if(localStorage.getItem("token")) {
        try {
          const user = jwtDecode(localStorage.getItem("token"));
          if(user.userType === "Admin") {
            next();
          }
        } catch {
          next("/auth");
        }
      } else {
        next("/auth");
      }
    },
    children: [
      {
        path: "/admin/dashboard",
        component: () => import("./../views/AdminTemplate/DashboardPage")
      },
      {
        path: "/admin/stations",
        component: () => import("./../views/AdminTemplate/StationPage")
      },
      {
        path: "/admin/stations/create",
        component: () => import("./../views/AdminTemplate/CreateStationPage")
      },
      {
        path: "/admin/stations/:stationId/edit",
        component: () => import("./../views/AdminTemplate/EditStationPage")
      }
    ]
  },
  {
    path: "/auth",
    component: () => import("./../views/AdminTemplate/AuthPage")
  },
  {
    path: "/:patchMatch(.*)*",
    component: () => import("./../views/PageNotFound")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
