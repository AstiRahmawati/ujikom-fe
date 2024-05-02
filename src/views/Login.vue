<template>
    <div class="flex items-center justify-center h-screen">
      <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div class="hidden lg:block lg:w-1/2 relative">
          <!-- Replace background image with img tag -->
          <img class="absolute inset-0 w-full h-full object-cover" src="../assets/images/bg-login2.jpeg" alt="Background Image">
        </div>
        <div class="w-full px-6 py-14 md:px-8 lg:w-1/2 flex flex-col justify-center">
          <div class="flex justify-center">
            <img class="w-auto h-20 sm:h-24" src="../assets/images/Logo.jpeg" alt="">
          </div>
          <p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>
          <div class="mt-4">
            <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="LoggingEmailAddress">Email Address</label>
            <input v-model="email" id="LoggingEmailAddress" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 focus:ring-opacity-40 dark:focus:border-red-300 focus:outline-none focus:ring focus:ring-red-300" type="email" />
          </div>
          <div class="mt-4">
            <div class="flex justify-between">
              <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="loggingPassword">Password</label>
              <a href="#" class="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</a>
            </div>
            <input v-model="password" id="loggingPassword" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 focus:ring-opacity-40 dark:focus:border-red-300 focus:outline-none focus:ring focus:ring-red-300" type="password" />
          </div>
          <div class="mt-6">
            <button @click="performLogin" class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-800 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50">
              Sign In
            </button>
          </div>
          <div class="flex items-center justify-between mt-4">
            <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            <a href="/register" class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</a>
            <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    computed: {
      ...mapGetters(["loginError", "isAuthenticated"]),
    },
    methods: {
      ...mapActions(["login"]),
  
      async performLogin() {
        const credentials = {
          email: this.email,
          password: this.password,
        };
  
        const success = await this.login(credentials);
  
        if (success && this.isAuthenticated) {
          // Redirect to the desired route on successful login
          this.$router.push("/kalender"); // Make sure this route exists
        } else {
          alert("Login Failed");
        }
      },
    },
  };
  </script>
  