<template>
  <CobaNavbar1></CobaNavbar1>
    <section class="py-20">
  <h1 class="mb-12 text-center font-sans text-5xl font-bold text-gray-900">Temukan Resep Kuliner Kesukaanmu</h1>
  <div class="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
    <article class="rounded-md bg-white p-3 shadow-lg hover:shadow-xl" v-for="rsp in kategoriData.data" :key="rsp.id">
      <a @click="showReadMore(rsp.id)" >
        <div class="relative flex items-end overflow-hidden rounded-xl">
          <img :src="rsp.img_url" alt="recipeRack" class="w-full h-64 object-cover" />
        </div>

        <div class="mt-1 p-2 flex items-center justify-between">
          <h2 class="text-slate-700">{{ rsp.judul }}</h2>
        </div>
     </a>
    </article>
  </div>
</section>
<Footer></Footer>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CobaNavbar1 from "../components/CobaNavbar1.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    CobaNavbar1,
    Footer
  },
  computed: {
    ...mapState('kategori',['kategoriData']),
    ...mapGetters('resep', ["getResep"]),
    resep() {
      return this.getResep;
    },
  },
  props: ['resepKategoriId'],
  methods: {
    showReadMore(id) {
      this.$router.push(`/detailmenu/${id}`); // Perbaikan: tutup kutipan di sini
    },
  },
  mounted() {
    this.$store.dispatch("resep/fetchResep");

    this.$store
      .dispatch('kategori/fetcKategoriById', this.resepKategoriId)
  },
};
</script>

