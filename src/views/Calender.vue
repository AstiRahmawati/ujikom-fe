<template>
    <div class="calendar-container">
      <h1 class="center-text">Recipe Scheduler</h1>
      <h2 class="center-text">{{ currentDate }}</h2>
      <div class="calendar">
        <div class="month-header">
          <button @click="prevMonth" class="nav-button">&lt;</button>
          <h3>{{ currentMonth }}</h3>
          <button @click="nextMonth" class="nav-button">&gt;</button>
        </div>
        <div class="days-header">
          <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
        </div>
        <div class="days">
          <div v-for="day in calendarDays" :key="day.date" :class="{ 'today': day.isToday }">
            {{ day.date }}
          </div>
        </div>
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
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      };
    },
    computed: {
      currentDate() {
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[this.currentMonthIndex] + ' ' + this.today.getDate() + ', ' + this.currentYear;
      },
      currentMonth() {
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[this.currentMonthIndex];
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
      }
    }
  };
  </script>
  
  <style scoped>
  .calendar-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px;
    font-family: 'Arial', sans-serif;
    border-radius: 8%;
    text-align: center;
  }
  
  .center-text {
    margin-bottom: 20px;
  }
  
  .calendar {
    border: 2px solid #b4a9a9;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .month-header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .days-header {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }
  
  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }
  
  .days div {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
    background-color: #fff;
  }
  
  .today {
    background-color: #ffd700;
    color: #333;
    border: 1px solid red; /* Tambahkan border merah pada tanggal hari ini */
  }
  
  .nav-button {
    color: red;
    border: none;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    background-color: transparent;
  }
  
  .nav-button:hover {
    background-color: #f0f0f0;
  }
  </style>
  