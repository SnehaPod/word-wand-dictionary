<template>
  <b-card :title="leviosa.word" :sub-title="(leviosa && leviosa.phonetics[0] && leviosa.phonetics[0].text) ? leviosa.phonetics[0].text: ''">
    <a :href="(leviosa && leviosa.phonetics[0] && leviosa.phonetics[0].audio) ? leviosa.phonetics[0].audio : '#'" target="blank"
      ><b-icon icon="volume-up-fill" font-scale="1.5"></b-icon
    ></a>
    <hr />
    <b-card-text v-for="(meaning, idx) in leviosa.meanings" :key="idx">
      {{ meaning.partOfSpeech }}
      <div v-for="(def, dIdx) in meaning.definitions" :key="dIdx">
        <em> {{ dIdx + 1 }}. </em> {{ def.definition }}
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "MagicWord",
  props: ["leviosa"],
};
</script>

<style scoped>
</style>