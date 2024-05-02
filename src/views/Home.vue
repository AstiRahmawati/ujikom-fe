<template>
  <CobaNavbar1></CobaNavbar1>
  
    <section class="bg-white py-8 text-gray-700 sm:py-12 lg:py-16">
  <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-6">
        <h2 class="font-serif text-3xl font-bold">Selamat Datang di Recipe Rack</h2>
        <p class="mt-2 text-lg">Temukan berbagai macam resep kuliner lezat di sini !</p>
      </div>
  
    <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <article class="relative flex flex-col overflow-hidden rounded-lg border mb-8 mr-4 bg-white shadow-md"  v-for="ktg in kategori" :key="ktg.id">
        <div class="aspect-square overflow-hidden">
          <img class="h-full w-full object-cover transition-all duration-300 group-hover:scale-125" :src="ktg.img_url" alt="recipeRack" />
        </div>
      <div class="py-4 px-6">
        <h3 class="text-lg font-semibold mb-2">{{ ktg.judul }}</h3>
        <p class="text-sm text-gray-600"> {{ ktg.deskripsi }} </p>
        </div>
      <button class="mx-auto mb-4 flex h-10 w-10/12 items-center justify-center bg-red-600 text-sm text-white rounded-md hover:bg-red-700 focus:outline-none">
        <a :href="'/detailkategori/' + ktg.id" class="capitalize transition group-hover:bg-red-700">Jelajahi Menu</a>
      </button>
      </article>  
    </div>
  </div>
  </section>
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
    ...mapGetters('kategori', ["getKategori"]),
    kategori() {
      return this.getKategori;
    },
  },
  methods: {
    showReadMore(ktg) {
      this.$router.push(`/detail-kategori/${ktg.id}`); // Perbaikan: tutup kutipan di sini
    },
  },
  mounted() {
    this.$store.dispatch("kategori/fetchKategori");
  },
};
</script>

  