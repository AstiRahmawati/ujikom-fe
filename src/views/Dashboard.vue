<template>
  <div class="mx-4 max-w-screen-xl sm:mx-8 xl:mx-auto">
    <h1 class="border-b py-6 text-4xl font-semibold">recipeRack</h1>
    <div class="grid grid-cols-8 pt-3 pb-10 sm:grid-cols-10">
      <div class="relative my-4 w-56 sm:hidden">
        <input class="peer hidden" type="checkbox" name="select-1" id="select-1" />
        <label for="select-1"
          class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Teams
        </label>
        <svg xmlns="http://www.w3.org/2000/svg"
          class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <ul
          class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Teams</li>
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Accounts</li>
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Others</li>
        </ul>
      </div>

      <div class="col-span-2 hidden sm:block">
        <ul>
          <li
            class="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">
            Dashboard</li>
          <li
            class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
            Users</li>
            <li
            class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
            Resep</li>
          <li
            class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
            Profile</li>
          <li
          
            class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
            Kalender</li>
          <li
            class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
            Notifications</li>
        </ul>
      </div>

      <div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
        <div class="pt-4">
          <h1 class="py-2 text-2xl font-semibold">Resep</h1>
        </div>
        <hr class="mt-4 mb-8" />
        <p class="py-2 text-xl font-semibold">Recipes</p>
        <div class="flex items-center space-x-4">
          <div>
            <input v-model="searchQuery" type="text" placeholder="Search recipe"
              class="border border-gray-300 px-2 py-1 rounded-md">
          </div>
          <button @click="searchRecipes" class="rounded-lg bg-yellow-500 px-4 py-1 text-white">Search</button>
          <button @click="addRecipe" class="rounded-lg bg-green-500 px-4 py-1 text-white">+</button>
        </div>
        <div class="space-y-1 mt-4">
          <div v-for="(recipe, index) in recipes" :key="index" class="rounded-md border bg-white">
            <div class="flex w-full items-center px-6 py-2">
              <span>{{ recipe.name }}</span>
              <button @click="editRecipe(index)"
                class="ml-auto rounded-lg bg-blue-600 px-4 py-1 text-white w-15">Show</button>
              <button @click="deleteRecipe(index)"
                class="ml-2 rounded-lg bg-green-600 px-4 py-1 text-white w-15">Edit</button>
              <button @click="deleteRecipe(index)"
                class="ml-2 rounded-lg bg-red-600 px-4 py-1 text-white w-15">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      recipes: [
        { name: 'Spaghetti Bolognese' },
        { name: 'Chicken Alfredo' },
        { name: 'Vegetable Stir-Fry' }
      ],
      newRecipeName: '',
      searchQuery: ''
    };
  },
  computed: {
    computed: {
      ...mapGetters({
        resepGetter: 'getResep'
      })
    },
    ...mapGetters(["isAuthenticated", "getToken", "user"]),
    resep() {
      return this.getResep
    }
  },
  mounted() {
    this.$store.dispatch("fetchResep")
  },
  methods: {
    addRecipe() {
      if (this.newRecipeName.trim() !== '') {
        this.recipes.push({ name: this.newRecipeName });
        this.newRecipeName = '';
      }
    },
    editRecipe(index) {
      console.log('Edit recipe at index:', index);
    },
    deleteRecipe(index) {
      this.recipes.splice(index, 1);
    },
    searchRecipes() {
      console.log('Search query:', this.searchQuery);
      // Implement search functionality here
    }
  }
};
</script>