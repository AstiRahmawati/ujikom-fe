import { createStore } from "vuex";
import auth from "./modules/auth";
import kategori from "./modules/kategori";
import resep from "./modules/resep";
import kalender from "./modules/kalender";

const store = createStore({
    state: {
        resep: [],
        isLoading: false,
    },
    getters: {
        getResep: state => state.resep, // Definisikan getter resep di sini
    },
    modules: {
        auth,
        kategori,
        resep,
        kalender
    },
    actions: {
        async fetchResep({ commit }) {
            try {
              const response = await fetch('/api/resep'); // Ganti dengan endpoint API yang sesuai
              const data = await response.json();
              commit('setResep', data); // Memperbarui state resep dengan data dari API
            } catch (error) {
              console.error('Error fetching resep:', error);
            }
        }
    },
});

export default store;
