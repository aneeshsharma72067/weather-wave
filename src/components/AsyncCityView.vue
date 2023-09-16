<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        You are currently previewing the city, click the "+" iocn to start
        tracking this city
      </p>
    </div>
    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <div class="flex items-center gap-10">
        <div class="flex flex-col">
          <h1 class="text-5xl mb-2">
            {{ removeCamelCase(route.params.city) }}
          </h1>
          <p class="text-sm">
            {{
              new Date(
                Date.now() + weatherData.current.timezone * 1000
              ).toLocaleDateString("en-us", {
                weekday: "short",
                day: "2-digit",
                month: "long",
              })
            }}
          </p>
        </div>
        <p
          class="text-8xl"
          :class="`text-${getTempColor(
            Math.round(weatherData.current.main.temp)
          )}`"
        >
          {{ Math.round(weatherData.current.main.temp) }}&deg;
        </p>
        <div class="flex flex-col">
          <p>
            feels like
            {{ Math.round(weatherData.current.main.feels_like) }}
          </p>
          <p class="capitalize">
            {{ weatherData.current.weather[0].description }}
          </p>
          <img
            class="w-[100px] h-auto"
            :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
            alt=""
          />
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mt-4 mb-12 text-2xl">Hourly Weather</h2>
        <div class="flex gap-10 mb-4 overflow-x-scroll">
          <div
            class="flex flex-col items-center gap-4"
            v-for="hourData in weatherData.hourly.list"
            :key="hourData.dt"
          >
            <p class="text-base">
              {{ convertTimeToAMPM(hourData.dt_txt.split(" ")[1]) }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p>{{ Math.round(hourData.main.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7 Day Forecast</h2>
        <div
          v-for="day in weatherData.daily.list"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1 text-left">
            {{
              new Date(day.dt * 1000).toLocaleDateString("en-us", {
                weekday: "long",
              })
            }}
          </p>
          <img
            class="h-[50px] w-[50px] object-cover"
            :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      @click="removeCity"
      class="flex bg-weather-secondary items-center gap-2 px-6 py-4 rounded-lg my-5 justify-center text-white cursor-pointer duration-500 hover:text-red-500 hover:bg-weather-tertiary"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
const apiKey = import.meta.env.VITE_API_KEY;
const route = useRoute();
const removeCamelCase = (str) => {
  return str.replace(/([A-Z])/g, " $1").trim();
};
const getWeatherData = async () => {
  try {
    const currentWeather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lon}&units=metric&appid=4b36b26b97e7e7ad2457d89ac97e408c`
    );

    const hourlyWeather = await axios.get(
      `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${route.query.lat}&lon=${route.query.lon}&units=metric&appid=4b36b26b97e7e7ad2457d89ac97e408c`
    );

    const dailyWeather = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${route.query.lat}&lon=${route.query.lon}&cnt=7&units=metric&appid=4b36b26b97e7e7ad2457d89ac97e408c`
    );

    const weatherData = {
      current: currentWeather.data,
      hourly: hourlyWeather.data,
      daily: dailyWeather.data,
    };
    await new Promise((res) => setTimeout(res, 1000));
    return weatherData;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();
console.log(weatherData);
function convertTimeToAMPM(timeString) {
  let [hours, minutes] = timeString.split(":");
  let ampm = "AM";

  if (parseInt(hours) >= 12) {
    ampm = "PM";
    if (parseInt(hours) > 12) {
      hours = (parseInt(hours) - 12).toString();
    }
  }

  return hours + ampm;
}

const getTempColor = (temp) => {
  if (temp <= 0) {
    return "blue-400";
  } else if (temp < 15) {
    return "blue-200";
  } else if (temp < 27) {
    return "yellow-200";
  } else if (temp < 33) {
    return "yellow-400";
  } else if (temp < 38) {
    return "orange-400";
  } else if (temp < 44) {
    return "orange-700";
  } else {
    return "red-500";
  }
};

const router = useRouter();

const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter((city) => city.id !== route.query.id);

  localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  router.push({
    name: "home",
  });
};
</script>
<style scoped>
::-webkit-scrollbar {
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background: #425cee;
}

::-webkit-scrollbar-track {
  background: #9e9ef5;
}
</style>
