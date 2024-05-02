<template>
  <CobaNavbar1></CobaNavbar1>
  <div class="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-md m-10" v-if="selectedResep">
    <!-- Kontainer Gambar Resep Makanan -->
    <div class="relative">
      <img class="h-72 w-full object-cover" :src=selectedResep.img_url alt="recipeRack" />
    </div>

    <!-- Detail Resep Makanan -->
    <div class="p-6">
      <!-- Judul Resep -->
      <h1 class="text-2xl font-semibold text-gray-800 mb-4">{{ selectedResep.judul }}</h1>
      <!-- Alat dan Bahan -->
      <div class="mb-4">
        <h2 class="text-lg font-semibold text-gray-700 mb-2">Bahan-bahan:</h2>
        <ul class="list-disc pl-4">
          <template v-if="selectedResep.alat_bahan">
            <li v-for="item in selectedResep.alat_bahan.split('\n')" :key="item"><span>{{ item }} </span></li>
          </template>
        </ul>

      </div>
      <!-- Langkah-langkah -->
      <div>
        <h2 class="text-lg font-semibold text-gray-700 mb-2">Langkah-langkah:</h2>
        <template v-if="selectedResep.langkah">
          <ol class="list-decimal pl-4">
            <li v-for="(item, index) in selectedResep.langkah.split('\n')" :key="index" v-html="parseLink(item)"></li>
          </ol>
        </template>

      </div>


      <!-- Button Tambah dengan ikon kalender -->
      <!-- <router-link to="/kalender">
        <button class="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-5 py-3 mb-4 text-lg"
          style="float: right;">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4 2a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm12 1H4a1 1 0 00-1 1v1h14V4a1 1 0 00-1-1zm-1 3H5v10h10V6zm-5 3a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </router-link> -->

    </div>
  </div>
  <div v-else>
    <h1>Memuat</h1>
  </div>
  <Footer></Footer>
</template>

<script>
import { mapGetters } from "vuex";
import CobaNavbar1 from "../components/CobaNavbar1.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    CobaNavbar1,
    Footer
  },
  computed: {
    ...mapGetters('resep', ["getResep"]),
    ...mapGetters('auth', ['isLoggedIn']),
    resep() {
      return this.getResep;
    },
    selectedResep() {
      return this.getResepById(this.$route.params.resepId)
    }
  },
  methods: {
    // goToCalendar(){
    //   // Periksa apakah pengguna sudah login
    //   if (!this.isLoggedIn) {
    //     // Jika belum, arahkan ke halaman login
    //     this.$router.push('/login');
    //   } else {
    //     // Jika sudah, arahkan ke halaman kalender
    //     this.$router.push('/kalender');
    //   }
    // },
    showReadMore(rsp) {
      this.$router.push(`/detail-resep/${rsp.id}`);
    },
    parseLink(text) {
      // Regular expression to match URLs
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, (url) => {
        return `<a href="${url}" target="_blank" class="text-blue-500">${url}</a>`;
      });
    },
    getResepById(id) {
      return this.resep.find((rsp) => rsp.id === id)
    }
  },
  mounted() {
    this.$store.dispatch("resep/fetchResep");
  },
};
</script>
