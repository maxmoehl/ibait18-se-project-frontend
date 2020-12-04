/**
 * This file binds and configures the router. This router allows us to have different urls while only serving a single
 * HTML file.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Register from "@/views/Register";
import Confirmation from "@/views/Confirmation";
import Login from "@/views/Login";
import Admin from "@/views/Admin";
import FAQ from "@/views/FAQ";
import Privacy from "@/views/Privacy";
import Reservations from "@/views/Reservations";
import Error from "@/views/Error";

// Bind router to vue runtime
Vue.use(VueRouter);

/**
 * Here we define the routes our app uses. For each route we define a path that the router will try to match, a name
 * to have a way of referencing the routes more easily and a component. That component will be loaded into the
 * <router-view> component in our App component. Additionally we tell the router to pass url parameters (those starting
 * with a colon) to be passed as a prop to avoid manually extracting the value from the route.
 *
 * @see @/App.vue
 */
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            login: false
        }
    },
    {
        path: '/register/:timeSlotId',
        name: 'register',
        component: Register,
        meta: {
            login: false
        },
        props: true
    },
    {
        path: '/confirmation',
        name: 'confirmation',
        component: Confirmation,
        meta: {
            login: false
        },
        props: true,
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
            login: true
        }
    },
    {
        path: '/faq',
        name: 'faq',
        component: FAQ,
        meta: {
            login: false
        }
    },
    {
        path: '/privacy',
        name: 'privacy',
        component: Privacy,
        meta: {
            login: false
        }
    },
    {
        path: '/admin/reservations',
        name: 'reservations',
        component: Reservations,
        meta: {
            login: true
        }
    },
    {
        path: '/error/:errorCode',
        name: 'error',
        component: Error,
        meta: {
            login: false
        },
        props: true
    }
]

/**
 * Create the instance, set the base url by parameter, enable HTML5 history mode and pass our routes.
 */
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
