<template>
  <div class="col">
    <!-- <h2> Recent Searches </h2> -->
    <b-icon icon="clock-history" scale="3" variant="secondary"></b-icon>
    <img class="recent-animated" src="/recentsAnimated.svg" alt="" />

    <!-- <hr /> -->
    <div v-if="items.length">
      <ul id="recent-list" class="recent-search-word">
        <li v-for="(recent, idx) in items" :key="idx">
          <h4 @click="search(recent)">
            {{ recent.word }}
          </h4>
          <hr />
        </li>
      </ul>

      <b-pagination
        v-model="currentPage"
        :total-rows="getRecentSearches.length"
        :per-page="perPage"
        aria-controls="recent-list"
        pills
      ></b-pagination>
    </div>

    <div class="text-center" v-else>
      <img src="/recentsNotFound.gif" alt="" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Recents",
  data() {
    return {
      perPage: 6,
      currentPage: 1,
    };
  },
  mounted() {
    console.log("this.getRecentSearches :>> ", this.getRecentSearches);
    this.sortRecentSearches();
  },
  computed: {
    ...mapGetters(["getRecentSearches"]),
    items() {
      return this.getRecentSearches.length
        ? this.getRecentSearches.slice(
            (this.currentPage - 1) * this.perPage,
            this.currentPage * this.perPage
          )
        : [];
    },
  },
  mounted() {
    this.updateRecentSearches(
      JSON.parse(localStorage.getItem("recentSearches"))
    );
  },
  methods: {
    ...mapActions(["updateRecentSearches", "sortRecentSearches", "updateSearchResult"]),
    search: async function (recentWord) {
      this.errorOnSearch = false;
      try {
        let definition = await axios.get(
          "https://api.dictionaryapi.dev/api/v2/entries/en_US/" +
            recentWord.word
        );
        // this.result = definition.data[0];

        let setLSItem =
          localStorage.getItem("recentSearches") &&
          JSON.parse(localStorage.getItem("recentSearches")).length
            ? JSON.parse(localStorage.getItem("recentSearches")).filter(el => el.order !== recentWord.order)
            : [];
        
        // setLSItem.splice((setLSItem.length - recentWord.order),1);
        console.log('setLSItem before reordering :>> ', setLSItem);


        setLSItem = setLSItem.map(el => {
          if(el.order > recentWord.order) {
            el.order = el.order - 1;
          }
          return el;
        })

        console.log('setLSItem after reordering :>> ', setLSItem);

        setLSItem.unshift({word: recentWord.word, order: setLSItem.length+1});

        localStorage.setItem("recentSearches", JSON.stringify(setLSItem));

        this.updateRecentSearches(
          JSON.parse(localStorage.getItem("recentSearches"))
        );

        this.updateSearchResult(definition.data[0]);
      } catch (error) {
        console.log("error :>> ", error);
        this.errorOnSearch = true;
      }
    },
  },
};
</script>

<style>
.recent-animated {
  padding: 2rem;
}

.recent-search-word {
  font-size: 1.75rem;
}

#recent-list {
  list-style-type: none;
  padding: none;
}

.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #93c2c6;
  border-color: #93c2c6;
}

.page-link {
  color: #93c2c6;
}
</style>