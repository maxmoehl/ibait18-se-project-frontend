import Vuex from "vuex";
import Vue from "vue";
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.headers.Accept = 'application/json';

export default new Vuex.Store({
    state: {
        guests: [],
        timeSlots: []
    },
    mutations: {
        setTimeslots: (state, timeSlots) => {
            state.timeSlots = timeSlots;
        },
        addGuest: (state, guest) => {
            state.guests.push(guest);
        },
        deleteGuest: (state, index) => {
            state.guests.splice(index, 1);
        }
    },
    getters: {
        getTimeSlot: state => timeSlotId => {
            for (let i = 0; i < state.timeSlots.length; i++) {
                if (state.timeSlots[i].timeSlotId === timeSlotId) {
                    return state.timeSlots[i];
                }
            }
            return undefined;
        },
        getTimeSlotsByDate: state => date => {
            return state.timeSlots.filter(d => {
                return new Date(d.startDate).getFullYear() === date.getFullYear() &&
                    new Date(d.startDate).getMonth() === date.getMonth() &&
                    new Date(d.startDate).getDate() === date.getDate();
            });
        },
        timeSlotsAvailable: state => {
            return state.timeSlots !== undefined;
        }
    },
    actions: {
        loadTimeSlots: context => {
            axios({
                url: '/api/timeslots/',
                method: 'get'
            }).then(res => {
                context.commit('setTimeslots', res.data);
            });
        }
    }
});