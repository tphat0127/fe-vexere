import { createRouter, createWebHistory } from "vue-router";


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
    path: "/:patchMatch(.*)*",
    component: () => import("./../views/PageNotFound")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
