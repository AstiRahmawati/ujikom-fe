<template>
    <section class="bg-white dark:bg-gray-900">
    <div class="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form @submit.prevent="performRegister" action="post" class="w-full max-w-md">
            <div class="flex justify-center mx-auto">
                <img class="w-auto h-20 sm:h-21" src="../assets/images/Logo.jpeg" alt="">
            </div>
            
            <div class="flex items-center justify-center mt-8">
                <a href="/login" class="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
                    sign in
                </a>

                <a href="#" class="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-red-500 dark:border-red-400 dark:text-white">
                    sign up
                </a>
            </div>

            <div class="relative flex items-center mt-8">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>

                <input v-model="username" type="text" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username">
            </div>

            <div class="relative flex items-center mt-6">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </span>

                <input v-model="email" type="email" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address">
            </div>

            <div class="relative flex items-center mt-4">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input v-model="password" type="password" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password">
            </div>

            <div class="mt-6">
                <button class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-800 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50">
                    Sign Up
                </button>

                <div class="mt-6 text-center ">
                    <a href="/login" class="text-sm text-red-500 hover:underline dark:text-red-400">
                        Already have an account?
                    </a>
                </div>
            </div>
        </form>
    </div>
</section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(["loginError", "isAuthenticated"]),
  },
  methods: {
    ...mapActions(["register"]),

    async performRegister() {
      // Periksa apakah semua field telah diisi
      if (!this.username || !this.email || !this.password) {
        alert("All fields are required.");
        return;
      }

      // Periksa apakah email memiliki format yang valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        alert("Invalid email format.");
        return;
      }

      const credentials = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      const success = await this.register(credentials);

      if (success && this.isAuthenticated) {
        // Redirect to the desired route on successful login
        this.$router.push("/login");
      } else {
        alert("Register Failed");
      }
    },
  },
};
</script>
