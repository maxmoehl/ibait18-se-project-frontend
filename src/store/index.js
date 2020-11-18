import Vuex from "vuex";
import Vue from "vue";
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.headers.Accept = 'application/json';

export default new Vuex.Store({
    state: {
        guests: [],
        timeSlots: [],
        reservations: [],
        loggedIn: false
    },
    mutations: {
        setTimeslots: (state, timeSlots) => {
            state.timeSlots = timeSlots;
        },
        setReservations: (state, reservations) => {
            state.reservations = reservations;
        },
        addGuest: (state, guest) => {
            state.guests.push(guest);
        },
        deleteGuest: (state, index) => {
            state.guests.splice(index, 1);
        },
        setLoginState: (state, loginState) => {
            state.loggedIn = loginState;
            if (!loginState) {
                delete localStorage.authToken;
            }
        },
        clearGuests: state => {
            state.guests = [];
        }
    },
    getters: {
        getTimeSlot: state => timeSlotId => {
            for (let i = 0; i < state.timeSlots.length; i++) {
                if (state.timeSlots[i]._id === timeSlotId) {
                    return state.timeSlots[i];
                }
            }
            return null;
        },
        getTimeSlotsByDate: state => date => {
            return state.timeSlots.filter(d => {
                return new Date(d.startDate).getFullYear() === date.getFullYear() &&
                    new Date(d.startDate).getMonth() === date.getMonth() &&
                    new Date(d.startDate).getDate() === date.getDate();
            });
        }
    },
    actions: {
        init: context => {
            context.dispatch('loadTimeSlots');
            let authToken = localStorage.authToken;
            if (authToken !== '') {
                axios({
                    url: '/api/login/check/',
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }).then(() => {
                    axios.defaults.headers.Authorization = `Bearer ${authToken}`;
                    context.commit('setLoginState', true);
                    context.dispatch('loadReservations');
                }, () => {
                    context.commit('setLoginState', false);
                })
            }
        },
        setAuthToken: (context, authToken) => {
            axios.defaults.headers.Authorization = `Bearer ${authToken}`;
            localStorage.authToken = authToken;
            context.commit('setLoginState', true);
        },
        loadTimeSlots: context => axios({
            url: '/api/timeslots/',
            method: 'get'
        }).then(res => {
            context.commit('setTimeslots', res.data);
        }),
        loadReservations: context => axios({
            url: '/api/reservations/',
            method: 'get'
        }).then(result => context.commit('setReservations', result.data),
            result => {
                if (result.status === 403) {
                    context.commit('setLoginState', false);
                }
            }),
        updateLoginState: context => axios({
            url: '/api/login/check',
            method: 'get'
        }).then(() => context.commit('setLoginState', true),
            () => context.commit('setLoginState', false))
    }
});