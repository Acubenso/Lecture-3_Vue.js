<template>
  <div id="app">
    <h1 class="title">World time application</h1>

    <zones @update-time="updateTime" @add-time="addTime" />

    <div v-for="(time, index) in times" :key="index" class="timezone-wrapper">
      <h1 class="title">
        {{ time.hours }}:{{ time.minutes }}:{{ time.seconds }} -
        {{ time.details.timezone }}
      </h1>

      <button @click="() => { removeTimezone(index); }" class="btn btn-danger default-el ml-3 d-block">remove</button>
    </div>

  </div>
</template>

<script>
import Zones from "./components/Zones.vue";
import timeDetails from "@/mixins/timeDetails.js";

export default {
  mixins: [timeDetails],
  name: "App",
  components: {
    Zones,
  },
  data() {
    return {
      times: [],
      zone: "Europe/Kiev",
    };
  },
  mounted() {
    this.getTimeDetails().then((timeDetails) => {
      this.addTime(timeDetails);
    });
  },
  methods: {
    updateTime(timeDetails) {
      if (!this.times.length) {
        this.addTime(timeDetails);
        return;
      }

      this.times.splice(this.times.length - 1, 1, timeDetails);
      this.setTimeInterval(timeDetails);
    },
    addTime(time) {
      this.setTimeInterval(time);

      if (this.times.length >= 5) {
        alert('You have more than 5 time zones. Only 5 available.');
        return;
      }

      const findTimezone = this.times.find(el => el.details.timezone === time.details.timezone);

      if (typeof findTimezone === 'undefined') {
        this.times.push(time);
      } else {
        alert('You already have this timezone');
      }
    },
    removeTimezone(index) {
      this.times.splice(index, 1);
    },
    setTimeInterval(time) {
      setInterval(() => {    
        let now = new Date(),
          sec = now.getSeconds(),
          min = now.getMinutes(),
          hou = now.getHours();

        time.hours = hou < 10 ? `0${hou}` : hou;
        time.minutes = min < 10 ? `0${min}` : min;
        time.seconds = sec < 10 ? `0${sec}` : sec;
      }, 1000);
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.title {
  text-align: center;
}

.default-el {
  border: 1px solid #75c5b7;
  padding: 10px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
  font-weight: 600;
  border-radius: 2px;
  color: #75c5b7;
  background: #f8fff6;
}

.btn {
  background-color: #75c5b7;
  color: #fff;

  &:active {
    background-color: #fff;
  }
}

.ml-1 {
  margin-left: 0.2rem;
}

.ml-3 {
  margin-left: 1.2rem;
}

.timezone-wrapper {
  display: flex;
  align-items: center;  
  justify-content: center;
}

.d-block { 
  display: block;
}

.btn-danger {
  background-color: red;
  border-color: red;
}
</style>
