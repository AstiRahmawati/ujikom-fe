<template>
  <CobaNavbar1></CobaNavbar1>
  <div class="grid grid-cols-1 gap-4 mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
    <!-- UI Kalender -->
    <div class="h-screen flex flex-col">
      <!-- Teks "Recipe Scheduler" -->
      <center>
        <h1 class="text-4xl text-gray-800 font-bold mb-4 mt-8">Recipe Scheduler</h1>
      </center>
      <div class="bg-white rounded-xl shadow-lg px-8 py-6 mb-4 relative">
        <!-- Konten Kalender -->
        <div class="flex items-center justify-between px-6 py-3 bg-gray-700">
          <button @click="prevMonth" class="text-white">Previous</button>
          <h2 class="text-white">{{ currentMonth }}</h2>
          <button @click="nextMonth" class="text-white">Next</button>
        </div>
        <div class="grid grid-cols-7 gap-2 p-4" id="calendar">
          <div v-for="day in calendarDays" :key="day.date" class="text-center py-2 border cursor-pointer"
            :class="{ 'bg-blue-500 text-white': day.isToday }" @click="onDateClicked(day)">
            {{ day.date }}
            <ul v-if="day.recipes.length > 0" class="mt-2">
              <li v-for="recipe in day.recipes" :key="recipe.id">{{ recipe.name }}</li>
            </ul>
          </div>
        </div>
        <button @click="toggleForm"
          class="bg-red-500 text-white rounded-full px-5 py-3 absolute bottom-0 right-0 mb-12 mr-12 text-lg">+</button>
        <!-- Pop-up Form -->
        <div v-if="showForm"
          class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div class="sm:w-[38rem] mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
            <!-- Isi Form -->
            <div class="bg-red-800 px-10 py-10 text-center text-white">
              <p class="font-serif text-2xl font-semibold tracking-wider">Recipe Scheduler</p>
              <p class="text-center text-red-100">Silakan isi dengan lengkap dan jelas</p>
            </div>
            <div class="space-y-4 px-8 py-10">
              <label class="block" for="tanggal">
                <p class="text-gray-600">Tanggal</p>
                <input type="date" id="tanggal" v-model="formData.tanggal"
                  class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-red-600 focus:ring-1">
              </label>
              <label class="block" for="catatan">
                <p class="text-gray-600">Catatan</p>
                <input type="text" id="catatan" v-model="formData.catatan"
                  class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-red-600 focus:ring-1">
              </label>
              <label class="block" for="resep">
                <p class="text-gray-600">Resep</p>
                <select id="resep" v-model="selectedRecipe"
                  class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-red-600 focus:ring-1">
                  <option value="" disabled selected>Pilih Resep</option>
                  <option v-for="resep in getResep" :key="resep.id" :value="resep.name">{{ resep.judul }}</option>
                </select>
              </label>
              <button @click="hideForm" class="mt-4 rounded-full bg-red-800 px-10 py-2 font-semibold text-white"
                type="submit">Simpan</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Konten yang ingin ditengah -->
    <div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8 w-full h-full">
      <div class="flex items-center justify-between pb-6">
        <div class="flex items-center justify-between">
          <div class="ml-10 space-x-8 lg:ml-40">
          </div>
        </div>
      </div>
      <div class="overflow-y-hidden rounded-lg border">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th class="px-5 py-3">NO</th>
                <th class="px-5 py-3">Tanggal</th>
                <th class="px-5 py-3">Resep</th>
                <th class="px-5 py-3">Catatan</th>
              </tr>
            </thead>
            <tbody class="text-gray-500">
              <tr v-for="klndr, index in kalender" :key="klndr.id">
                <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p class="whitespace-no-wrap">{{ index + 1 }}</p>
                </td>
                <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p class="whitespace-no-wrap">{{ klndr.tanggal }}</p>
                </td>
                <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p class="whitespace-no-wrap">{{ klndr.judul }}</p>
                </td>
                <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p class="whitespace-no-wrap">{{ klndr.catatan }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-center">
          <div class="mt-2 inline-flex sm:mt-0">
            <button
              class="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Prev</button>
            <button
              class="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CobaNavbar1 from "../components/CobaNavbar1.vue";

export default {
  components: {
    CobaNavbar1
  },
  computed: {
    ...mapGetters('kalender', ['getKalender']),
    ...mapGetters('resep', ['getResep']),

    kalender() {
      return this.getKalender
    },
    currentMonth() {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return monthNames[this.currentMonthIndex] + ' ' + this.currentYear;
    },
    calendarDays() {
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonthIndex, 1).getDay();
      const daysInMonth = new Date(this.currentYear, this.currentMonthIndex + 1, 0).getDate();
      const calendarDays = [];
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(this.currentYear, this.currentMonthIndex, i);
        calendarDays.push({ date: i, isToday: this.isToday(i), recipes: this.getRecipesForDate(date) });
      }
      for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.unshift({ date: '', isToday: false, recipes: [] });
      }
      return calendarDays;
    }
  },
  methods: {
    ...mapActions('kalender', ['fetchKalender']),
    ...mapActions('resep', ['fetchResep', 'addResep']),
    isToday(date) {
      const today = new Date();
      return date === today.getDate() && this.currentMonthIndex === today.getMonth() && this.currentYear === today.getFullYear();
    },
    prevMonth() {
      if (this.currentMonthIndex === 0) {
        this.currentYear--;
        this.currentMonthIndex = 11;
      } else {
        this.currentMonthIndex--;
      }
    },
    nextMonth() {
      if (this.currentMonthIndex === 11) {
        this.currentYear++;
        this.currentMonthIndex = 0;
      } else {
        this.currentMonthIndex++;
      }
    },
    onDateClicked(day) {
      this.selectedDate = day.date;
      // Lakukan apa pun yang Anda inginkan saat tanggal diklik
    },
    toggleForm() {
      this.showForm = !this.showForm; // Balik nilai showForm
    },
    // Perbarui metode untuk menyimpan data resep yang diinput dan menutup form
    async hideForm() {
      // Memastikan semua data yang dibutuhkan telah diisi
      if (this.formData.tanggal && this.formData.catatan && this.selectedRecipe) {
        // Menyiapkan objek data resep untuk disimpan
        const resepData = {
          tanggal: this.formData.tanggal,
          catatan: this.formData.catatan,
          namaResep: this.selectedRecipe
        };
        // Memanggil aksi addResep untuk menyimpan data resep
        await this.addKalender(resepData);
        // Mengosongkan form setelah disimpan
        this.formData.tanggal = '';
        this.formData.catatan = '';
        this.selectedRecipe = '';
        // Menutup form setelah disimpan
        this.showForm = false;
        // Panggil kembali metode fetchResep untuk memperbarui data resep
        this.updateCalender();
      } else {
        // Menampilkan pesan kesalahan jika ada data yang belum diisi
        alert('Mohon lengkapi semua data sebelum menyimpan resep.');
      }
    },
    updateCalender() {
      const resep = this.getResep;
      // Lakukan iterasi melalui setiap item resep
      resep.forEach(item => {
        // Ambil tanggal resep
        const tanggalResep = new Date(item.tanggal);
        // Ambil tanggal, bulan, dan tahun dari tanggal resep
        const tanggal = tanggalResep.getDate();
        const bulan = tanggalResep.getMonth();
        const tahun = tanggalResep.getFullYear();
        // Cari objek hari di dalam calendarDays yang sesuai dengan tanggal resep
        const dayToUpdate = this.calendarDays.find(day => day.date === tanggal);
        // Jika objek hari ditemukan
        if (dayToUpdate) {
          // Tambahkan resep ke dalam array recipes di objek hari tersebut
          dayToUpdate.recipes.push({ name: item.namaResep });
        }
      });
    },
    getRecipesForDate(date) {
      const kalender = this.getKalender; // Menggunakan data kalender dari store
      if (kalender) {
        return kalender.filter(item => {
          const scheduledDate = new Date(item.tanggal);
          return scheduledDate.getDate() === date.getDate() &&
            scheduledDate.getMonth() === date.getMonth() &&
            scheduledDate.getFullYear() === date.getFullYear();
        }).map(item => ({
          name: item.namaResep,
          id: item.id // Sesuaikan dengan properti id yang sesuai
        }));
      } else {
        return [];
      }
    },
    hideForm() {
      this.showForm = false;
    }
  },
  data() {
    return {
      today: new Date(),
      currentMonthIndex: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      selectedDate: '',
      showForm: false,
      formData: { // tambahkan data untuk menyimpan input form
        tanggal: '',
        catatan: '',
        resep: ''
      }
    };
  },
  mounted() {
    this.$store.dispatch('kalender/fetchKalender')
    this.fetchResep().then(() => {
      this.updateCalender();
    });
  }
};
</script>

<style scoped>
.bg-white.rounded-xl.shadow-lg.px-8.py-6.mb-4 {
  height: 500px;
  /* Atur ketinggian sesuai kebutuhan */
}
</style>