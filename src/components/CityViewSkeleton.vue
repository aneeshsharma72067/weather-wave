<template>
  <div class="flex flex-col flex-1">
    <!-- Overview -->
    <div class="flex py-12 justify-center items-center">
      <div class="flex items-center gap-10">
        <div class="flex flex-col">
          <AnimatedPlaceholder class="max-w-[100px] w-[100px] mb-2" />
          <AnimatedPlaceholder class="max-w-[100px] w-[100px] mb-12" />
        </div>
        <AnimatedPlaceholder class="max-w-[100px] h-[100px] w-[100px] mb-12" />
        <div class="flex flex-col">
          <AnimatedPlaceholder class="max-w-[100px] w-[100px] mb-8" />
          <AnimatedPlaceholder class="max-w-[300px] h-[75px] w-full" />
        </div>
      </div>
    </div>
    <!-- Hourly -->
    <div class="flex flex-col py-12 px-8 items-center">
      <AnimatedPlaceholder class="max-w-screen-md h-[100px] w-full mb-12" />
    </div>
    <!-- Weekly -->
    <div class="flex flex-col py-12 px-8 items-center">
      <AnimatedPlaceholder class="max-w-screen-md h-[100px] w-full mb-12" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>