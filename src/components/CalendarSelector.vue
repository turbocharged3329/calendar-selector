<template>
  <div class="calendar-selector">
    <section class="calendar-selector-header">
      <button class="calendar-selector-header__btn" @click="decreaseMonth">⯇</button>
      <div class="calendar-selector-header__indicator">
        {{ currentMonthName }} {{ currentYear }}
      </div>
      <button class="calendar-selector-header__btn" @click="increaseMonth">⯈</button>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { MONTH_NAMES } from '@/constants/index.js'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  startDate: {
    type: [String],
    default: `${new Date().getFullYear()}.${new Date().getMonth() + 1}.${new Date().getDate()}`,

    validator(value) {
      return /^\d{4}[.\-/]\d{1,2}[.\-/]\d{1,2}$/.test(value)
    },
  },
})

const { t } = useI18n()

const currentMonth = ref(null)
const currentYear = ref(null)

const parsedStartDate = computed(() => {
  const dateString = new Date(props.startDate).toLocaleDateString()
  const [date, month, year] = dateString.split('.')

  return {
    date,
    month,
    year,
  }
})
const currentMonthName = computed(() => t(`months.${MONTH_NAMES[currentMonth.value - 1]}`))

function increaseMonth() {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
    return
  }

  currentMonth.value++
}

function decreaseMonth() {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
    return
  }

  currentMonth.value--
}

onBeforeMount(() => {
  currentMonth.value = parseInt(parsedStartDate.value.month)
  currentYear.value = parseInt(parsedStartDate.value.year)
})
</script>

<style scoped>
.calendar-selector {
  min-width: 250px;
  min-height: 300px;
  border: 1px solid #ccc;
}

.calendar-selector-header {
  display: flex;
  width: 100%;
  padding: 0.5rem;
}

.calendar-selector-header__indicator {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
}

.calendar-selector-header__btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
}
</style>
