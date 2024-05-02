import axios from "axios";

const state = {
  isAuthenticated: false,
  loginError: null,
  token: null,
  token: localStorage.getItem("token") || null,
  user: {},
};

const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
  getToken: (state) => state.token,
  loginError: (state) => state.loginError,
  isLoggedIn: (state) => !!state.token,
  user: (state) => state.user,
};

const actions = {
  async login({ commit, state }, credentials) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        credentials
      );

      const token = response.data.data.token;
      const user = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      commit("setAuthenticated", true);
      commit("setToken", token);
      commit("setUser", user);
      commit("setLoginError", null);

      console.log(state.isAuthenticated);

      return true;
    } catch (error) {
      commit("setAuthenticated", false);
      commit("setLoginError", error.response.data.message);
      return false;
    }
  },
  async logout({ commit, getters }) {
    try {
      // Periksa apakah token tersedia
      const token = getters.getToken;
      if (!token) {
        throw new Error("Token not found");
      }
  
      // Kirim permintaan logout ke server
      await axios.delete("http://localhost:3000/api/users/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Hapus token dan data pengguna dari penyimpanan lokal
      localStorage.removeItem("token");
      localStorage.removeItem("user");
  
      // Set status autentikasi ke false dan hapus token dari state Vuex
      commit("setAuthenticated", false);
      commit("setToken", token);
      commit("setUser", {});
  
      // Redirect ke halaman login
      this.$router.push('/login'); // Pastikan ini sesuai dengan konfigurasi router Vue Anda
      return true;
    } catch (error) {
      // Tangani kesalahan
      console.error("Error during logout:", error);
      if (error.response && error.response.status === 401) {
        // Jika status kode adalah 401, beri tahu pengguna bahwa logout gagal karena tidak diotorisasi
        commit("setLoginError", "Logout failed: You are not authorized to perform this action.");
      } else {
        // Jika kesalahan lainnya, beri tahu pengguna bahwa terjadi kesalahan saat logout
        commit("setLoginError", "Logout failed: An error occurred while logging out.");
      }
      return false;
    }
  },
    
  async register({ commit }, credentials) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users",
        credentials
      );
      commit("setAuthenticated", true);
      commit("setLoginError", null);
      return true;
    } catch (error) {
      commit("setAuthenticated", false);
      commit("setLoginError", error.response.data.message);
      return false;
    }
  },
  async getUser({ commit }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.get(
        "http://localhost:3000/api/users/current",
        config
      );

      const user = response.data.data;

      localStorage.setItem("user", JSON.stringify(user));

      commit("setUser", user);
    } catch (error) {
      console.error(error);
    }
  },
};

const mutations = {
  setAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  setToken(state, token) {
    state.token = token;
  },
  setLoginError(state, error) {
    state.loginError = error;
  },
  setUser(state, user) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};