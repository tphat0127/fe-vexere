import { createRouter, createWebHistory } from "vue-router";
import jwtDecode from "jwt-decode";

const routes = [
  {
    path: "/",
    component: () => import("./../views/HomeTemplate"),
    children: [
      {
        path: "/",
        component: () => import("./../views/HomeTemplate/HomePage")
      },
      {
        path: "/about",
        component: () => import("./../views/HomeTemplate/AboutPage")
      },
      {
        path: "/stations",
        component: () => import("./../views/HomeTemplate/StationPage")
      },
      {
        path: "/stations/:stationId",
        component: () => import("./../views/HomeTemplate/DetailStationPage")
      },
      {
        path: "/result",
        component: () => import("./../views/HomeTemplate/ResultSearchTripPage"),
        name: "result",
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
      if (localStorage.getItem("token")) {
        try {
          const user = jwtDecode(localStorage.getItem("token"));
          if (user.userType === "Admin") {
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
      },
      {
        path: "/admin/trips",
        component: () => import("./../views/AdminTemplate/TripPage")
      },
      {
        path: "/admin/trips/create",
        component: () => import("./../views/AdminTemplate/CreateTripPage")
      },
      {
        path: "/admin/trips/:tripId/edit",
        component: () => import("./../views/AdminTemplate/EditTripPage")
      },
      {
        path: "/admin/trips/:tripId/detail",
        component: () => import("./../views/AdminTemplate/DetailTripPage")
      },
      {
        path: "/admin/coaches",
        component: () => import("./../views/AdminTemplate/CoachPage")
      },
      {
        path: "/admin/coaches/create",
        component: () => import("./../views/AdminTemplate/CreateCoachPage")
      },
      {
        path: "/admin/coaches/:coachId/edit",
        component: () => import("./../views/AdminTemplate/EditCoachPage")
      },
      {
        path: "/admin/users",
        component: () => import("./../views/AdminTemplate/UserPage")
      },
      {
        path: "/admin/users/:userId/edit",
        component: () => import("./../views/AdminTemplate/EditUserPage")
      },
      {
        path: "/admin/users/create",
        component: () => import("./../views/AdminTemplate/CreateUserPage")
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
