import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Register from "@/views/Register";
import Confirmation from "@/views/Confirmation";
import Login from "@/views/Login";
import Admin from "@/views/Admin";
import FAQ from "@/views/FAQ";
import Privacy from "@/views/Privacy";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register/:timeSlotId',
    name: 'register',
    component: Register,
    props: true
  },
  {
    path: '/confirmation/:bookingCode',
    name: 'confirmation',
    component: Confirmation,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/faq',
    name: 'faq',
    component: FAQ
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Privacy
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
