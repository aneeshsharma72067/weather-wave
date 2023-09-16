<template>
  <main class="container text-white">
    <div class="pt-8 mb-8 relative">
      <input
        v-model="searchQuery"
        @input="getSearchDetails"
        type="text"
        placeholder="Search for a city or State"
        class="px-6 py-4 rounded-full w-full bg-opacity-30 backdrop-blur-sm bg-gray-200 outline-none border-2 border-transparent focus:border-weather-primary duration-300"
      />
      <template v-if="searchQuery !== ''">
        <ul
          v-if="searchQueryResults"
          class="list-none mt-4 w-full flex flex-col gap-0.5 overflow-hidden border-4 border-transparent rounded-lg"
        >
          <template
            v-for="searchQueryResult in searchQueryResults"
            :key="searchQueryResult"
          >
            <li
              v-if="
                searchQueryResult.properties.result_type !== 'postcode' &&
                searchQueryResult.properties.result_type !== 'amenity'
              "
              @click="previewCity(searchQueryResult.properties)"
              class="py-2 px-3 justify-center border-slate-100 bg-opacity-30 backdrop-blur-sm bg-gray-200 hover:bg-opacity-50 duration-200 cursor-pointer"
            >
              <div>
                <span
                  v-if="
                    searchQueryResult.properties.city ||
                    searchQueryResult.properties.county
                  "
                  >{{
                    searchQueryResult.properties.city ||
                    searchQueryResult.properties.county
                  }},
                </span>
                <span v-if="searchQueryResult.properties.state"
                  >{{ searchQueryResult.properties.state }},
                </span>
                <span v-if="searchQueryResult.properties.country"
                  >{{ searchQueryResult.properties.country }}
                </span>
                <span
                  class="text-xs capitalize bg-orange-600 mx-2 rounded-full px-3 py-1"
                  :class="searchQueryResult.properties.result_type"
                  >{{
                    capitalize(searchQueryResult.properties.result_type)
                  }}</span
                >
              </div>
              <div class="text-xs text-gray-300">
                {{ searchQueryResult.properties.formatted }}
              </div>
              <!-- {{ searchQueryResult.properties.formatted }} -->
            </li>
          </template>
        </ul>
        <div v-else class="text-center">
          <Loading />
        </div>
      </template>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Loading from "../components/Loading.vue";
import CityList from "../components/CityList.vue";
const router = useRouter();
import CityCardSkeleton from "../components/CityCardSkeleton.vue";

const previewCity = (searchResult) => {
  const state = searchResult.state || searchResult.country;
  const city = searchResult.city || searchResult.county || state;
  router.push({
    name: "cityView",
    params: {
      state: state.replaceAll(" ", ""),
      city: city.replaceAll(" ", ""),
    },
    query: {
      lat: searchResult.lat,
      lon: searchResult.lon,
      preview: true,
    },
  });
};

const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

const searchQuery = ref("");
const queryTimeout = ref(null);
const API_KEY = "914121d2449346dfbf00a77e06958f28";
var searchQueryResults = ref(null);
const getSearchDetails = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      axios
        .get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchQuery.value}&apiKey=${API_KEY}`
        )
        .then((result) => {
          searchQueryResults.value = result.data.features;
          return;
        });
    }
    searchQueryResults.value = null;
  }, 300);
};
</script>

<style scoped>
.suburb {
  background: #2edf63;
}

.county {
  background: #403de4;
}

.country {
  background: #f33c3c;
}
</style>