import axios from "axios";

const kategori = {
    namespaced: true,
    state: {
        kategoriData: [],
    },
    getters: {
        getKategori: (state) => state.kategoriData,
    },
    actions: {
        async fetchKategori({ commit }) {
            try {
                const response = await axios.get("http://localhost:3000/api/kategori");
                commit("SET_KATEGORI", response.data.data);
            } catch (error) {
                console.error(error);
                alert("Terjadi kesalahan saat mengambil data kategori.");
            }
        },
        async fetcKategoriById({ commit }, resepKategoriId) {
            try {
              const urlSingleKategori = `http://localhost:3000/api/resep/${resepKategoriId}`;
              const singleKategoriApi = await axios.get(urlSingleKategori);
              commit('SET_KATEGORI', singleKategoriApi.data);
            } catch (error) {
              alert(error);
              console.log(error);
            }
          },
        async addKategori({ commit }, kategoriData) {
            try {
              const response = await axios.post("http://localhost:3000/api/kategori", kategoriData);
              commit("ADD_KATEGORI", response.data.data);
              alert("Kategori berhasil ditambahkan.");
            } catch (error) {
              console.error(error);
              alert("Terjadi kesalahan saat menambahkan kategori.");
            }
          },
          async fetchKategoriById({ commit }, kategoriId) {
            try {
                const response = await axios.get(`http://localhost:3000/api/kategori/${kategoriId}`);
                return response.data; // Mengembalikan data kategori yang diambil
            } catch (error) {
                console.error(error);
                throw error; // Mengembalikan error untuk ditangani oleh komponen
            }
        },
        async updateKategori({ commit }, kategoriData) {
            try {
                await axios.put(`http://localhost:3000/api/kategori/${kategoriData.id}`, kategoriData);
                commit("EDIT_KATEGORI", response.data);
                return true; // Mengembalikan nilai true untuk menandakan bahwa pengeditan berhasil
            } catch (error) {
                throw error; // Mengembalikan error untuk ditangani oleh komponen
            }
        },
        async deleteKategori({ commit }, kategoriId) {
            try {
                await axios.delete(`http://localhost:3000/api/kategori/${kategoriId}`);
                commit("DELETE_KATEGORI", kategoriId);
                return true; // Mengembalikan nilai true untuk menandakan bahwa penghapusan berhasil
            } catch (error) {
                throw error; // Mengembalikan error untuk ditangani oleh komponen
            }
        },
    },
    mutations: {
        SET_KATEGORI(state, kategori) {
            state.kategoriData = kategori;
        },
        ADD_KATEGORI(state, kategori) {
            state.kategoriData.push(kategori);
        },
        EDIT_KATEGORI(state, editedkategori) {
            const index = state.kategoriData.findIndex(kategori => kategori.id === editedkategori.id);
            if (index !== -1) {
                state.kategoriData.splice(index, 1, editedkategori);
            }
        },
        DELETE_KATEGORI(state, kategoriId) {
            state.kategoriData = state.kategoriData.filter(kategori => kategori.id !== kategoriId);
        },
    },
};

export default kategori;