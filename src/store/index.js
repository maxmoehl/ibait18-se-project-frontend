/**
 * This file creates, configures and binds the shared store vuex.
 */

import Vuex from "vuex";
import Vue from "vue";
import axios from 'axios';

/**
 * Bind vuex to the vue instance
 */
Vue.use(Vuex);

/**
 * Configure our library for network requests to accept only json
 */
axios.defaults.headers.Accept = 'application/json';

/**
 * Define the store.
 */
export default new Vuex.Store({
    /**
     * These are the different variables that are made available by this store. These can be read directly or through
     * the getters.
     */
    state: {
        guests: [],
        timeSlots: [],
        reservations: [],
        countries: [],
        loggedIn: false,
        confirmations: []
    },
    /**
     * Here we define the setters to update the values inside the store.
     */
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
    /**
     * Here we define getters for common data selections that are made across our app.
     */
    getters: {
        /**
         * Gets a specific timeslot by id.
         */
        timeSlot: state => timeSlotId => {
            for (let i = 0; i < state.timeSlots.length; i++) {
                if (state.timeSlots[i]._id === timeSlotId) {
                    return state.timeSlots[i];
                }
            }
            return null;
        },
        /**
         * Gets all timeslots on a given date.
         */
        timeSlotsByDate: state => date => {
            return state.timeSlots.filter(d => {
                return new Date(d.startDate).getFullYear() === date.getFullYear() &&
                    new Date(d.startDate).getMonth() === date.getMonth() &&
                    new Date(d.startDate).getDate() === date.getDate();
            });
        },
        /**
         * This one is especially for our date-pickers: it decides whether or not a certain date should
         * be disabled based on whether or not there are timeslots available at that date.
         */
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
        /**
         * Returns all reservations for a certain timeslot.
         */
        reservations: state => timeSlotId => {
            return state.reservations.filter(res => res.timeSlot._id === timeSlotId);
        },
        /**
         * Returns a single reservation for the given bookingCode or null if no reservation is found.
         */
        reservation: state => bookingCode => {
            for (let i = 0; i < state.reservations.length; i++) {
                if (state.reservations[i].bookingCode === bookingCode) {
                    return state.reservations[i];
                }
            }
            return null;
        }
    },
    /**
     * These are actions that do more than just a update or filtering some data (mainly contacting the API).
     */
    actions: {
        /**
         * Used to initialise the store when the application is first launched. It determines the current login state
         * and loads all data available to the user.
         */
        init: context => {
            context.dispatch('loadTimeSlots').then();
            context.dispatch('loadCountryCodes').then();
            let authToken = localStorage.authToken;
            if (authToken !== '') {
                return axios({
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
        /**
         * This is used to set the authorization token. Since it does not get stored in this store but rather in a local
         * storage of the browser (NOT the cookies) and our requests library this is not a setter but an action.
         */
        setAuthToken: (context, authToken) => {
            axios.defaults.headers.Authorization = `Bearer ${authToken}`;
            localStorage.authToken = authToken;
            context.commit('setLoginState', true);
        },
        /**
         * Loads all country codes and stores them.
         */
        loadCountryCodes: context => axios({
            url: '/api/countries/',
            method: 'get'
        }).then(result => context.commit('setCountries', result.data)),
        /**
         * Loads all timeslots and stores them
         */
        loadTimeSlots: context => axios({
            url: '/api/timeslots/',
            method: 'get'
        }).then(res => context.commit('setTimeslots', res.data)),
        /**
         * Loads all reservations and stores them
         */
        loadReservations: context => axios({
            url: '/api/reservations/',
            method: 'get'
        }).then(result => context.commit('setReservations', result.data), result => {
            if (result.status === 403) context.dispatch('updateLoginState').then();
        }),
        /**
         * Calls the api to check whether or not the user is logged in. Stores the new state
         * and deletes leftovers. Additionally the Promise resolves to the new value of state.loggedIn.
         */
        updateLoginState: context => axios({
            url: '/api/login/check/',
            method: 'get'
        }).then(() => {
            context.commit('setLoginState', true);
            return true;
        }, () => {
            // if the user was logged in we delete all sensitive data
            if (context.state.loggedIn) {
                context.commit('setReservations', []);
            }
            context.commit('setLoginState', false);
            return false;
        }),
        /**
         * Deletes a single timeslot and reloads all timeslots and reservations.
         */
        deleteTimeSlot: (context, timeSlotId) => axios({
            url: `/api/timeslots/${timeSlotId}/`,
            method: 'delete'
        }).then(response => {
            context.dispatch('loadTimeSlots').then();
            context.dispatch('loadReservations').then();
            return response;
        }),
        /**
         * Takes the currently stored guests and sends a request to actually register them. Stores the resulting
         * confirmations for further access.
         */
        sendReservations: context => axios({
            url: '/api/reservations/',
            method: 'post',
            data: context.state.guests
        }).then(result => context.commit('setConfirmations', result.data)),
        /**
         * Updates a single timeslot.
         */
        updateTimeSlot: (context, timeSlot) => axios({
            url: `/api/timeslots/${timeSlot._id}/`,
            method: 'patch',
            data: timeSlot
        }).then(response => {
            context.dispatch('loadTimeSlots').then();
            context.dispatch('loadReservations').then();
            return response;
        }),
        /**
         * Logs the user in with the supplied credentials.
         */
        login: (context, loginData) => axios({
            url: `/api/login/?email=${loginData.email}&password=${loginData.password}`,
            method: 'get'
        }).then(res => {
            context.dispatch('setAuthToken', res.data.token).then();
            context.dispatch('loadReservations').then();
        }),
        /**
         * Book a single reservation and reload reservations to update data.
         */
        bookReservation: (context, bookingCode) => axios({
            url: `/api/reservations/book/${bookingCode}`,
            method: 'patch'
        }).then(() => {
            context.dispatch('loadReservations').then();
        })
    }
});