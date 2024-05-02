<template>
    <div class="grid grid-cols-2 gap-4 mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <!-- UI Kalender -->
      <div class="col-span-1">
        <div class="bg-white rounded-xl shadow-lg px-8 py-6 mb-4">
          <div class="flex items-center justify-between px-6 py-3 bg-gray-700">
            <button @click="prevMonth" class="text-white">Previous</button>
            <h2 class="text-white">{{ currentMonth }}</h2>
            <button @click="nextMonth" class="text-white">Next</button>
          </div>
          <div class="grid grid-cols-7 gap-2 p-4" id="calendar">
            <div v-for="day in calendarDays" :key="day.date" class="text-center py-2 border cursor-pointer" :class="{ 'bg-blue-500 text-white': day.isToday }" @click="showModal(day.date)">
              {{ day.date }}
            </div>
          </div>
          <div id="myModal" class="modal hidden fixed inset-0 flex items-center justify-center z-50">
            <div class="modal-overlay absolute inset-0 bg-black opacity-50"></div>
            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div class="modal-content py-4 text-left px-6">
                <div class="flex justify-between items-center pb-3">
                  <p class="text-2xl font-bold">Selected Date</p>
                  <button @click="hideModal" class="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring">✕</button>
                </div>
                <div id="modalDate" class="text-xl font-semibold">{{ selectedDate }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- UI Pengingat -->
      <div class="col-span-1">
        <div class="bg-gray-100 rounded-xl shadow-lg px-8 py-6 mb-4">
          <div class="grid border-b py-6 sm:grid-cols-2">
            <div>
              <h2 class="text-lg font-semibold leading-4 text-slate-700">Comments</h2>
              <p class="font- text-slate-600">Lorem ipsum dolor, Alias eligendi laboriosam magni reiciendis neque.</p>
            </div>
            <div class="mt-4 flex items-center sm:justify-end">
              <div class="flex flex-col gap-3">
                <label for="push1" class="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" value="" id="push1" class="peer sr-only" checked />
                  <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Push</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-100 rounded-xl shadow-lg px-8 py-6 mb-4">
          <div class="grid border-b py-6 sm:grid-cols-2">
            <div>
              <h2 class="text-lg font-semibold leading-4 text-slate-700">Comments</h2>
              <p class="font- text-slate-600">Lorem ipsum dolor, Alias eligendi laboriosam magni reiciendis neque.</p>
            </div>
            <div class="mt-4 flex items-center sm:justify-end">
              <div class="flex flex-col gap-3">
                <label for="push2" class="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" value="" id="push2" class="peer sr-only" checked />
                  <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Push</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-100 rounded-xl shadow-lg px-8 py-6 mb-4">
          <div class="grid border-b py-6 sm:grid-cols-2">
            <div>
              <h2 class="text-lg font-semibold leading-4 text-slate-700">Comments</h2>
              <p class="font- text-slate-600">Lorem ipsum dolor, Alias eligendi laboriosam magni reiciendis neque.</p>
            </div>
            <div class="mt-4 flex items-center sm:justify-end">
              <div class="flex flex-col gap-3">
                <label for="push3" class="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" value="" id="push3" class="peer sr-only" checked />
                  <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Push</span>
                </label>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Tambahkan pengingat lainnya di sini sesuai kebutuhan -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        today: new Date(),
        currentMonthIndex: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        events: [
          { id: 1, time: '9:00 AM', title: 'Zoom call with design team', description: 'Discussion on UX sprint and Wireframe review' },
          { id: 2, time: '10:00 AM', title: 'Orientation session with new hires', description: '' },
          { id: 3, time: '9:00 AM', title: 'Zoom call with design team', description: 'Discussion on UX sprint and Wireframe review' }
        ],
        selectedDate: ''
      };
    },
    computed: {
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
          calendarDays.push({ date: i, isToday: this.isToday(i) });
        }
        for (let i = 0; i < firstDayOfMonth; i++) {
          calendarDays.unshift({ date: '', isToday: false });
        }
        return calendarDays;
      }
    },
    methods: {
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
      showModal(date) {
        const modal = document.getElementById('myModal');
        const modalDateElement = document.getElementById('modalDate');
        modalDateElement.innerText = date;
        modal.classList.remove('hidden');
        this.selectedDate = date;
      },
      hideModal() {
        const modal = document.getElementById('myModal');
        modal.classList.add('hidden');
        this.selectedDate = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    z-index: 1000;
  }
  
  .modal-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-container {
    max-width: 90%;
  }
  
  .modal-content {
    max-width: 400px;
    margin: auto;
  }
  
  .modal-close {
    cursor: pointer;
  }
  </style>
  