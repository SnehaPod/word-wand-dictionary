<template>
  <div class="container home">
    <div class="row">
      <section class="col-lg-8 col-12 mr-auto search-prompt">
        <img
          class="mx-auto search-animation"
          src="/searchAnimated.svg"
          alt=""
        />

        <!-- Search Input -->
        <b-form-input
          v-on:keyup.enter="submit"
          v-model="localSearchWord"
          placeholder="Show me the meaning of.."
          autocomplete="nope"
        ></b-form-input>
        <!--  -->

        <!-- Search Results-->
        <section
          class="magic-word"
          v-if="getSearchResult.hasOwnProperty('word')"
        >
          <magic-word :leviosa="getSearchResult" />
        </section>
        <!--  -->

        <!-- Error Case -->
        <section class="error" v-if="errorOnSearch">
          <img class="four-oh-four" src="/404.gif" alt="" />
          <span> Oh no, we didn't find what you were looking for. </span>
        </section>
        <!--  -->
      </section>

      <!-- Recent History -->
      <section class="col-lg-4 col-12 recents">
        <Recents />
      </section>
      <!--  -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import MagicWord from "../components/MagicWord.vue";
import Recents from "../components/Recents.vue";
import { BIcon } from "bootstrap-vue";

export default {
  data() {
    return {
      localSearchWord: this.getSearchWord,
      errorOnSearch: false,
    };
  },
  mounted() {
    this.errorOnSearch = false;
    this.updateRecentSearches(
      localStorage.getItem("recentSearches")
        ? JSON.parse(localStorage.getItem("recentSearches"))
        : []
    );
    this.updateSearchResult({});
  },
  components: {
    MagicWord,
    BIcon,
    Recents,
  },
  methods: {
    ...mapActions([
      "updateRecentSearches",
      "updateSearchResult",
      "updateSearchWord",
    ]),
    submit: async function () {
      this.updateSearchWord(this.localSearchWord);
      this.errorOnSearch = false;

      try {
        let definition = await axios.get(
          "https://api.dictionaryapi.dev/api/v2/entries/en_US/" +
            this.localSearchWord
        );

        let setLSItem =
          localStorage.getItem("recentSearches") &&
          JSON.parse(localStorage.getItem("recentSearches")).length
            ? JSON.parse(localStorage.getItem("recentSearches"))
            : [];

        setLSItem.unshift({
          word: this.localSearchWord,
          order: setLSItem.length ? setLSItem[0]["order"] + 1 : 1,
        });

        console.log("setLSItem :>> ", setLSItem);

        localStorage.setItem("recentSearches", JSON.stringify(setLSItem));

        this.updateRecentSearches(
          JSON.parse(localStorage.getItem("recentSearches"))
        );

        this.updateSearchResult(definition.data[0]);

        console.log(
          "this.getSearchResult :>> ",
          this.getSearchResult,
          this.getSearchResult.hasOwnProperty("word")
        );

        this.localSearchWord = "";
      } catch (error) {
        console.log("error :>> ", error);
        this.errorOnSearch = true;
        this.localSearchWord = "";
        this.updateSearchResult({});
      }
    },
  },
  computed: {
    ...mapGetters(["getSearchWord", "getRecentSearches", "getSearchResult"]),
  },
};
</script>

<style>
body {
  background-color: #93c2c6 !important;
}

.home {
  margin-right: 0px !important;
  max-width: 100%;
}

.search-prompt {
  padding-left: 3rem;
  padding-right: 3rem;
}

.search-animation {
  width: 25rem;
}

.magic-word {
  margin-top: 10%;
}

.error {
  margin-top: 10%;
}

.form-control {
  border-radius: 1.25rem !important;
}

.recents {
  margin-top: 0px !important;
  height: 100vh;
  background-color: #f4fafb;
}

.four-oh-four {
  height: 20%;
  width: 20%;
}

.error span {
  padding: 3%;
}
</style>