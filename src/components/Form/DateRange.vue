<template>
  <date-range-picker
    v-model="dateRange"
    class="date-range"
    show-dropdowns
    :ranges="false"
    :single-date-picker="singleDatePicker"
    :linked-calendars="false"
    v-bind="$props"
    v-on="$listeners"
  >
    <template #input="picker">
      <div class="date-range__input">
        {{ formatDate(picker.startDate) }} - {{ formatDate(picker.endDate) }}
        <SvgIcon class="date-range__input-icon" icon="calendar" />
      </div>
    </template>
  </date-range-picker>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import { convertToDateVietNam } from '@/utils/mixins'

export default {
  name: 'DateRange',

  components: {
    DateRangePicker,
  },

  props: {
    value: {
      validator(dateRange) {
        if ('startDate' in dateRange && 'endDate' in dateRange) {
          return true
        }
        console.error('v-model must include `startDate` and `endDate`')
        return false
      },
    },

    formatDate: {
      type: Function,
      default: convertToDateVietNam,
    },
  },

  data() {
    return {
      singleDatePicker: window.innerWidth < 960 ? 'range' : null,
    }
  },

  computed: {
    dateRange: {
      get() {
        return this.value
      },
      set(range) {
        this.$emit('input', range)
      },
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.date-range {
  .reportrange-text {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 6px 12px;
    font-size: 14px;
  }

  &[noborder] {
    .reportrange-text {
      border: none;
    }
  }

  .dropdown-menu {
    z-index: $z-index-daterange;
  }
}
</style>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.date-range {
  width: 100%;

  &__input {
    @include flex-between-center;

    width: 100%;
  }

  &__input-icon {
    margin-left: 16px;
    fill: $color-black-400;
  }
}
</style>
