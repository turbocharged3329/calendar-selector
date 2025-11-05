<template>
  <div class="app">
    <LangSwitchSelect />
    <CalendarSelector />
  </div>
</template>

<script setup>
import CalendarSelector from '@/components/CalendarSelector.vue'
import LangSwitchSelect from '@/components/LangSwitchSelect.vue'
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
