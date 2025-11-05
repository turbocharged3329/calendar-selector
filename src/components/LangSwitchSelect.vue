<template>
  <select v-model="$i18n.locale" @change="changeLocale">
    <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>

<script setup>
import { LOCALE_LS_KEY } from '@/constants/index.js'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function changeLocale(e) {
  const selectedLocale = e.target.value
  locale.value = selectedLocale
  localStorage.setItem(LOCALE_LS_KEY, selectedLocale)
}
</script>

<style scoped>
select {
  cursor: pointer;
}
</style>
