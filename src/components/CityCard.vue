<template>
  <div
    class="flex py-6 px-4 bg-weather-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ removeCamelCase(city.city) }}</h2>
      <h3>{{ removeCamelCase(city.state) }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">
        {{ Math.round(city.weather.main.temp) }}&deg;
      </p>
      <div class="flex gap-2">
        <span class="text-xs">
          H:{{ Math.round(city.weather.main.temp_max) }}
        </span>
        <span class="text-xs">
          L:{{ Math.round(city.weather.main.temp_min) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const removeCamelCase = (str) => {
  return str.replace(/([A-Z])/g, " $1").trim();
};

defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>
