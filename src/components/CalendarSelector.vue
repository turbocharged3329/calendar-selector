<template>
  <div class="calendar-selector">
    <section class="calendar-selector-header">
      <button class="calendar-selector-header__btn" @click="decreaseMonth">⯇</button>
      <div class="calendar-selector-header__indicator">
        {{ currentMonthName }} {{ currentYear }}
      </div>
      <button class="calendar-selector-header__btn" @click="increaseMonth">⯈</button>
    </section>
    <div class="calendar-selector-body">
      <section class="calendar-selector-grid calendar-selector-grid--weekdays-grid">
        <div v-for="i in WEEKDAYS_NAMES_KEYS" :key="i" class="calendar-selector-grid__cell">
          {{ $t(`weekdays.${i}`) }}
        </div>
      </section>

      <section class="calendar-selector-grid calendar-selector-grid--dates-grid">
        <div
          class="calendar-selector-grid__cell"
          v-for="i in currentMonthFirstDayOffset"
          :key="i"
        ></div>
        <div
          class="calendar-selector-grid__cell"
          :class="{ 'calendar-selector-grid__cell--selected': model === day.value }"
          v-for="day in currentMonthDays"
          :key="day.id"
          @click="selectDate(day)"
        >
          {{ day.date }}
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { MONTH_NAMES_KEYS, WEEKDAYS_NAMES_KEYS } from '@/constants/index.js'
import { useI18n } from 'vue-i18n'

const FIRST_MONTH_NUMBER = 1
const LAST_MONTH_NUMBER = 12

// принимает на вход строку даты в формате YYYY-MM-DD
const model = defineModel({ type: String, default: null })

const { t } = useI18n()

const currentMonth = ref(null)
const currentYear = ref(null)

const currentMonthName = computed(() =>
  MONTH_NAMES_KEYS[currentMonth.value - 1]
    ? t(`months.${MONTH_NAMES_KEYS[currentMonth.value - 1]}`)
    : '',
)
const currentMonthFirstDayOffset = computed(() => {
  const offsetInDays = new Date(`${currentYear.value}-${currentMonth.value}-1`)?.getDay()

  return offsetInDays > 0 ? offsetInDays - 1 : offsetInDays
})
const currentMonthDaysCount = computed(
  () => new Date(currentYear.value, currentMonth.value, 0).getDate() || 0,
)
const currentMonthDays = computed(() => {
  const days = []

  for (let i = 1; i <= currentMonthDaysCount.value; i++) {
    const dateString = new Date(currentYear.value, currentMonth.value - 1, i).toLocaleDateString()
    const [dateFromDateString, monthFromDateString, yearFromDateString] = dateString.split('.')

    days.push({
      value: `${yearFromDateString}-${monthFromDateString}-${dateFromDateString}`,
      date: +dateFromDateString,
      month: +monthFromDateString,
      year: +yearFromDateString,
    })
  }

  return days
})

function increaseMonth() {
  if (currentMonth.value === LAST_MONTH_NUMBER) {
    currentMonth.value = FIRST_MONTH_NUMBER
    currentYear.value++
    return
  }

  currentMonth.value++
}

function decreaseMonth() {
  if (currentMonth.value === FIRST_MONTH_NUMBER) {
    currentMonth.value = LAST_MONTH_NUMBER
    currentYear.value--
    return
  }

  currentMonth.value--
}

function selectDate(day) {
  currentMonth.value = day.month
  currentYear.value = day.year
  model.value = day.value
}

function initDateFromModel() {
  if (!model.value) {
    const month = new Date().getMonth() + 1
    const date = new Date().getDate()

    model.value = `${new Date().getFullYear()}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`
  }
}

watch(
  model,
  () => {
    const dateString = new Date(model.value).toLocaleDateString()
    const [_, month, year] = dateString.split('.')

    currentMonth.value = parseInt(month)
    currentYear.value = parseInt(year)
  },
  {
    immediate: true,
  },
)

initDateFromModel()
</script>

<style scoped>
.calendar-selector {
  min-width: 300px;
  min-height: 200px;
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

.calendar-selector-body {
  padding: 0.5rem;
}

.calendar-selector-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.calendar-selector-grid__cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  cursor: pointer;
}

.calendar-selector-grid__cell--selected {
  border: 1px solid aqua;
}

.calendar-selector-grid--weekdays-grid {
  margin-bottom: 1rem;
}

.calendar-selector-grid--dates-grid {
  grid-template-rows: auto 1fr;
}
</style>
