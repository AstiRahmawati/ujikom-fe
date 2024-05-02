import axios from "axios";

const kalender = {
    namespaced: true,
    state: {
        kalenderData: [],
    },
    getters: {
        getKalender: (state) => state.kalenderData,
    },
    actions: {
        async fetchKalender({ commit }) {
            try {
                const response = await axios.get("http://localhost:3000/api/kalender");
                commit("SET_KALENDER", response.data.data);
            } catch (error) {
                console.error(error);
                alert("Terjadi kesalahan saat mengambil data kalender.");
            }
        },
        async addKalender({ commit }, kalenderData) {
            try {
              const response = await axios.post("http://localhost:3000/api/kalender", kalenderData);
              commit("ADD_KALENDER", response.data.data);
              alert("Kalender berhasil ditambahkan.");
            } catch (error) {
              console.error(error);
              alert("Terjadi kesalahan saat menambahkan kalender.");
            }
          },
          async fetchKalenderById({ commit }, kalenderId) {
            try {
                const response = await axios.get('http://localhost:3000/api/kalender/${kalenderId}');
                return response.data; // Mengembalikan data kalender yang diambil
            } catch (error) {
                console.error(error);
                throw error; // Mengembalikan error untuk ditangani oleh komponen
            }
        },
        async updateKalender({ commit }, kalenderData) {
            try {
                await axios.put('http://localhost:3000/api/kalender/${kalenderData.id}', kalenderData);
                commit("EDIT_KALENDER", response.data);
                return true; // Mengembalikan nilai true untuk menandakan bahwa pengeditan berhasil
            } catch (error) {
                throw error; // Mengembalikan error untuk ditangani oleh komponen
            }
        },
        async deleteKalender({ commit }, kalenderId) {
            try {
                await axios.delete('http://localhost:3000/api/kalender/${kalenderId}');
                commit("DELETE_KALENDER", kalenderId);
                return true; // Mengembalikan nilai true untuk menandakan bahwa penghapusan berhasil
            } catch (error) {
                throw error; // Mengembalikan error untuk ditangani oleh komponen
            }
        },
    },
    mutations: {
        SET_KALENDER(state, kalender) {
            state.kalenderData = kalender;
        },
        ADD_KALENDER(state, kalender) {
            state.kalenderData.push(kalender);
        },
        EDIT_KALENDER(state, editedKalender) {
            const index = state.kalenderData.findIndex(kalender => kalender.id === editedKalender.id);
            if (index !== -1) {
                state.kalenderData.splice(index, 1, editedKalender);
            }
        },
        DELETE_KALENDER(state, kalenderId) {
            state.kalenderData = state.kalenderData.filter(kalender => kalender.id !== kalenderId);
        },
    },
};

export default kalender;