<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard @click="goToCityView(city)" :city="city" />
  </div>
  <p v-if="savedCities.length === 0">
    No location added. To start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";

const savedCities = ref([]);
const API_KEY = import.meta.env.VITE_API_KEY;
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
    const request = [];
    savedCities.value.forEach((city) => {
      request.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&appid=${API_KEY}`
        )
      );
    });

    await new Promise((res) => setTimeout(res, 1000));

    const weatherData = await Promise.all(request);
    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};

await getCities();

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: {
      state: city.state,
      city: city.city,
    },
    query: {
      id: city.id,
      lat: city.coord.lat,
      lon: city.coord.lon,
    },
  });
};
</script>
