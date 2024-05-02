import axios from "axios";

const resep = {
    namespaced: true,
    state: {
        resepData: [],
    },
    getters: {
        getResep: (state) => state.resepData,
    },
    actions: {
        async fetchResep({ commit }) {
            try {
                const response = await axios.get("http://localhost:3000/api/resep");
                commit("SET_RESEP", response.data.data);
            } catch (error) {
                console.error(error);
                alert("Terjadi kesalahan saat mengambil data resep.");
            }
        },
        async addResep({ commit }, resepData) {
            try {
              const response = await axios.post("http://localhost:3000/api/resep", resepData);
              commit("ADD_RESEP", response.data.data);
              alert("Resep berhasil ditambahkan.");
            } catch (error) {
              console.error(error);
              alert("Terjadi kesalahan saat menambahkan resep.");
            }
          },
          async fetchResepById({ commit }, resepId) {
            try {
                const response = await axios.get(`http://localhost:3000/api/resep/${resepId}`);
                return response.data; // Mengembalikan data resep yang diambil
            } catch (error) {
                console.error(error);
                throw error; // Mengembalikan error untuk ditangani oleh komponen
            }
        },
        async updateResep({ commit }, resepData) {
            try {
                await axios.put(`http://localhost:3000/api/resep/${resepData.id}`, resepData);
                commit("EDIT_RESEP", response.data);
                return true; // Mengembalikan nilai true untuk menandakan bahwa pengeditan berhasil
            } catch (error) {
                throw error; // Mengembalikan error untuk ditangani oleh komponen
            }
        },
        async deleteResep({ commit }, resepId) {
            try {
                await axios.delete(`http://localhost:3000/api/resep/${resepId}`);
                commit("DELETE_RESEP", resepId);
                return true; // Mengembalikan nilai true untuk menandakan bahwa penghapusan berhasil
            } catch (error) {
                throw error; // Mengembalikan error untuk ditangani oleh komponen
            }
        },
    },
    mutations: {
        SET_RESEP(state, resep) {
            state.resepData = resep;
        },
        ADD_RESEP(state, resep) {
            state.resepData.push(resep);
        },
        EDIT_RESEP(state, editedresep) {
            const index = state.resepData.findIndex(resep => resep.id === editedresep.id);
            if (index !== -1) {
                state.resepData.splice(index, 1, editedresep);
            }
        },
        DELETE_RESEP(state, resepId) {
            state.resepData = state.resepData.filter(resep => resep.id !== resepId);
        },
    },
};

export default resep;