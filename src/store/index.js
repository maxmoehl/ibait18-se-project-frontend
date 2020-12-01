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
        countries: [],
        loggedIn: false,
        confirmations: []
    },
    mutations: {
        setCountries: (state, timeSlots) => state.countries = timeSlots,
        setTimeslots: (state, timeSlots) => state.timeSlots = timeSlots,
        setReservations: (state, reservations) => state.reservations = reservations,
        addGuest: (state, guest) => state.guests.push(guest),
        deleteGuest: (state, index) => state.guests.splice(index, 1),
        clearGuests: state => state.guests = [],
        setConfirmations: (state, confirmations) => state.confirmations = confirmations,
        setLoginState: (state, loginState) => {
            state.loggedIn = loginState;
            if (!loginState) {
                delete localStorage.authToken;
            }
        }
    },
    getters: {
        timeSlot: state => timeSlotId => {
            for (let i = 0; i < state.timeSlots.length; i++) {
                if (state.timeSlots[i]._id === timeSlotId) {
                    return state.timeSlots[i];
                }
            }
            return null;
        },
        timeSlotsByDate: state => date => {
            return state.timeSlots.filter(d => {
                return new Date(d.startDate).getFullYear() === date.getFullYear() &&
                    new Date(d.startDate).getMonth() === date.getMonth() &&
                    new Date(d.startDate).getDate() === date.getDate();
            });
        },
        disabledDates: state => date => {
            for (let i = 0; i < state.timeSlots.length; i++) {
                let timeSlotDate = new Date(state.timeSlots[i].startDate);
                if (date.getFullYear() === timeSlotDate.getFullYear() &&
                    date.getMonth() === timeSlotDate.getMonth() &&
                    date.getDate() === timeSlotDate.getDate()) {
                    return false;
                }
            }
            return true;
        },
        nextTimeSlot: state => {
            for (let i = 0; i < state.timeSlots.length; i++) {
                if (state.timeSlots[i].startDate > Date.now()) {
                    return state.timeSlot[i];
                }
            }
            return null;
        },
        reservations: state => timeSlotId => {
            return state.reservations.filter(res => res.timeSlot._id === timeSlotId);
        }
    },
    actions: {
        init: context => {
            context.dispatch('loadTimeSlots').then();
            context.dispatch('loadCountryCodes').then();
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
                    context.dispatch('loadReservations').then();
                }, () => {
                    context.commit('setLoginState', false);
                });
            }
        },
        setAuthToken: (context, authToken) => {
            axios.defaults.headers.Authorization = `Bearer ${authToken}`;
            localStorage.authToken = authToken;
            context.commit('setLoginState', true);
        },
        loadCountryCodes: context => axios({
            url: '/api/countries/',
            method: 'get'
        }).then(result => context.commit('setCountries', result.data)),
        loadTimeSlots: context => axios({
            url: '/api/timeslots/',
            method: 'get'
        }).then(res => context.commit('setTimeslots', res.data)),
        loadReservations: context => axios({
            url: '/api/reservations/',
            method: 'get'
        }).then(result => context.commit('setReservations', result.data), result => {
            if (result.status === 403) context.dispatch('updateLoginState').then();
        }),
        updateLoginState: context => axios({
            url: '/api/login/check/',
            method: 'get'
        }).then(() => context.commit('setLoginState', true), () => {
            // if the user was logged in we delete all sensitive data
            if (context.state.loggedIn) {
                context.state.reservations = [];
            }
            context.commit('setLoginState', false)
        }),
        deleteTimeSlot: (context, timeSlotId) => axios({
            url: `/api/timeslots/${timeSlotId}/`,
            method: 'delete'
        }).then(response => {
            context.dispatch('loadTimeSlots').then();
            context.dispatch('loadReservations').then();
            return response;
        }),
        sendReservations: context => axios({
            url: '/api/reservations/',
            method: 'post',
            data: context.state.guests
        }).then(result => context.commit('setConfirmations', result.data),
            reason => console.warn(reason)),
        updateTimeSlot(context, timeSlot) {
            return axios({
                url: `/api/timeslots/${timeSlot._id}/`,
                method: 'patch',
                data: timeSlot
            }).then(response => {
                context.dispatch('loadTimeSlots').then();
                context.dispatch('loadReservations').then();
                return response;
            })
        }
    }
});