import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import CobaKategori2 from "../views/CobaKategori2.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DetailKategori from "../views/DetailKategori.vue";
import Dashboard from "../views/Dashboard.vue";
import Calender from "../views/Calender.vue";
// import Pengingat from "../views/Pengingat.vue";
import Profile from "../views/Profile.vue";
import DetailMenu from "../views/DetailMenu.vue";
import Kalender from "../views/Kalender.vue";
import FormResep from "../views/FormResep.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/cobakategori2",
        name: "CobaKategori2",
        component: CobaKategori2,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/detailkategori/:resepKategoriId",
        name: "DetailKategori",
        component: DetailKategori,
        props:true,
    },
    {
        path: "/Dashboard",
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path: "/calender",
        name: "Calender",
        component: Calender,
    },
    // {
    //     path: "/pengingat",
    //     name: "Pengingat",
    //     component: Pengingat,
    // },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        beforeEnter: cekToken,

    },
    {
        path: "/detailmenu/:resepId",
        name: "DetailMenu",
        component: DetailMenu,
        props: true
    },
    {
        path: "/kalender",
        name: "Kalender",
        component: Kalender,
        beforeEnter: cekToken,
    },
    {
        path: "/form",
        name: "FormResep",
        component: FormResep,
    },
];

function cekToken(to, from, next) {
    var isAuthenticated = false;

    if (localStorage.getItem('token')) {
        isAuthenticated = true
        next();
    }
    else {
        isAuthenticated = false
        next('/login')
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;