<template>
  <CobaNavbar1></CobaNavbar1>
  <div class="m-10 max-w-md mx-auto">
    <div class="rounded-lg border bg-white px-6 py-8 shadow-lg">
      <div class="flex items-center justify-center mb-4">
        <div class="relative w-20 h-20 rounded-full overflow-hidden">
          <span class="absolute right-0 bottom-0 m-2 h-4 w-4 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
          <img class="h-full w-full object-cover" src="https://i.pinimg.com/236x/56/2e/be/562ebed9cd49b9a09baa35eddfe86b00.jpg" alt="Profil Image" />
        </div>
      </div>
      <h1 class="text-center text-xl font-bold text-gray-900 mb-1">{{ user.username }}</h1>
      <h3 class="text-center text-lg font-semibold text-gray-600 mb-3">Chef at RecipeRack</h3>
      <p class="text-center text-sm leading-6 text-gray-700 mb-4">Selamat datang di RecipeRack, tempat terbaik untuk menemukan berbagai resep lezat. Temukan petunjuk langkah demi langkah untuk memasak hidangan yang disukai keluarga dan teman Anda</p>
      <ul class="divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm mb-4">
        <li class="flex items-center py-2 text-sm">
          <span>Nama Pengguna</span>
          <span class="ml-auto">{{ user.username }}</span>
        </li>
        <li class="flex items-center py-2 text-sm">
          <span>Alamat Email</span>
          <span class="ml-auto">{{ user.email }}</span>
        </li>
      </ul>
      <div class="flex justify-center">
        <button v-if="user" @click="handleLogout" class="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full">
          Logout
        </button>
        <router-link v-else to="/login" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full">
          Login
        </router-link>
      </div>
    </div>
    <!-- Pop-up logout berhasil -->
    <div v-if="logoutSuccess" class="popup">
      <div class="popup-content">
        <p>Logout berhasil!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CobaNavbar1 from "../components/CobaNavbar1.vue";
export default {
  components: {
    CobaNavbar1
  },
  data() {
    return {
      logoutSuccess: false
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["getUser", "logout"]),
    async handleLogout() {
      await this.logout();
      this.logoutSuccess = true; // Set logoutSuccess menjadi true untuk menampilkan pop-up
      setTimeout(() => {
        this.logoutSuccess = false; // Setelah beberapa waktu, sembunyikan pop-up
        this.$router.push('/'); // Redirect ke halaman login setelah logout berhasil
      }, 3000); // Misalnya, sembunyikan pop-up setelah 3 detik
    }
  },
  created() {
    this.getUser(); // Memanggil aksi fetchMe untuk mendapatkan data pengguna
  },
};
</script>

<style>
/* CSS untuk pop-up */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 5px;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5); /* Tambahkan efek bayangan */
}
</style>
