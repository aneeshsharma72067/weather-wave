<template>
  <header
    class="sticky w-full mx-auto bg-opacity-20 backdrop-blur-md backdrop-filter bg-weather-primary"
  >
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-5"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3 flex-1">
          <i class="fa-solid fa-sun text-base"> </i>
          <p class="text-xl">WeatherWave</p>
        </div>
      </RouterLink>
      <div class="flex gap-3 justify-end flex-1 relative">
        <i
          @click="toggleModal"
          class="fa-solid fa-circle-info text-base hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>
        <i
          class="fa-solid fa-plus text-base hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview"
        ></i>
        <base-modal :modalActive="modalActive" @close-modal="toggleModal">
          <div class="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex qui
            asperiores tempore neque alias, earum doloribus a ut velit, optio
            nam illo cupiditate accusantium consequatur enim, esse rem incidunt
            molestias! Atque quam harum similique, dignissimos commodi minus
            doloribus eos doloremque, mollitia non tempora nulla in pariatur
            saepe minima aliquam voluptates? Eius nisi blanditiis obcaecati
            minus ducimus, cupiditate, veniam quibusdam distinctio facilis
            molestiae quos odit explicabo, suscipit ipsa rerum nulla magnam
            atque. Exercitationem at, esse qui voluptas in ea maiores, eos
            nostrum fugiat neque omnis! Natus, illum ut omnis soluta veritatis
            porro dignissimos minima odit expedita impedit, iusto ipsum, enim
            similique.
          </div>
        </base-modal>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { uid } from "uid";

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();

const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }
  const locationObject = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coord: {
      lat: route.query.lat,
      lon: route.query.lon,
    },
  };

  savedCities.value.push(locationObject);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObject.id;
  router.replace({ query });
};

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
