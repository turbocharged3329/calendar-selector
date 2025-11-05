<template>
  <div class="app">
    <div>
      <LangSwitchSelect class="language-selector" />
      <CalendarSelector v-model="selectedDate" />

      <p>{{ $t('global.selected_date') }}: {{ selectedDate }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CalendarSelector from '@/components/CalendarSelector.vue'
import LangSwitchSelect from '@/components/LangSwitchSelect.vue'

// строка даты в формате YYYY-MM-DD
const selectedDate = ref('')
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0 !important;
}

#app {
  width: 100%;
  height: 100%;
}

.app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.language-selector {
  margin-bottom: 0.5rem;
}
</style>
